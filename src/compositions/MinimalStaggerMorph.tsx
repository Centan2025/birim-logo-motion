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

export const MinimalStaggerMorph: React.FC<ArchitecturalSceneProps> = ({
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

  const textSpring = spring({
    frame: frame - 46,
    fps,
    config: { damping: 22, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      {showLogo !== false && (
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
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
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 34}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
