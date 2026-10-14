import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BIRIM_LETTERS, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const MinimalStaggerMorph: React.FC<ArchitecturalSceneProps> = ({
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

  const textSpring = spring({
    frame: frame - 46,
    fps,
    config: { damping: 22, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          {BIRIM_LETTERS.map((letter, idx) => {
            const morph = spring({
              frame: frame - idx * 5,
              fps,
              config: { damping: 18, stiffness: 115, mass: 0.9 },
            });

            const clipW = interpolate(morph, [0, 1], [3, letter.bounds.width + 8]);
            const clipH = interpolate(morph, [0, 1], [12, letter.bounds.height + 8]);
            const clipX = letter.centerX - clipW / 2;
            const clipY = letter.centerY - clipH / 2;
            const radius = interpolate(morph, [0, 0.7, 1], [6, 3, 0]);

            return (
              <clipPath key={letter.id} id={`morph-clip-${letter.id}`}>
                <rect
                  x={clipX}
                  y={clipY}
                  width={clipW}
                  height={clipH}
                  rx={radius}
                />
              </clipPath>
            );
          })}
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {BIRIM_LETTERS.map((letter, idx) => {
            const morph = spring({
              frame: frame - idx * 5,
              fps,
              config: { damping: 18, stiffness: 115, mass: 0.9 },
            });

            const yShift = interpolate(morph, [0, 1], [22, 0]);
            const stemOpacity = interpolate(morph, [0, 0.25, 0.85, 1], [0, 1, 0.4, 0]);

            return (
              <g
                key={letter.id}
                transform={`translate(0, ${yShift})`}
              >
                {/* Initial Minimalist Accent Stem that expands into the letter */}
                <rect
                  x={letter.centerX - 1.5}
                  y={0}
                  width={3}
                  height={LOGO_VIEWBOX.height}
                  rx={1.5}
                  fill={accentColor}
                  opacity={stemOpacity}
                />

                {/* Unfolding Vector Letter */}
                <g clipPath={`url(#morph-clip-${letter.id})`}>
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

      {/* Ultra-Clean Modern Minimalist Caption */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 56,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [16, 0])}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 17,
            fontWeight: 500,
            letterSpacing: '0.32em',
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: accentColor,
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 15,
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: accentColor,
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </span>
      </div>
    </AbsoluteFill>
  );
};
