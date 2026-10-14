import { SceneCaption } from '../components/SceneCaption';
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

const BANDS = [
  { id: 0, y: -5, h: 14 },
  { id: 1, y: 9, h: 12 },
  { id: 2, y: 21, h: 15 },
  { id: 3, y: 36, h: 11 },
  { id: 4, y: 47, h: 14 },
  { id: 5, y: 61, h: 20 },
] as const;

export const GlitchSignalLock: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  tagline,
  projectCode,
  scaleText,
  accentColor,
  primaryColor,
  taglineColor,
  backgroundColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 64,
  subtitleSize = 40,
  taglineSize = 28,
  letterSpacing = 0.4,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'center',
  textAnimation = 'char-wave',
  textDelayFrames,
  line1Delay,
  line2Delay,
  line3Delay,
  showLogo = true,
  aspectRatio = '16:9',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 36;

  // Glitch intensity envelope: strong at start (0-42), micro-burst at (92-98), 0 otherwise
  const initialDecay = interpolate(frame, [0, 38, 46], [1, 0.35, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const microBurst =
    frame >= 92 && frame <= 97 ? Math.sin((frame - 92) * 1.8) * 0.45 : 0;
  const glitchAmp = initialDecay + microBurst;

  const textSpring = spring({
    frame: frame - 44,
    fps,
    config: { damping: 22, stiffness: 120 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07080A', overflow: 'hidden' }}>
      {showLogo !== false && (
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
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

            {/* Customizable Architectural Kinetic Caption */}
      <SceneCaption
        headline={headline}
        subtitle={subtitle}
        tagline={tagline}
        primaryColor={primaryColor}
        accentColor={accentColor}
        taglineColor={taglineColor}
        fontFamily={fontFamily}
        headlineSize={headlineSize}
        subtitleSize={subtitleSize}
        taglineSize={taglineSize}
        letterSpacing={letterSpacing}
        textOffsetX={textOffsetX}
        textOffsetY={textOffsetY}
        textAlign={textAlign}
        textAnimation={textAnimation}
        baseTop={offsetY + renderedHeight + 56}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 32}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
