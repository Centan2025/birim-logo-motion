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
import { LowerThirdProps } from '../types/schema';

export const CleanVideoBadge: React.FC<LowerThirdProps> = ({
  projectTitle,
  architecturalPhase,
  locationYear,
  accentColor,
  transparentBackground,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  letterSpacing = 0.38,
  textOffsetX = 0,
  textOffsetY = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 110 },
  });

  const textExpand = spring({
    frame: frame - 12,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 24, durationInFrames - 4],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const masterAlpha = enter * exit;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparentBackground ? 'transparent' : '#0E1015',
      }}
    >
      {!transparentBackground && (
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(circle at 80% 25%, #1E2430 0%, #0E1015 68%)',
          }}
        />
      )}

      {/* Top-Right Floating Pill Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 56,
          right: 68,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 22px',
          borderRadius: 999,
          backgroundColor: 'rgba(18, 20, 26, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(16px)',
          opacity: masterAlpha,
          transform: `translateY(${interpolate(masterAlpha, [0, 1], [-18, 0])}px)`,
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: accentColor,
          }}
        />
        <span
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          {locationYear}
        </span>
      </div>

      {/* Bottom-Left Modern Floating Glass Pill Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 72,
          left: 68,
          display: 'flex',
          alignItems: 'center',
          padding: '16px 28px 16px 20px',
          borderRadius: 28,
          backgroundColor: 'rgba(18, 20, 26, 0.82)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(20px)',
          opacity: masterAlpha,
          transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateY(${interpolate(masterAlpha, [0, 1], [32, 0])}px) scale(${interpolate(masterAlpha, [0, 1], [0.94, 1])})`,
        }}
      >
        {/* Dark Accent Badge with BİRİM Logo */}
        <div
          style={{
            padding: '18px 26px',
            borderRadius: 18,
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width={LOGO_VIEWBOX.width * 0.42}
            height={LOGO_VIEWBOX.height * 0.42}
            viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
          >
            {BIRIM_LETTERS.map((letter, idx) => {
              const lSpring = spring({
                frame: frame - 4 - idx * 3,
                fps,
                config: { damping: 16, stiffness: 120 },
              });
              return (
                <path
                  key={letter.id}
                  d={letter.compoundPath}
                  fill="#FFFFFF"
                  fillRule="evenodd"
                  opacity={lSpring}
                  transform={`translate(0, ${interpolate(lSpring, [0, 1], [16, 0])})`}
                />
              );
            })}
          </svg>
        </div>

        {/* Expanding Clean Text Block */}
        <div
          style={{
            marginLeft: 24,
            maxWidth: interpolate(textExpand, [0, 1], [0, 620]),
            opacity: textExpand,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: headlineSize,
              fontWeight: 600,
              letterSpacing: `${letterSpacing}em`,
              color: accentColor,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}
          >
            {architecturalPhase}
          </div>
          <div
            style={{
              fontFamily,
              fontSize: subtitleSize,
              fontWeight: 600,
              letterSpacing: `${Math.max(0.04, letterSpacing * 0.7)}em`,
              color: '#FFFFFF',
            }}
          >
            {projectTitle}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
