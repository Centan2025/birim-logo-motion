import { useSceneFrame } from '../utils/useSceneFrame';
import { AnimatedTextLine } from '../components/SceneCaption';
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
  tagline,
  locationYear,
  accentColor,
  primaryColor,
  transparentBackground,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  taglineSize,
  letterSpacing = 0.38,
  textOffsetX = 0,
  textOffsetY = 0,
  textAnimation = 'char-wave',
  textDelayFrames,
  showLogo = true,
  ...restProps
}: LowerThirdProps & { backgroundColor?: string }) => {
  const isTransparent = transparentBackground || restProps.backgroundColor === 'transparent';
  const frame = useSceneFrame(restProps.playbackSpeed);
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
        backgroundColor: isTransparent ? 'transparent' : (restProps.backgroundColor || '#111418'),
      }}
    >
      {/* Simulated Architectural Camera Viewport (hidden when exporting transparent overlay) */}
      {!isTransparent && (
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
          transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateX(${interpolate(visibility, [0, 1], [-40, 0])}px)`,
          overflow: 'hidden',
        }}
      >
        {/* Left Cell: Animated BİRİM Vector Logo */}
        {showLogo !== false && (
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
        )}

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
              fontFamily,
              fontSize: headlineSize,
              letterSpacing: `${letterSpacing}em`,
              color: accentColor,
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            <AnimatedTextLine
              text={architecturalPhase}
              fontFamily={fontFamily}
              fontSize={subtitleSize}
              letterSpacing={Math.max(0.04, letterSpacing * 0.7)}
              color="inherit"
              accentColor={accentColor}
              animation={textAnimation}
              startFrame={(textDelayFrames ?? 34) + 8}
              isSubtitle
            />
          </div>
          <div
            style={{
              fontFamily,
              fontSize: subtitleSize,
              fontWeight: 600,
              letterSpacing: `${Math.max(0.04, letterSpacing * 0.7)}em`,
              color: primaryColor ?? '#F4F1EA',
              textTransform: 'uppercase',
            }}
          >
            <AnimatedTextLine
              text={projectTitle}
              fontFamily={fontFamily}
              fontSize={headlineSize}
              letterSpacing={letterSpacing}
              color="inherit"
              accentColor={accentColor}
              animation={textAnimation}
              startFrame={textDelayFrames ?? 34}
            />
          </div>
          {tagline && (
            <div
              style={{
                fontFamily,
                fontSize: taglineSize ?? Math.round(subtitleSize * 0.85),
                letterSpacing: `${letterSpacing}em`,
                color: 'rgba(244, 241, 234, 0.65)',
                textTransform: 'uppercase',
                marginTop: 6,
              }}
            >
              <AnimatedTextLine
                text={tagline}
                fontFamily={fontFamily}
                fontSize={taglineSize ?? Math.round(subtitleSize * 0.85)}
                letterSpacing={letterSpacing}
                color="inherit"
                accentColor={accentColor}
                animation={textAnimation}
                startFrame={(textDelayFrames ?? 34) + 16}
                isSubtitle
              />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
