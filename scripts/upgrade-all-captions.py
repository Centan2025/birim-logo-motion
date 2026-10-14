import glob
import os
import re

COMP_DIR = r"src/compositions"

SPECIAL_FILES = {
    "MasterShowcaseReel.tsx",
    "PureTypographyStudio.tsx",
    "ArchitecturalLowerThird.tsx",
    "CleanVideoBadge.tsx",
}

PROP_DESTRUCTURING = """  headline,
  subtitle,
  tagline,
  projectCode,
  scaleText,
  accentColor,
  primaryColor,
  taglineColor,
  backgroundColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 64,
  subtitleSize = 40,
  taglineSize = 28,
  letterSpacing = 0.4,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'center',
  textAnimation = 'char-wave',
  textDelayFrames,
  line1Delay,
  line2Delay,
  line3Delay,
  showLogo = true,
  aspectRatio = '16:9',
"""

def generate_scene_caption(base_top_expr: str, default_delay: str) -> str:
    return f"""      {{/* Customizable Architectural Kinetic Caption */}}
      <SceneCaption
        headline={{headline}}
        subtitle={{subtitle}}
        tagline={{tagline}}
        primaryColor={{primaryColor}}
        accentColor={{accentColor}}
        taglineColor={{taglineColor}}
        fontFamily={{fontFamily}}
        headlineSize={{headlineSize}}
        subtitleSize={{subtitleSize}}
        taglineSize={{taglineSize}}
        letterSpacing={{letterSpacing}}
        textOffsetX={{textOffsetX}}
        textOffsetY={{textOffsetY}}
        textAlign={{textAlign}}
        textAnimation={{textAnimation}}
        baseTop={{{base_top_expr}}}
        delayFrames={{textDelayFrames !== undefined ? textDelayFrames : {default_delay}}}
        line1Delay={{line1Delay}}
        line2Delay={{line2Delay}}
        line3Delay={{line3Delay}}
        showLogo={{showLogo}}
      />"""

def upgrade_file(filepath: str) -> None:
    fname = os.path.basename(filepath)
    if fname in SPECIAL_FILES:
        return

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Fix import of SceneCaption
    content = re.sub(
        r"import\s*\{\s*(?:AnimatedTextLine|SceneCaption)(?:,\s*AnimatedTextLine)?\s*\}\s*from\s*['\"]\.\./components/SceneCaption['\"];?",
        "import { SceneCaption } from '../components/SceneCaption';",
        content
    )
    if "from '../components/SceneCaption'" not in content:
        content = "import { SceneCaption } from '../components/SceneCaption';\n" + content

    # 2. Update props destructuring
    comp_match = re.search(r"export\s+const\s+(\w+)\s*:\s*React\.FC<ArchitecturalSceneProps>\s*=\s*\(\{\s*([\s\S]*?)\s*\}\)\s*=>\s*\{", content)
    if comp_match:
        old_decl = comp_match.group(0)
        cname = comp_match.group(1)
        new_decl = f"export const {cname}: React.FC<ArchitecturalSceneProps> = ({{\n{PROP_DESTRUCTURING}}}) => {{"
        content = content.replace(old_decl, new_decl, 1)

    # 3. Detect baseTop and default delayFrames
    base_top_expr = "678"
    default_delay = "32"

    if "offsetY + renderedHeight" in content:
        m_top = re.search(r"top:\s*(offsetY\s*\+\s*renderedHeight\s*\+\s*\d+)", content)
        if m_top:
            base_top_expr = m_top.group(1)
        else:
            base_top_expr = "offsetY + renderedHeight + 58"
    elif "bottom: 135" in content:
        base_top_expr = "1080 - 230"
    elif "bottom: 110" in content:
        base_top_expr = "1080 - 210"

    m_delay = re.search(r"delayFrames:\s*(\d+)", content)
    if m_delay:
        default_delay = m_delay.group(1)
    elif "STAGGER_FRAMES" in content and "BIRIM_LETTERS" in content:
        default_delay = "BIRIM_LETTERS.length * STAGGER_FRAMES + 10"

    # 4. If already using <SceneCaption, upgrade its props
    if "<SceneCaption" in content:
        sc_regex = r"<SceneCaption\s*[\s\S]*?\/>"
        new_sc = generate_scene_caption(base_top_expr, default_delay).strip()
        content = re.sub(sc_regex, new_sc, content, count=1)
    else:
        # Replace the custom caption container div at bottom
        last_abs = content.rfind("</AbsoluteFill>")
        if last_abs != -1:
            pre_abs = content[:last_abs]
            div_matches = list(re.finditer(r"(?:\{/\*[^*]*\*/\}\s*)?<div[\s\S]*?<AnimatedTextLine[\s\S]*?<\/div>\s*<\/div>", pre_abs))
            if div_matches:
                last_m = div_matches[-1]
                st = last_m.start()
                en = last_m.end()
                new_sc = generate_scene_caption(base_top_expr, default_delay)
                content = content[:st] + new_sc + content[en:]

    # 5. Support showLogo toggle for logo drawing if not already present
    if "showLogo !== false" not in content and "showLogo === false" not in content:
        svg_m = re.search(r"(\n\s*)(<svg\s+width=[\"']1920[\"']\s+height=[\"']1080[\"'][\s\S]*?<\/svg>)", content)
        if svg_m:
            ind = svg_m.group(1)
            svg_code = svg_m.group(2)
            wrapped_svg = f"{ind}{{showLogo !== false && (\n{svg_code}\n{ind})}}"
            content = content[:svg_m.start()] + wrapped_svg + content[svg_m.end():]

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully upgraded: {fname}")

def main():
    for f in sorted(glob.glob(os.path.join(COMP_DIR, "*.tsx"))):
        upgrade_file(f)

if __name__ == "__main__":
    main()
