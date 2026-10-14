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
import { AnimatedTextLine } from '../components/SceneCaption';

export const MinimalCornerWatermark: React.FC<LowerThirdProps> = ({
  projectTitle,
  architecturalPhase,
  tagline,
  locationYear,
  accentColor,
  primaryColor = '#FFFFFF',
  taglineColor,
  transparentBackground,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  taglineSize = 11,
  letterSpacing = 0.38,
  textOffsetX = 0,
  textOffsetY = 0,
  textAnimation = 'char-wave',
  textDelayFrames,
  line1Delay,
  line2Delay,
  line3Delay,
  showLogo = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Phase 1 (0..38): Center Hero Intro -> Phase 2 (38..72): Glide to Top-Left Corner Bug
  const dockProgress = interpolate(frame, [36, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const logoX = interpolate(dockProgress, [0, 1], [960, 175]);
  const logoY = interpolate(dockProgress, [0, 1], [500, 78]);
  const logoScale = interpolate(dockProgress, [0, 1], [1.65, 0.36]);

  const bottomBarSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const exitAlpha = interpolate(
    frame,
    [durationInFrames - 22, durationInFrames - 3],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: transparentBackground ? 'transparent' : '#0B0D12',
        opacity: exitAlpha,
      }}
    >
      {!transparentBackground && (
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(circle at 50% 40%, #1B212C 0%, #0B0D12 72%)',
          }}
        />
      )}

      {/* Top-Left Corner Pill Backdrop (fades in when logo docks) */}
      <div
        style={{
          position: 'absolute',
          top: 42,
          left: 56,
          height: 72,
          paddingLeft: 215,
          paddingRight: 26,
          borderRadius: 999,
          backgroundColor: 'rgba(15, 17, 23, 0.78)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: dockProgress,
          transform: `scale(${interpolate(dockProgress, [0, 1], [0.9, 1])})`,
        }}
      >
        <div
          style={{
            width: 1,
            height: 28,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            marginRight: 6,
          }}
        />
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
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          {locationYear}
        </span>
      </div>

      {/* Hero-to-Corner Morphing BİRİM Logo */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <g
          transform={`translate(${logoX}, ${logoY}) scale(${logoScale}) translate(${-LOGO_VIEWBOX.width / 2}, ${-LOGO_VIEWBOX.height / 2})`}
        >
          {BIRIM_LETTERS.map((letter, idx) => {
            const enterS = spring({
              frame: frame - idx * 3,
              fps,
              config: { damping: 16, stiffness: 120 },
            });
            return (
              <path
                key={letter.id}
                d={letter.compoundPath}
                fill="#FFFFFF"
                fillRule="evenodd"
                opacity={enterS}
                transform={`translate(0, ${interpolate(enterS, [0, 1], [20, 0])})`}
              />
            );
          })}
        </g>
      </svg>

      {/* Bottom-Center Modern Cinema Caption Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 68,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: bottomBarSpring,
          transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateY(${interpolate(bottomBarSpring, [0, 1], [24, 0])}px)`,
        }}
      >
        <div
          style={{
            padding: '16px 38px',
            borderRadius: 20,
            backgroundColor: 'rgba(15, 17, 23, 0.84)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <span
            style={{
              padding: '5px 12px',
              borderRadius: 8,
              backgroundColor: accentColor,
              color: '#0B0D12',
              fontFamily,
              fontSize: subtitleSize,
              fontWeight: 700,
              letterSpacing: `${letterSpacing}em`,
              textTransform: 'uppercase',
            }}
          >
            {architecturalPhase}
          </span>
          <AnimatedTextLine
            text={projectTitle}
            animation={textAnimation}
            startFrame={line1Delay ?? textDelayFrames ?? 56}
            fontFamily={fontFamily}
            fontSize={headlineSize}
            fontWeight={600}
            letterSpacing={Math.max(0.04, letterSpacing * 0.7)}
            color={primaryColor ?? '#FFFFFF'}
            accentColor={accentColor}
          />
          {tagline && (
            <span
              style={{
                fontFamily,
                fontSize: taglineSize,
                letterSpacing: `${Math.max(0.04, letterSpacing * 0.6)}em`,
                color: taglineColor ?? accentColor,
                textTransform: 'uppercase',
              }}
            >
              <AnimatedTextLine
                text={tagline}
                animation={textAnimation}
                startFrame={line2Delay ?? (textDelayFrames !== undefined ? textDelayFrames + 8 : 64)}
                fontFamily={fontFamily}
                fontSize={taglineSize}
                fontWeight={500}
                letterSpacing={Math.max(0.04, letterSpacing * 0.6)}
                color={taglineColor ?? accentColor}
                accentColor={accentColor}
                isSubtitle
              />
            </span>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
