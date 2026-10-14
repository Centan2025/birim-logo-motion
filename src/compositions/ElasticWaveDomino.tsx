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
import { SceneCaption } from '../components/SceneCaption';

export const ElasticWaveDomino: React.FC<ArchitecturalSceneProps> = (props) => {
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
  const scale = isVertical ? 2.0 : isSquare ? 2.2 : 2.9;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - (isVertical ? 100 : 42);

  const isTransparent = backgroundColor === 'transparent';

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#0E1117'), overflow: 'hidden' }}>
      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {BIRIM_LETTERS.map((letter, idx) => {
            const flip = spring({
              frame: frame - idx * 7,
              fps,
              config: { damping: 12, stiffness: 120, mass: 0.85 },
            });

            const scaleXVal = interpolate(flip, [0, 1], [0.02, 1]);
            const yJump = interpolate(flip, [0, 0.5, 1], [28, -8, 0]);
            const skewYVal = interpolate(flip, [0, 0.6, 1], [16, -4, 0]);

            return (
              <g
                key={letter.id}
                transform={`translate(${letter.centerX}, ${letter.centerY + yJump}) scale(${scaleXVal}, 1) skewY(${skewYVal}) translate(${-letter.centerX}, ${-letter.centerY})`}
              >
                {/* Accent Side Edge Flash during 3D Flip */}
                <path
                  d={letter.compoundPath}
                  fill={accentColor}
                  fillRule="evenodd"
                  opacity={interpolate(flip, [0, 0.4, 0.9, 1], [0, 1, 0.3, 0])}
                  transform="translate(3, 2)"
                />
                <path
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                  opacity={interpolate(flip, [0, 0.2, 1], [0, 1, 1])}
                />
              </g>
            );
          })}
        </g>
      </svg>
      )}

      <SceneCaption
        {...props}
        baseTop={offsetY + renderedHeight + 52}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 28}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
