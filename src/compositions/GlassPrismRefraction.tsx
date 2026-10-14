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
import { BIRIM_LETTERS, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const GlassPrismRefraction: React.FC<ArchitecturalSceneProps> = ({
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

  const scale = 2.45;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;

  const cardSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // Orbiting ambient aurora orbs
  const orb1X = interpolate(frame, [0, 150], [32, 68], {
    easing: Easing.inOut(Easing.sin),
  });
  const orb2X = interpolate(frame, [0, 150], [72, 28], {
    easing: Easing.inOut(Easing.sin),
  });

  const textSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Ambient Mesh Orbs */}
      <div
        style={{
          position: 'absolute',
          left: `${orb1X}%`,
          top: '38%',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}55 0%, transparent 70%)`,
          filter: 'blur(90px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: `${orb2X}%`,
          top: '64%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #38BDF844 0%, transparent 70%)',
          filter: 'blur(95px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Frosted Glassmorphic Stage Card */}
      <div
        style={{
          position: 'relative',
          padding: '84px 120px 72px',
          borderRadius: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(32px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: cardSpring,
          transform: `scale(${interpolate(cardSpring, [0, 1], [0.9, 1])}) translateY(${interpolate(cardSpring, [0, 1], [28, 0])}px)`,
        }}
      >
        <svg
          width={renderedWidth}
          height={renderedHeight}
          viewBox={`-15 -15 ${LOGO_VIEWBOX.width + 30} ${LOGO_VIEWBOX.height + 30}`}
          style={{ overflow: 'visible' }}
        >
          {BIRIM_LETTERS.map((letter, idx) => {
            const converge = spring({
              frame: frame - idx * 5,
              fps,
              config: { damping: 16, stiffness: 100 },
            });

            // Chromatic prism dispersion offsets that converge to 0
            const dispersion = interpolate(converge, [0, 1], [18, 0]);
            const scaleVal = interpolate(converge, [0, 1], [1.18, 1]);
            const opacityVal = interpolate(converge, [0, 0.4, 1], [0, 1, 1]);

            return (
              <g
                key={letter.id}
                opacity={opacityVal}
                transform={`translate(${letter.centerX}, ${letter.centerY}) scale(${scaleVal}) translate(${-letter.centerX}, ${-letter.centerY})`}
              >
                {/* Cyan Prism Channel */}
                <path
                  d={letter.compoundPath}
                  fill="#38BDF8"
                  fillRule="evenodd"
                  opacity={interpolate(converge, [0, 0.85, 1], [0.75, 0.45, 0])}
                  transform={`translate(${-dispersion}, ${-dispersion * 0.35})`}
                  style={{ mixBlendMode: 'screen' }}
                />

                {/* Warm Coral/Amber Prism Channel */}
                <path
                  d={letter.compoundPath}
                  fill={accentColor}
                  fillRule="evenodd"
                  opacity={interpolate(converge, [0, 0.85, 1], [0.75, 0.45, 0])}
                  transform={`translate(${dispersion}, ${dispersion * 0.35})`}
                  style={{ mixBlendMode: 'screen' }}
                />

                {/* Core Crisp Vector Letter */}
                <path
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                />
              </g>
            );
          })}
        </svg>

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
          baseTop={678}
          delayFrames={textDelayFrames !== undefined ? textDelayFrames : 34}
          line1Delay={line1Delay}
          line2Delay={line2Delay}
          line3Delay={line3Delay}
          showLogo={showLogo}
        />
      </div>
    </AbsoluteFill>
  );
};
