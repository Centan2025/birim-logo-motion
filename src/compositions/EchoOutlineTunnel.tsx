import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SceneCaption } from '../components/SceneCaption';
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

const ECHO_COUNT = 7;

export const EchoOutlineTunnel: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor = '#B89758',
    primaryColor = '#E6EDF3',
    logoScale = 1,
    showLogo = true,
    textDelayFrames,
  } = props;
  const frame = useCurrentFrame();
  const { fps, width: compWidth = 1920, height: compHeight = 1080 } = useVideoConfig();

  const scale = 2.85 * logoScale;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - 36;

  const coreSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07080D', overflow: 'hidden' }}>
      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
          {/* Imploding Concentric Echo Rings */}
          {Array.from({ length: ECHO_COUNT }).map((_, eIdx) => {
            const s = spring({
              frame: frame - eIdx * 5,
              fps,
              config: { damping: 18, stiffness: 80, mass: 1.05 },
            });

            const initialScale = 2.6 - eIdx * 0.2;
            const ringScale = interpolate(s, [0, 1], [initialScale, 1]);
            const ringOpacity = interpolate(
              s,
              [0, 0.4, 0.9, 1],
              [0, 0.65 - eIdx * 0.06, 0.35, 0]
            );

            return (
              <g
                key={eIdx}
                transform={`translate(960, 504) scale(${ringScale}) translate(-960, -504)`}
                opacity={ringOpacity}
              >
                <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
                  <path
                    d={FULL_LOGO_PATH}
                    fill="none"
                    stroke={eIdx % 2 === 0 ? accentColor : primaryColor}
                    strokeWidth={0.75}
                    fillRule="evenodd"
                  />
                </g>
              </g>
            );
          })}

          {/* Solid Core Lockup */}
          <g
            transform={`translate(960, 504) scale(${interpolate(coreSpring, [0, 1], [0.88, 1])}) translate(-960, -504)`}
            opacity={coreSpring}
          >
            <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
              <path d={FULL_LOGO_PATH} fill={primaryColor} fillRule="evenodd" />
            </g>
          </g>
        </svg>
      )}

      {/* Clean Minimal Caption */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames ?? 34}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};

