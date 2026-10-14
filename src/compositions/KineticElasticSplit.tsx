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

const SLICES = [
  { id: 'top', yStart: -5, yEnd: 24, dir: -1 },
  { id: 'mid', yStart: 24, yEnd: 48, dir: 1 },
  { id: 'bot', yStart: 48, yEnd: 80, dir: -1 },
] as const;

export const KineticElasticSplit: React.FC<ArchitecturalSceneProps> = ({
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
  const offsetY = (1080 - renderedHeight) / 2 - 42;

  const pillSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const subSpring = spring({
    frame: frame - 56,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F6F4EF',
        overflow: 'hidden',
      }}
    >
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
        baseTop={offsetY + renderedHeight + 52}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 32}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
