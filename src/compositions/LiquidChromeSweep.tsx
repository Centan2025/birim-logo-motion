import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { evolvePath } from '@remotion/paths';
import { BIRIM_LETTERS, FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const LiquidChromeSweep: React.FC<ArchitecturalSceneProps> = ({
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
  const offsetY = (1080 - renderedHeight) / 2 - 28;

  // Subtle camera push-in
  const camScale = interpolate(frame, [0, 150], [0.94, 1.02], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Diagonal specular light sweep across the logo (-30% to 130%)
  const sweepPos = interpolate(frame, [24, 115], [-35, 135], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const baseFillOpacity = interpolate(frame, [28, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const textSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 24, stiffness: 90 },
  });

  const letterSpacingEm = interpolate(textSpring, [0, 1], [0.15, 0.48]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050507',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Ambient Backlight Glow */}
      <div
        style={{
          position: 'absolute',
          width: 960,
          height: 360,
          left: '50%',
          top: '46%',
          transform: `translate(-50%, -50%) scale(${camScale})`,
          background: `radial-gradient(ellipse at center, ${accentColor}22 0%, transparent 70%)`,
          filter: 'blur(60px)',
          opacity: baseFillOpacity,
        }}
      />

      <AbsoluteFill style={{ transform: `scale(${camScale})` }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <defs>
            {/* Base Satin Metallic Fill */}
            <linearGradient id="satin-metal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.96" />
              <stop offset="55%" stopColor="#9CA3AF" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#4B5563" stopOpacity="0.92" />
            </linearGradient>

            {/* Moving Liquid Specular Highlight */}
            <linearGradient
              id="specular-sweep"
              x1={`${sweepPos - 22}%`}
              y1="0%"
              x2={`${sweepPos + 22}%`}
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="40%" stopColor={accentColor} stopOpacity="0.65" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="60%" stopColor={accentColor} stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <filter id="soft-bloom" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
            {/* 1. Satin Body Fill */}
            <path
              d={FULL_LOGO_PATH}
              fill="url(#satin-metal)"
              fillRule="evenodd"
              opacity={baseFillOpacity}
            />

            {/* 2. Liquid Light Sweep Overlay */}
            <path
              d={FULL_LOGO_PATH}
              fill="url(#specular-sweep)"
              fillRule="evenodd"
              filter="url(#soft-bloom)"
              opacity={baseFillOpacity}
            />

            {/* 3. Precision Rim-Light Trace per Letter */}
            {BIRIM_LETTERS.map((letter, idx) => {
              const traceProgress = interpolate(
                frame,
                [idx * 6, 48 + idx * 6],
                [0, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.out(Easing.cubic),
                }
              );
              const rimFade = interpolate(frame, [60, 105], [1, 0.25], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const evolved = evolvePath(traceProgress, letter.outerPath);

              return (
                <path
                  key={letter.id}
                  d={letter.outerPath}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth={0.75}
                  strokeOpacity={rimFade}
                  strokeDasharray={evolved.strokeDasharray}
                  strokeDashoffset={evolved.strokeDashoffset}
                />
              );
            })}
          </g>
        </svg>

        {/* Minimalist Luxury Tagline */}
        <div
          style={{
            position: 'absolute',
            top: offsetY + renderedHeight + 68,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: textSpring,
            transform: `translateY(${interpolate(textSpring, [0, 1], [18, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 19,
              fontWeight: 300,
              letterSpacing: `${letterSpacingEm}em`,
              color: primaryColor,
              textTransform: 'uppercase',
            }}
          >
            {headline}
          </div>
          <div
            style={{
              width: interpolate(textSpring, [0, 1], [0, 48]),
              height: 1.5,
              backgroundColor: accentColor,
              marginTop: 16,
              marginBottom: 14,
              opacity: 0.85,
            }}
          />
          <div
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.32em',
              color: 'rgba(244, 241, 234, 0.55)',
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
