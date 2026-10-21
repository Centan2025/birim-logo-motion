import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BIRIM_LETTERS as DEFAULT_BIRIM_LETTERS, LOGO_VIEWBOX as DEFAULT_LOGO_VIEWBOX, LogoLetterData } from '../data/birimLogoPaths';
import { getEffectiveLogo } from '../data/logoAdapter';
import { SceneCaption } from '../components/SceneCaption';
import { ArchitecturalSceneProps } from '../types/schema';

type ExpandDirection = 'left' | 'bottom' | 'right' | 'top';

// 1. Harf (B): Soldan -> Sağa
// 2. Harf (I1): Alttan (0'dan) -> Yukarı
// 3. Harf (R): En Sağdan -> Sola
// 4. Harf (I2): Üstten -> Aşağı
// 5. Harf (M): Alttan -> Yukarı
const LETTER_DIRECTIONS: Record<LogoLetterData['id'], ExpandDirection> = {
  B: 'left',
  I1: 'bottom',
  R: 'right',
  I2: 'top',
  M: 'bottom',
};

export const DirectionalLetterExpand: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    headline,
    subtitle,
    tagline,
    accentColor,
    primaryColor,
    taglineColor,
    backgroundColor,
    transparentBackground,
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
  } = props;

  const { viewBox: LOGO_VIEWBOX, letters: BIRIM_LETTERS } = getEffectiveLogo(props.customLogo);
  const isTransparent = transparentBackground || backgroundColor === 'transparent';
  const frame = useCurrentFrame();
  const { width: compWidth = 1920, height: compHeight = 1080, fps } = useVideoConfig();

  const isVertical = compHeight > compWidth;
  const isSquare = compWidth === compHeight;
  const scale = isVertical ? 2.0 : isSquare ? 2.2 : 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - (isVertical ? 120 : 36);

  // Tight overlapping stagger: each next letter starts 4 frames (0.13s) after the previous one starts
  const STAGGER_FRAMES = 4;

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#0B0D10'), overflow: 'hidden' }}>
      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
        <defs>
          {BIRIM_LETTERS.map((letter) => (
            <clipPath key={`bounds-${letter.id}`} id={`bounds-clip-${letter.id}`}>
              <rect
                x={letter.bounds.xMin - 1}
                y={letter.bounds.yMin - 1}
                width={letter.bounds.width + 2}
                height={letter.bounds.height + 2}
              />
            </clipPath>
          ))}
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {BIRIM_LETTERS.map((letter, idx) => {
            const startFrame = 2 + idx * STAGGER_FRAMES;
            const progress = spring({
              frame: frame - startFrame,
              fps,
              config: {
                damping: 18,
                stiffness: 82,
                mass: 1.05,
              },
            });

            const DIRS: ExpandDirection[] = ['left', 'bottom', 'right', 'top'];
            const dir = (LETTER_DIRECTIONS as Record<string, ExpandDirection>)[letter.id] || DIRS[idx % 4];
            const { xMin, xMax, yMin, yMax } = letter.bounds;

            let anchorX = xMin;
            let anchorY = yMin;
            let scaleX = 1;
            let scaleY = 1;

            if (dir === 'left') {
              anchorX = xMin;
              anchorY = (yMin + yMax) / 2;
              scaleX = interpolate(progress, [0, 1], [0, 1]);
            } else if (dir === 'right') {
              anchorX = xMax;
              anchorY = (yMin + yMax) / 2;
              scaleX = interpolate(progress, [0, 1], [0, 1]);
            } else if (dir === 'bottom') {
              anchorX = (xMin + xMax) / 2;
              anchorY = yMax;
              scaleY = interpolate(progress, [0, 1], [0, 1]);
            } else if (dir === 'top') {
              anchorX = (xMin + xMax) / 2;
              anchorY = yMin;
              scaleY = interpolate(progress, [0, 1], [0, 1]);
            }

            return (
              <g key={letter.id} clipPath={`url(#bounds-clip-${letter.id})`}>
                <g
                  transform={`translate(${anchorX}, ${anchorY}) scale(${scaleX}, ${scaleY}) translate(${-anchorX}, ${-anchorY})`}
                >
                  <path
                    d={letter.compoundPath}
                    fill={primaryColor}
                    fillRule="evenodd"
                  />
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      )}

      {/* Customizable Animated Bottom Text */}
      <SceneCaption
        {...props}
        baseTop={offsetY + renderedHeight + 58}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : BIRIM_LETTERS.length * STAGGER_FRAMES + 10}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
