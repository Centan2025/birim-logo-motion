import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BIRIM_LETTERS, FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const SpotlightDarkroomReveal: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  accentColor,
  primaryColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.9;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 34;

  // Spotlight X position in logo coordinate space
  const lightX = interpolate(
    frame,
    [0, 85, 130],
    [-40, LOGO_VIEWBOX.width + 40, LOGO_VIEWBOX.width / 2],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  // Spotlight radius expands after the initial sweep
  const lightRadius = interpolate(frame, [0, 75, 130], [115, 135, 420], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const textSpring = spring({
    frame: frame - 78,
    fps,
    config: { damping: 22, stiffness: 90 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#060608', overflow: 'hidden' }}>
      {/* Ambient Stage Spotlight Cone */}
      <div
        style={{
          position: 'absolute',
          left: offsetX + lightX * scale,
          top: offsetY + (LOGO_VIEWBOX.height / 2) * scale,
          width: lightRadius * scale * 2.2,
          height: lightRadius * scale * 1.6,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${accentColor}26 0%, rgba(255,255,255,0.04) 45%, transparent 72%)`,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <radialGradient
            id="spotlight-grad"
            gradientUnits="userSpaceOnUse"
            cx={lightX}
            cy={LOGO_VIEWBOX.height / 2}
            r={lightRadius}
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="55%" stopColor={primaryColor} stopOpacity="0.85" />
            <stop offset="82%" stopColor={accentColor} stopOpacity="0.28" />
            <stop offset="100%" stopColor="#141418" stopOpacity="0.06" />
          </radialGradient>
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {/* Dynamic Opposite Cast Shadow per Letter based on Spotlight Position */}
          {BIRIM_LETTERS.map((letter) => {
            const dx = (letter.centerX - lightX) * 0.045;
            const dist = Math.abs(letter.centerX - lightX);
            const shadowAlpha = interpolate(dist, [0, 180], [0.55, 0.05], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <path
                key={`shadow-${letter.id}`}
                d={letter.compoundPath}
                fill="#000000"
                fillRule="evenodd"
                opacity={shadowAlpha}
                transform={`translate(${dx}, 4.5)`}
              />
            );
          })}

          {/* Spotlight-Illuminated Core Silhouette */}
          <path
            d={FULL_LOGO_PATH}
            fill="url(#spotlight-grad)"
            stroke="url(#spotlight-grad)"
            strokeWidth={0.45}
            fillRule="evenodd"
          />
        </g>
      </svg>

      {/* Studio Caption */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 58,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [16, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 18,
            fontWeight: 400,
            letterSpacing: '0.42em',
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '0.28em',
            color: accentColor,
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
