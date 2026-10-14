import glob
import os
import re

COMP_DIR = r"f:\_Logo_Calismasi\src\compositions"


def process_file(filepath: str) -> None:
    name = os.path.basename(filepath)
    if name in ("MasterShowcaseReel.tsx", "DirectionalLetterExpand.tsx"):
        return

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if "headlineSize" in content:
        return

    # 1. Inject typography & position props into the component destructuring
    prop_injection = (
        "  fontFamily = \"'Inter', sans-serif\",\n"
        "  headlineSize = 19,\n"
        "  subtitleSize = 12,\n"
        "  letterSpacing = 0.38,\n"
        "  textOffsetX = 0,\n"
        "  textOffsetY = 0,\n"
        "}) => {"
    )
    content = content.replace("}) => {", prop_injection, 1)

    # 2. Replace the last two fontSize occurrences (headline & subtitle) and their fontFamily
    font_Matches = list(
        re.finditer(
            r"fontFamily:\s*\"'[^']+',\s*'[^']+',\s*(?:sans-serif|monospace)\"",
            content,
        )
    )
    if len(font_Matches) >= 2:
        for m in reversed(font_Matches[-2:]):
            content = content[: m.start()] + "fontFamily" + content[m.end() :]

    size_Matches = list(re.finditer(r"fontSize:\s*(\d+)", content))
    if len(size_Matches) >= 2:
        # Last one is subtitleSize, second-to-last is headlineSize (except MinimalCornerWatermark where badge is before title)
        if name == "MinimalCornerWatermark.tsx":
            m_sub = size_Matches[-2]
            m_head = size_Matches[-1]
        else:
            m_head = size_Matches[-2]
            m_sub = size_Matches[-1]

        edits = sorted(
            [(m_head.start(), m_head.end(), "fontSize: headlineSize"),
             (m_sub.start(), m_sub.end(), "fontSize: subtitleSize")],
            key=lambda x: x[0],
            reverse=True,
        )
        for st, en, rep in edits:
            content = content[:st] + rep + content[en:]

    # 3. Replace static letterSpacing on headline (second-to-last letterSpacing)
    ls_Matches = list(re.finditer(r"letterSpacing:\s*'0\.\d+em'", content))
    if len(ls_Matches) >= 2:
        m_ls_sub = ls_Matches[-1]
        m_ls_head = ls_Matches[-2]
        content = (
            content[: m_ls_sub.start()]
            + "letterSpacing: `${Math.max(0.04, letterSpacing * 0.7)}em`"
            + content[m_ls_sub.end() :]
        )
        content = (
            content[: m_ls_head.start()]
            + "letterSpacing: `${letterSpacing}em`"
            + content[m_ls_head.end() :]
        )

    # 4. Add X/Y offset to the caption container
    # Look for the last transform: `...` or marginTop: 64 / 68 / 48 in the file
    transform_Matches = list(re.finditer(r"transform:\s*`([^`]+)`", content))
    if transform_Matches:
        last_t = transform_Matches[-1]
        orig_expr = last_t.group(1)
        new_expr = f"translate(${{textOffsetX}}px, ${{textOffsetY}}px) {orig_expr}"
        content = (
            content[: last_t.start()]
            + f"transform: `{new_expr}`"
            + content[last_t.end() :]
        )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("Updated:", name)


def main() -> None:
    for p in sorted(glob.glob(os.path.join(COMP_DIR, "*.tsx"))):
        process_file(p)


if __name__ == "__main__":
    main()
