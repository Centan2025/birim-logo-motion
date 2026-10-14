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
  accentColor,
  primaryColor,
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

        {/* Clean Modern Typography Inside Glass Card */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            opacity: textSpring,
            transform: `translateY(${interpolate(textSpring, [0, 1], [14, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: '0.38em',
              color: primaryColor,
              textTransform: 'uppercase',
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '0.24em',
              color: accentColor,
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
