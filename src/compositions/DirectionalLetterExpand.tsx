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
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 36;

  // Each letter starts only 9 frames after the previous one (early in the previous letter's ~42-frame animation)
  const STAGGER_FRAMES = 9;

  const textSpring = spring({
    frame: frame - (BIRIM_LETTERS.length * STAGGER_FRAMES + 18),
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor, overflow: 'hidden' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          {/* Strict per-letter bounding box clip so every letter stays 100% inside its own area */}
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
            const startFrame = 6 + idx * STAGGER_FRAMES;
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
            const { xMin, xMax, yMin, yMax, width, height } = letter.bounds;

            let anchorX = xMin;
            let anchorY = yMin;
            let scaleX = 1;
            let scaleY = 1;
            let barX1 = xMin;
            let barY1 = yMin;
            let barX2 = xMin;
            let barY2 = yMax;

            if (dir === 'left') {
              // 1. Harf (B): Soldan başlayıp sağa doğru genişler
              anchorX = xMin;
              anchorY = (yMin + yMax) / 2;
              scaleX = interpolate(progress, [0, 1], [0, 1]);
              const curEdgeX = xMin + width * scaleX;
              barX1 = curEdgeX;
              barY1 = yMin;
              barX2 = curEdgeX;
              barY2 = yMax;
            } else if (dir === 'right') {
              // 3. Harf (R): En sağdan başlayıp sola doğru genişler
              anchorX = xMax;
              anchorY = (yMin + yMax) / 2;
              scaleX = interpolate(progress, [0, 1], [0, 1]);
              const curEdgeX = xMax - width * scaleX;
              barX1 = curEdgeX;
              barY1 = yMin;
              barX2 = curEdgeX;
              barY2 = yMax;
            } else if (dir === 'bottom') {
              // 2. Harf (I1) & 5. Harf (M): Altta 0'dan başlayıp yukarı doğru genişler
              anchorX = (xMin + xMax) / 2;
              anchorY = yMax;
              scaleY = interpolate(progress, [0, 1], [0, 1]);
              const curEdgeY = yMax - height * scaleY;
              barX1 = xMin;
              barY1 = curEdgeY;
              barX2 = xMax;
              barY2 = curEdgeY;
            } else if (dir === 'top') {
              // 4. Harf (I2): Üstten 0'dan başlayıp aşağı doğru genişler
              anchorX = (xMin + xMax) / 2;
              anchorY = yMin;
              scaleY = interpolate(progress, [0, 1], [0, 1]);
              const curEdgeY = yMin + height * scaleY;
              barX1 = xMin;
              barY1 = curEdgeY;
              barX2 = xMax;
              barY2 = curEdgeY;
            }

            const edgeGlowOpacity = interpolate(
              progress,
              [0.01, 0.25, 0.88, 1],
              [0, 1, 0.65, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }
            );

            return (
              <g key={letter.id} clipPath={`url(#bounds-clip-${letter.id})`}>
                {/* Letter expanding from its designated edge (0 -> 100%) */}
                <g
                  transform={`translate(${anchorX}, ${anchorY}) scale(${scaleX}, ${scaleY}) translate(${-anchorX}, ${-anchorY})`}
                >
                  <path
                    d={letter.compoundPath}
                    fill={primaryColor}
                    fillRule="evenodd"
                  />
                </g>

                {/* Subtle Leading-Edge Accent Laser Bar during expansion */}
                {progress > 0.01 && progress < 0.99 && (
                  <line
                    x1={barX1}
                    y1={barY1}
                    x2={barX2}
                    y2={barY2}
                    stroke={accentColor}
                    strokeWidth={1.4}
                    opacity={edgeGlowOpacity}
                  />
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Clean Modern Caption */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 58,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [16, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 19,
            fontWeight: 500,
            letterSpacing: '0.4em',
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '0.28em',
            color: accentColor,
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
