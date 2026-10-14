import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SceneCaption } from '../components/SceneCaption';
import { BIRIM_LETTERS, FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const SpotlightDarkroomReveal: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor = '#B89758',
    primaryColor = '#E6EDF3',
    logoScale = 1,
    showLogo = true,
    textDelayFrames,
  } = props;
  const frame = useCurrentFrame();
  const { fps, width: compWidth = 1920, height: compHeight = 1080 } = useVideoConfig();

  const scale = 2.9 * logoScale;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - 34;

  // Spotlight X position in logo coordinate space
  const lightX = interpolate(
    frame,
    [0, 85, 130],
    [-40, LOGO_VIEWBOX.width + 40, LOGO_VIEWBOX.width / 2],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // Spotlight radius expands after the initial sweep
  const lightRadius = interpolate(frame, [0, 75, 130], [115, 135, 420], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#060608', overflow: 'hidden' }}>
      {showLogo !== false && (
        <>
          {/* Ambient Stage Spotlight Cone */}
          <div
            style={{
              position: 'absolute',
              left: offsetX + lightX * scale,
              top: offsetY + (LOGO_VIEWBOX.height / 2) * scale,
              width: lightRadius * scale * 2.2,
              height: lightRadius * scale * 1.6,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${accentColor}26 0%, rgba(255,255,255,0.04) 45%, transparent 72%)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
            <defs>
              <radialGradient
                id="spotlight-grad"
                gradientUnits="userSpaceOnUse"
                cx={lightX}
                cy={LOGO_VIEWBOX.height / 2}
                r={lightRadius}
              >
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="55%" stopColor={primaryColor} stopOpacity="0.85" />
                <stop offset="82%" stopColor={accentColor} stopOpacity="0.28" />
                <stop offset="100%" stopColor="#141418" stopOpacity="0.06" />
              </radialGradient>
            </defs>

            <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
              {/* Dynamic Opposite Cast Shadow per Letter based on Spotlight Position */}
              {BIRIM_LETTERS.map((letter) => {
                const dx = (letter.centerX - lightX) * 0.045;
                const dist = Math.abs(letter.centerX - lightX);
                const shadowAlpha = interpolate(dist, [0, 180], [0.55, 0.05], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });

                return (
                  <path
                    key={`shadow-${letter.id}`}
                    d={letter.compoundPath}
                    fill="#000000"
                    fillRule="evenodd"
                    opacity={shadowAlpha}
                    transform={`translate(${dx}, 4.5)`}
                  />
                );
              })}

              {/* Spotlight-Illuminated Core Silhouette */}
              <path
                d={FULL_LOGO_PATH}
                fill="url(#spotlight-grad)"
                stroke="url(#spotlight-grad)"
                strokeWidth={0.45}
                fillRule="evenodd"
              />
            </g>
          </svg>
        </>
      )}

      {/* Studio Caption */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames ?? 34}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};

