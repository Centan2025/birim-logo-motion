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

const SLICES = [
  { id: 'top', yStart: -5, yEnd: 24, dir: -1 },
  { id: 'mid', yStart: 24, yEnd: 48, dir: 1 },
  { id: 'bot', yStart: 48, yEnd: 80, dir: -1 },
] as const;

export const KineticElasticSplit: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 42;

  const pillSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const subSpring = spring({
    frame: frame - 56,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F6F4EF',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Modern Editorial Frame */}
      <div
        style={{
          position: 'absolute',
          inset: 44,
          border: '1px solid rgba(13, 13, 16, 0.08)',
          borderRadius: 24,
          pointerEvents: 'none',
        }}
      />

      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          {SLICES.map((slice) => (
            <clipPath key={slice.id} id={`kinetic-slice-${slice.id}`}>
              <rect
                x={-200}
                y={slice.yStart}
                width={LOGO_VIEWBOX.width + 400}
                height={slice.yEnd - slice.yStart + 0.4}
              />
            </clipPath>
          ))}
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {SLICES.map((slice, sIdx) => (
            <g key={slice.id} clipPath={`url(#kinetic-slice-${slice.id})`}>
              {BIRIM_LETTERS.map((letter, lIdx) => {
                const s = spring({
                  frame: frame - lIdx * 4 - sIdx * 3,
                  fps,
                  config: { damping: 15, stiffness: 135, mass: 0.9 },
                });

                const shiftX = interpolate(s, [0, 1], [slice.dir * 85, 0]);
                const opacity = interpolate(s, [0, 0.3, 1], [0, 1, 1]);

                // Subtle chromatic accent ghost while in motion
                const ghostOffset = interpolate(s, [0, 1], [slice.dir * 12, 0]);
                const ghostOpacity = interpolate(s, [0, 0.5, 1], [0, 0.65, 0]);

                return (
                  <g key={`${slice.id}-${letter.id}`}>
                    <path
                      d={letter.compoundPath}
                      fill={accentColor}
                      fillRule="evenodd"
                      opacity={ghostOpacity}
                      transform={`translate(${shiftX + ghostOffset}, 0)`}
                    />
                    <path
                      d={letter.compoundPath}
                      fill="#0D0D10"
                      fillRule="evenodd"
                      opacity={opacity}
                      transform={`translate(${shiftX}, 0)`}
                    />
                  </g>
                );
              })}
            </g>
          ))}
        </g>
      </svg>

      {/* Modern Kinetic Pill & Editorial Subtitle */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 52,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0D0D10',
            color: '#F6F4EF',
            height: 44,
            paddingLeft: interpolate(pillSpring, [0, 1], [0, 32]),
            paddingRight: interpolate(pillSpring, [0, 1], [0, 32]),
            borderRadius: 999,
            opacity: pillSpring,
            transform: `scale(${interpolate(pillSpring, [0, 1], [0.85, 1])})`,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: accentColor,
              marginRight: 14,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            {headline}
          </span>
        </div>

        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'rgba(13, 13, 16, 0.55)',
            textTransform: 'uppercase',
            opacity: subSpring,
            transform: `translateY(${interpolate(subSpring, [0, 1], [12, 0])}px)`,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
