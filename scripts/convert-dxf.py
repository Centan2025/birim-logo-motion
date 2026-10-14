import json
import math
import os

DXF_PATH = r"f:\Birim\HDD\cenk\Birim\Logolar\Yeni Logo 171012\Logo-1-No__R.dxf"
OUT_TS_PATH = r"f:\_Logo_Calismasi\src\data\birimLogoPaths.ts"
OUT_SVG_PATH = r"f:\_Logo_Calismasi\public\birim-logo.svg"


def main() -> None:
    with open(DXF_PATH, "r", errors="ignore") as f:
        lines = [l.strip() for l in f.read().splitlines()]

    in_ent = False
    ent_list = []
    cur = None
    for i in range(0, len(lines) - 1, 2):
        c, v = int(lines[i]), lines[i + 1]
        if c == 0 and v == "SECTION" and lines[i + 3] == "ENTITIES":
            in_ent = True
            continue
        if in_ent:
            if c == 0 and v == "ENDSEC":
                if cur:
                    ent_list.append(cur)
                break
            if c == 0:
                if cur:
                    ent_list.append(cur)
                cur = {"type": v, "tags": []}
            elif cur is not None:
                cur["tags"].append((c, v))

    segments = []
    for e in ent_list:
        if e["type"] == "LINE":
            x1 = float(next(v for c, v in e["tags"] if c == 10))
            y1 = float(next(v for c, v in e["tags"] if c == 20))
            x2 = float(next(v for c, v in e["tags"] if c == 11))
            y2 = float(next(v for c, v in e["tags"] if c == 21))
            segments.append(("L", [(x1, y1), (x2, y2)]))
        elif e["type"] == "SPLINE":
            xs = [float(v) for c, v in e["tags"] if c == 10]
            ys = [float(v) for c, v in e["tags"] if c == 20]
            pts = list(zip(xs, ys))
            if len(pts) == 4:
                segments.append(("C", pts))
            elif len(pts) == 7:
                segments.append(("C", pts[:4]))
                segments.append(("C", pts[3:]))

    all_x = [p[0] for _, pts in segments for p in pts]
    all_y = [p[1] for _, pts in segments for p in pts]
    min_x, max_x = min(all_x), max(all_x)
    min_y, max_y = min(all_y), max(all_y)
    width = max_x - min_x
    height = max_y - min_y

    def norm_pt(pt: tuple[float, float]) -> tuple[float, float]:
        return (round(pt[0] - min_x, 3), round(max_y - pt[1], 3))

    used = [False] * len(segments)
    loops = []
    eps = 1e-2

    for start_idx in range(len(segments)):
        if used[start_idx]:
            continue
        used[start_idx] = True
        loop = [segments[start_idx]]
        while True:
            cur_end = loop[-1][1][-1]
            found = False
            for j in range(len(segments)):
                if used[j]:
                    continue
                s_type, pts = segments[j]
                if math.hypot(pts[0][0] - cur_end[0], pts[0][1] - cur_end[1]) < eps:
                    used[j] = True
                    loop.append((s_type, pts))
                    found = True
                    break
                elif math.hypot(pts[-1][0] - cur_end[0], pts[-1][1] - cur_end[1]) < eps:
                    used[j] = True
                    loop.append((s_type, list(reversed(pts))))
                    found = True
                    break
            if not found:
                break
        loops.append(loop)

    def loop_to_svg_d(loop: list) -> str:
        start = norm_pt(loop[0][1][0])
        cmds = [f"M {start[0]} {start[1]}"]
        for s_type, pts in loop:
            npts = [norm_pt(p) for p in pts]
            if s_type == "L":
                cmds.append(f"L {npts[1][0]} {npts[1][1]}")
            elif s_type == "C":
                cmds.append(
                    f"C {npts[1][0]} {npts[1][1]}, {npts[2][0]} {npts[2][1]}, {npts[3][0]} {npts[3][1]}"
                )
        cmds.append("Z")
        return " ".join(cmds)

    def loop_bounds(loop: list) -> dict:
        xs = [norm_pt(p)[0] for _, pts in loop for p in pts]
        ys = [norm_pt(p)[1] for _, pts in loop for p in pts]
        return {
            "xMin": min(xs),
            "xMax": max(xs),
            "yMin": min(ys),
            "yMax": max(ys),
            "width": round(max(xs) - min(xs), 3),
            "height": round(max(ys) - min(ys), 3),
        }

    letter_defs = [
        {"id": "B", "char": "B", "label": "MOD-01 // B", "outer": 5, "holes": [6, 7]},
        {"id": "I1", "char": "I", "label": "MOD-02 // I", "outer": 2, "holes": []},
        {"id": "R", "char": "R", "label": "MOD-03 // R", "outer": 4, "holes": [3]},
        {"id": "I2", "char": "I", "label": "MOD-04 // I", "outer": 1, "holes": []},
        {"id": "M", "char": "M", "label": "MOD-05 // M", "outer": 0, "holes": []},
    ]

    letters_out = []
    for ld in letter_defs:
        outer_loop = loops[ld["outer"]]
        hole_loops = [loops[h] for h in ld["holes"]]
        outer_d = loop_to_svg_d(outer_loop)
        holes_d = [loop_to_svg_d(hl) for hl in hole_loops]
        compound_d = " ".join([outer_d] + holes_d)
        b = loop_bounds(outer_loop)

        cad_segs = []
        for lp in [outer_loop] + hole_loops:
            for s_type, pts in lp:
                npts = [norm_pt(p) for p in pts]
                cad_segs.append({"type": s_type, "points": npts})

        letters_out.append(
            {
                "id": ld["id"],
                "char": ld["char"],
                "code": ld["label"],
                "compoundPath": compound_d,
                "outerPath": outer_d,
                "holePaths": holes_d,
                "bounds": b,
                "centerX": round((b["xMin"] + b["xMax"]) / 2, 3),
                "centerY": round((b["yMin"] + b["yMax"]) / 2, 3),
                "segments": cad_segs,
            }
        )

    os.makedirs(os.path.dirname(OUT_TS_PATH), exist_ok=True)
    os.makedirs(os.path.dirname(OUT_SVG_PATH), exist_ok=True)

    svg_paths = "\n".join(
        [f'    <path id="{l["id"]}" d="{l["compoundPath"]}" />' for l in letters_out]
    )
    full_svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {round(width, 3)} {round(height, 3)}" fill="currentColor">\n'
        f'  <g fill-rule="evenodd">\n{svg_paths}\n  </g>\n</svg>\n'
    )

    with open(OUT_SVG_PATH, "w", encoding="utf-8") as f:
        f.write(full_svg)

    ts_content = f"""export interface CadSegment {{
  type: 'L' | 'C';
  points: [number, number][];
}}

export interface LetterBounds {{
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  width: number;
  height: number;
}}

export interface LogoLetterData {{
  id: 'B' | 'I1' | 'R' | 'I2' | 'M';
  char: string;
  code: string;
  compoundPath: string;
  outerPath: string;
  holePaths: string[];
  bounds: LetterBounds;
  centerX: number;
  centerY: number;
  segments: CadSegment[];
}}

export const LOGO_VIEWBOX = {{
  width: {round(width, 3)},
  height: {round(height, 3)},
  originalDxfMinX: {round(min_x, 3)},
  originalDxfMaxX: {round(max_x, 3)},
  originalDxfMinY: {round(min_y, 3)},
  originalDxfMaxY: {round(max_y, 3)},
}} as const;

export const BIRIM_LETTERS: LogoLetterData[] = {json.dumps(letters_out, indent=2)};

export const FULL_LOGO_PATH = BIRIM_LETTERS.map((l) => l.compoundPath).join(' ');
"""

    with open(OUT_TS_PATH, "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(f"Done. Width={round(width, 3)}, Height={round(height, 3)}, Letters={len(letters_out)}")


if __name__ == "__main__":
    main()
