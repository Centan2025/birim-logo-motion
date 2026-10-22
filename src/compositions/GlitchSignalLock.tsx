import { useSceneFrame } from '../utils/useSceneFrame';
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
import { getEffectiveLogo } from '../data/logoAdapter';
import { ArchitecturalSceneProps } from '../types/schema';

const BANDS = [
  { id: 0, y: -5, h: 14 },
  { id: 1, y: 9, h: 12 },
  { id: 2, y: 21, h: 15 },
  { id: 3, y: 36, h: 11 },
  { id: 4, y: 47, h: 14 },
  { id: 5, y: 61, h: 20 },
] as const;

export const GlitchSignalLock: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor = '#38EF7D',
    primaryColor = '#F0F6FC',
    backgroundColor,
    transparentBackground,
    logoScale = 1,
    showLogo = true,
    textDelayFrames,
  } = props;
  const isTransparent = transparentBackground || backgroundColor === 'transparent';
  const frame = useSceneFrame(props.playbackSpeed);
  const { fps, width: compWidth = 1920, height: compHeight = 1080 } = useVideoConfig();

  const { viewBox: LOGO_VIEWBOX, fullPath: FULL_LOGO_PATH } = getEffectiveLogo(props.customLogo);
  const scale = 2.95 * logoScale;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - 36;

  // Glitch intensity envelope: strong at start (0-42), micro-burst at (92-98), 0 otherwise
  const initialDecay = interpolate(frame, [0, 38, 46], [1, 0.35, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const microBurst =
    frame >= 92 && frame <= 97 ? Math.sin((frame - 92) * 1.8) * 0.45 : 0;
  const glitchAmp = initialDecay + microBurst;

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#07080A'), overflow: 'hidden' }}>
      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
          <defs>
            {BANDS.map((b) => (
              <clipPath key={b.id} id={`glitch-band-${b.id}`}>
                <rect
                  x={-300}
                  y={b.y}
                  width={LOGO_VIEWBOX.width + 600}
                  height={b.h + 0.5}
                />
              </clipPath>
            ))}
          </defs>

          <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
            {BANDS.map((b) => {
              const wave =
                Math.sin(frame * 2.9 + b.id * 2.1) *
                Math.cos(frame * 1.7 - b.id * 1.3);
              const shiftX = wave * 42 * glitchAmp;
              const rgbSplit = Math.abs(wave) * 10 * glitchAmp;

              return (
                <g key={b.id} clipPath={`url(#glitch-band-${b.id})`}>
                  {/* Cyan Channel */}
                  {glitchAmp > 0.01 && (
                    <path
                      d={FULL_LOGO_PATH}
                      fill="#00F0FF"
                      fillRule="evenodd"
                      opacity={0.75 * Math.min(1, glitchAmp * 2)}
                      transform={`translate(${shiftX - rgbSplit}, 0)`}
                      style={{ mixBlendMode: 'screen' }}
                    />
                  )}
                  {/* Accent/Red Channel */}
                  {glitchAmp > 0.01 && (
                    <path
                      d={FULL_LOGO_PATH}
                      fill={accentColor}
                      fillRule="evenodd"
                      opacity={0.75 * Math.min(1, glitchAmp * 2)}
                      transform={`translate(${shiftX + rgbSplit}, 0)`}
                      style={{ mixBlendMode: 'screen' }}
                    />
                  )}
                  {/* Primary Crisp Signal */}
                  <path
                    d={FULL_LOGO_PATH}
                    fill={primaryColor}
                    fillRule="evenodd"
                    transform={`translate(${shiftX}, 0)`}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      )}

      {/* Locked Clean Tech Typography */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames ?? 34}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 56}
      />
    </AbsoluteFill>
  );
};
