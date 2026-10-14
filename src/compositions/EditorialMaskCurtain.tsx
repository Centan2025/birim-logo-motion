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

export const EditorialMaskCurtain: React.FC<ArchitecturalSceneProps> = ({
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
  const offsetY = (1080 - renderedHeight) / 2 - 48;

  const lineExpand = spring({
    frame: frame - 4,
    fps,
    config: { damping: 24, stiffness: 90 },
  });

  const textRise = spring({
    frame: frame - 32,
    fps,
    config: { damping: 22, stiffness: 95 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#121110',
        overflow: 'hidden',
      }}
    >
      {showLogo !== false && (
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <clipPath id="editorial-horizon-mask">
            <rect
              x={-50}
              y={-40}
              width={LOGO_VIEWBOX.width + 100}
              height={LOGO_VIEWBOX.height + 42}
            />
          </clipPath>
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {/* Masked Letters Rising from the Invisible Baseline */}
          <g clipPath="url(#editorial-horizon-mask)">
            {BIRIM_LETTERS.map((letter, idx) => {
              const rise = spring({
                frame: frame - 10 - idx * 6,
                fps,
                config: { damping: 22, stiffness: 88, mass: 1.05 },
              });

              const yOffset = interpolate(
                rise,
                [0, 1],
                [LOGO_VIEWBOX.height + 16, 0]
              );

              return (
                <path
                  key={letter.id}
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                  transform={`translate(0, ${yOffset})`}
                />
              );
            })}
          </g>

          {/* Razor-Thin Horizon Slit Line */}
          <line
            x1={(LOGO_VIEWBOX.width / 2) * (1 - lineExpand)}
            y1={LOGO_VIEWBOX.height + 10}
            x2={
              LOGO_VIEWBOX.width -
              (LOGO_VIEWBOX.width / 2) * (1 - lineExpand)
            }
            y2={LOGO_VIEWBOX.height + 10}
            stroke={accentColor}
            strokeWidth={0.6}
            strokeOpacity={0.75}
          />
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
        baseTop={offsetY + renderedHeight + 42}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 32}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
