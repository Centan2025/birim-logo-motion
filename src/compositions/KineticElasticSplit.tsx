import { SceneCaption } from '../components/SceneCaption';
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

export const KineticElasticSplit: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor,
    primaryColor,
    backgroundColor,
    textDelayFrames,
    showLogo = true,
  } = props;

  const frame = useCurrentFrame();
  const { width: compWidth = 1920, height: compHeight = 1080, fps } = useVideoConfig();

  const isVertical = compHeight > compWidth;
  const isSquare = compWidth === compHeight;
  const scale = isVertical ? 2.0 : isSquare ? 2.2 : 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - (isVertical ? 100 : 42);

  const isTransparent = backgroundColor === 'transparent';

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

      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
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
      )}

      {/* Modern Kinetic Caption */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 42}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};
