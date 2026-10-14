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
  accentColor,
  primaryColor,
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

      {/* Modern Framed Typography */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: offsetX,
          width: renderedWidth,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [20, 0])}px)`,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          paddingTop: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: '0.34em',
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            padding: '6px 18px',
            borderRadius: 999,
            backgroundColor: accentColor,
            color: '#0A0B0E',
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
