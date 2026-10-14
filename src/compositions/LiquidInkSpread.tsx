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
  accentColor,
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

      {/* Dynamic Inverted Caption */}
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
            fontSize: 19,
            fontWeight: 500,
            letterSpacing: '0.4em',
            color: portalRadius > 450 ? '#F7F5F0' : '#0B0C0E',
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 12,
            fontWeight: 500,
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
