import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BIRIM_LETTERS, LOGO_VIEWBOX, LogoLetterData } from '../data/birimLogoPaths';
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

export const DirectionalLetterExpand: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  accentColor,
  primaryColor,
  backgroundColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  letterSpacing = 0.4,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'center',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 36;

  // Tight overlapping stagger: each next letter starts 4 frames (0.13s) after the previous one starts
  const STAGGER_FRAMES = 4;

  const textSpring = spring({
    frame: frame - (BIRIM_LETTERS.length * STAGGER_FRAMES + 16),
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  const alignItems =
    textAlign === 'left'
      ? 'flex-start'
      : textAlign === 'right'
        ? 'flex-end'
        : 'center';

  return (
    <AbsoluteFill style={{ backgroundColor, overflow: 'hidden' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
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

            const dir = LETTER_DIRECTIONS[letter.id];
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

      {/* Customizable Modern Caption (Font, Size, Spacing, X/Y Position, Alignment) */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 58 + textOffsetY,
          left: offsetX + textOffsetX,
          width: renderedWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems,
          textAlign,
          gap: 10,
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [16, 0])}px)`,
        }}
      >
        {headline && (
          <div
            style={{
              fontFamily,
              fontSize: headlineSize,
              fontWeight: 500,
              letterSpacing: `${letterSpacing}em`,
              color: primaryColor,
              textTransform: 'uppercase',
            }}
          >
            {headline}
          </div>
        )}
        {subtitle && (
          <div
            style={{
              fontFamily,
              fontSize: subtitleSize,
              fontWeight: 400,
              letterSpacing: `${Math.max(0.05, letterSpacing * 0.7)}em`,
              color: accentColor,
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
