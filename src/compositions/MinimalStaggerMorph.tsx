import { useSceneFrame } from '../utils/useSceneFrame';
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

export const MinimalStaggerMorph: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor,
    primaryColor,
    backgroundColor,
    transparentBackground,
    textDelayFrames,
    showLogo = true,
  } = props;

  const frame = useSceneFrame(props.playbackSpeed);
  const { width: compWidth = 1920, height: compHeight = 1080, fps } = useVideoConfig();

  const isVertical = compHeight > compWidth;
  const isSquare = compWidth === compHeight;
  const scale = isVertical ? 2.0 : isSquare ? 2.2 : 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - (isVertical ? 100 : 36);

  const isTransparent = transparentBackground || backgroundColor === 'transparent';

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#0B0D10') }}>
      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
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
      )}

      {/* Ultra-Clean Modern Minimalist Caption */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 34}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};
