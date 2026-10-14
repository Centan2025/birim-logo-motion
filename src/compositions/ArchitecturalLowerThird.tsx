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
import { BIRIM_LETTERS, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { LowerThirdProps } from '../types/schema';

export const ArchitecturalLowerThird: React.FC<LowerThirdProps> = ({
  projectTitle,
  architecturalPhase,
  locationYear,
  accentColor,
  transparentBackground,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 28, durationInFrames - 4],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    }
  );

  const visibility = enterSpring * exitProgress;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparentBackground ? 'transparent' : '#111418',
      }}
    >
      {/* Simulated Architectural Camera Viewport (hidden when exporting transparent overlay) */}
      {!transparentBackground && (
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(circle at 70% 35%, #232931 0%, #111418 70%)',
          }}
        >
          {/* Architectural Perspective Wireframe Lines in Background */}
          <svg width="1920" height="1080" viewBox="0 0 1920 1080" opacity={0.18}>
            <line x1="0" y1="740" x2="1920" y2="740" stroke="#F4F1EA" strokeWidth="1" />
            <line x1="240" y1="0" x2="240" y2="1080" stroke="#F4F1EA" strokeWidth="0.6" />
            <line x1="1680" y1="0" x2="1680" y2="1080" stroke="#F4F1EA" strokeWidth="0.6" />
            <line x1="240" y1="180" x2="1680" y2="740" stroke={accentColor} strokeWidth="0.8" />
            <line x1="1680" y1="180" x2="240" y2="740" stroke="#F4F1EA" strokeWidth="0.5" />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: 56,
              left: 76,
              fontFamily: "'JetBrains Mono', 'Consolas', monospace",
              fontSize: 12,
              letterSpacing: '0.2em',
              color: 'rgba(244, 241, 234, 0.45)',
            }}
          >
            ÖNERİ 05 // VİDEO ÜSTÜ MİMARİ ALT BANT (TRANSPARAN EXPORT DESTEKLİ)
          </div>
        </AbsoluteFill>
      )}

      {/* Top-Right Minimal Corner Stamp */}
      <div
        style={{
          position: 'absolute',
          top: 56,
          right: 76,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '8px 16px',
          border: `1px solid rgba(244, 241, 234, 0.22)`,
          backgroundColor: 'rgba(11, 13, 16, 0.72)',
          backdropFilter: 'blur(8px)',
          opacity: visibility,
          transform: `translateY(${interpolate(visibility, [0, 1], [-16, 0])}px)`,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            backgroundColor: accentColor,
          }}
        />
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Consolas', monospace",
            fontSize: 12,
            letterSpacing: '0.22em',
            color: '#F4F1EA',
          }}
        >
          {locationYear}
        </span>
      </div>

      {/* Bottom-Left Architectural Title Block / Lower Third */}
      <div
        style={{
          position: 'absolute',
          bottom: 76,
          left: 76,
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: 'rgba(11, 13, 16, 0.86)',
          border: '1px solid rgba(244, 241, 234, 0.22)',
          borderLeft: `4px solid ${accentColor}`,
          backdropFilter: 'blur(12px)',
          opacity: visibility,
          transform: `translateX(${interpolate(visibility, [0, 1], [-40, 0])}px)`,
          overflow: 'hidden',
        }}
      >
        {/* Left Cell: Animated BİRİM Vector Logo */}
        <div
          style={{
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '1px solid rgba(244, 241, 234, 0.15)',
          }}
        >
          <svg
            width={LOGO_VIEWBOX.width * 0.48}
            height={LOGO_VIEWBOX.height * 0.48}
            viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
          >
            {BIRIM_LETTERS.map((letter, idx) => {
              const p = interpolate(
                frame,
                [4 + idx * 4, 28 + idx * 4],
                [0, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                  easing: Easing.out(Easing.cubic),
                }
              );
              const evolved = evolvePath(p, letter.outerPath);
              return (
                <g key={letter.id}>
                  <path
                    d={letter.compoundPath}
                    fill="#F4F1EA"
                    fillRule="evenodd"
                    opacity={interpolate(frame, [22 + idx * 3, 38 + idx * 3], [0, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    })}
                  />
                  <path
                    d={letter.outerPath}
                    fill="none"
                    stroke={accentColor}
                    strokeWidth={2}
                    strokeDasharray={evolved.strokeDasharray}
                    strokeDashoffset={evolved.strokeDashoffset}
                  />
                </g>
              );
            })}
          </svg>
          <div
            style={{
              fontFamily: "'JetBrains Mono', 'Consolas', monospace",
              fontSize: 9,
              letterSpacing: '0.26em',
              color: accentColor,
              marginTop: 8,
            }}
          >
            MİMARLIK &amp; TASARIM
          </div>
        </div>

        {/* Right Cell: Dynamic Video Text Metadata */}
        <div
          style={{
            padding: '20px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: 460,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', 'Consolas', monospace",
              fontSize: 11,
              letterSpacing: '0.24em',
              color: accentColor,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {architecturalPhase}
          </div>
          <div
            style={{
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#F4F1EA',
              textTransform: 'uppercase',
            }}
          >
            {projectTitle}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
