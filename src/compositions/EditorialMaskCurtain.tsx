import { AnimatedTextLine } from '../components/SceneCaption';
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
  accentColor,
  primaryColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  letterSpacing = 0.38,
  textOffsetX = 0,
  textOffsetY = 0,
  textAnimation = 'char-wave',
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

      {/* Counter-Emerging Editorial Text Below the Horizon Line */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 42,
          left: offsetX,
          width: renderedWidth,
          overflow: 'hidden',
          paddingTop: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateY(${interpolate(textRise, [0, 1], [-56, 0])}px)`,
            opacity: textRise,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: headlineSize,
              fontWeight: 500,
              letterSpacing: `${letterSpacing}em`,
              color: primaryColor,
              textTransform: 'uppercase',
            }}
          >
            <AnimatedTextLine
            text={headline}
            fontFamily={fontFamily}
            fontSize={headlineSize}
            letterSpacing={letterSpacing}
            color="inherit"
            accentColor={accentColor}
            animation={textAnimation}
            startFrame={34}
          />
          </span>
          <span
            style={{
              fontFamily,
              fontSize: subtitleSize,
              fontWeight: 400,
              letterSpacing: `${Math.max(0.04, letterSpacing * 0.7)}em`,
              color: accentColor,
              textTransform: 'uppercase',
            }}
          >
            <AnimatedTextLine
            text={subtitle}
            fontFamily={fontFamily}
            fontSize={subtitleSize}
            letterSpacing={Math.max(0.04, letterSpacing * 0.7)}
            color="inherit"
            accentColor={accentColor}
            animation={textAnimation}
            startFrame={42}
            isSubtitle
          />
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
