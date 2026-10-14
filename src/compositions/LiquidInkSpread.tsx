import { SceneCaption } from '../components/SceneCaption';
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const LiquidInkSpread: React.FC<ArchitecturalSceneProps> = ({
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

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 85 },
  });

  // Expanding inversion portal radius (0 -> 1250px)
  const portalRadius = interpolate(frame, [28, 108], [0, 1250], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const textSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#F7F5F0', overflow: 'hidden' }}>
      {showLogo !== false && (
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <clipPath id="inversion-portal-clip">
            <circle cx={960} cy={504} r={portalRadius} />
          </clipPath>
        </defs>

        {/* Layer 1: Light Background + Dark Logo */}
        <g
          transform={`translate(960, 504) scale(${interpolate(logoScale, [0, 1], [0.86, 1])}) translate(-960, -504)`}
          opacity={logoScale}
        >
          <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
            <path d={FULL_LOGO_PATH} fill="#0B0C0E" fillRule="evenodd" />
          </g>
        </g>

        {/* Layer 2: Expanding Dark Portal + Inverted Light Logo */}
        <g clipPath="url(#inversion-portal-clip)">
          <rect x={0} y={0} width={1920} height={1080} fill="#0B0C0E" />
          <g
            transform={`translate(960, 504) scale(${interpolate(logoScale, [0, 1], [0.86, 1])}) translate(-960, -504)`}
          >
            <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
              <path d={FULL_LOGO_PATH} fill="#F7F5F0" fillRule="evenodd" />
            </g>
          </g>
        </g>

        {/* Expanding Accent Ring at Portal Boundary */}
        {portalRadius > 2 && portalRadius < 1200 && (
          <circle
            cx={960}
            cy={504}
            r={portalRadius}
            fill="none"
            stroke={accentColor}
            strokeWidth={3.5}
          />
        )}
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
