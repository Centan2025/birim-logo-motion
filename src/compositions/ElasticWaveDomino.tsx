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

export const ElasticWaveDomino: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  accentColor,
  primaryColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  letterSpacing = 0.38,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'center',
  textAnimation = 'char-wave',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.9;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 42;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0E1117', overflow: 'hidden' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
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

      <SceneCaption
        headline={headline}
        subtitle={subtitle}
        primaryColor={primaryColor}
        accentColor={accentColor}
        fontFamily={fontFamily}
        headlineSize={headlineSize}
        subtitleSize={subtitleSize}
        letterSpacing={letterSpacing}
        textOffsetX={textOffsetX}
        textOffsetY={textOffsetY}
        textAlign={textAlign}
        textAnimation={textAnimation}
        baseTop={offsetY + renderedHeight + 52}
        delayFrames={28}
      />
    </AbsoluteFill>
  );
};
