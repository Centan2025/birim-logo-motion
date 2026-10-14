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

const ECHO_COUNT = 7;

export const EchoOutlineTunnel: React.FC<ArchitecturalSceneProps> = ({
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

  const scale = 2.85;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 36;

  const coreSpring = spring({
    frame: frame - 36,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const textSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07080D', overflow: 'hidden' }}>
      {showLogo !== false && (
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
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
        baseTop={offsetY + renderedHeight + 58}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 32}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
