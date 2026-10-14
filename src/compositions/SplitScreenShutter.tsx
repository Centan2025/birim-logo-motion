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

export const SplitScreenShutter: React.FC<ArchitecturalSceneProps> = ({
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
  const offsetY = (1080 - renderedHeight) / 2 - 20;

  const shutterSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1.1 },
  });

  const macroZoom = interpolate(shutterSpring, [0, 1], [2.45, 1]);
  const shutterOffset = interpolate(shutterSpring, [0, 1], [0, 820]);

  const textSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0B0E', overflow: 'hidden' }}>
      {/* Center Macro-to-Normal Logo */}
      {showLogo !== false && (
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <g
          transform={`translate(960, 520) scale(${macroZoom}) translate(-960, -520)`}
        >
          <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
            <path d={FULL_LOGO_PATH} fill={primaryColor} fillRule="evenodd" />
          </g>
        </g>

        {/* Top-Left Diagonal Shutter Blade */}
        <g transform={`translate(${-shutterOffset}, ${-shutterOffset * 0.55})`}>
          <polygon
            points="-200,-200 2120,-200 -200,1280"
            fill="#14161D"
            stroke={accentColor}
            strokeWidth={3}
          />
        </g>

        {/* Bottom-Right Diagonal Shutter Blade */}
        <g transform={`translate(${shutterOffset}, ${shutterOffset * 0.55})`}>
          <polygon
            points="2120,-200 2120,1280 -200,1280"
            fill="#14161D"
            stroke={accentColor}
            strokeWidth={3}
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
        baseTop={1080 - 210}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 32}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
