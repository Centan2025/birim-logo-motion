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
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const HalfLogoCantileverDrop: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  accentColor,
  primaryColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  letterSpacing = 0.38,
  textOffsetX = 0,
  textOffsetY = 0,
  textAnimation = 'char-wave',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.9;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const halfWidth = renderedWidth / 2;

  // Phase 1 (0..18): Full logo enters
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 110 },
  });

  // Phase 2 (18..58): Right half tips/drops down around the center hinge
  const dropProgress = interpolate(frame, [16, 42], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Phase 3 (56..105): Right half snaps back up with elastic spring
  const recoverSpring = spring({
    frame: frame - 56,
    fps,
    config: { damping: 10, stiffness: 105, mass: 0.95 },
  });

  // Net tilt factor (0 -> 1 during drop, 1 -> 0 during recovery)
  const netTilt = dropProgress * (1 - recoverSpring);

  const rightRotateZ = netTilt * 24;
  const rightRotateX = netTilt * -38;
  const rightDropY = netTilt * 36;

  // Left half has a subtle counter-recoil when right half snaps back
  const leftRecoil =
    frame >= 56
      ? Math.sin((frame - 56) * 0.45) *
        interpolate(frame, [56, 95], [3.5, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  const textSpring = spring({
    frame: frame - 66,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#08090D',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1300,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: renderedWidth,
          height: renderedHeight,
          transformStyle: 'preserve-3d',
          marginTop: -36,
          opacity: enterSpring,
          transform: `scale(${interpolate(enterSpring, [0, 1], [0.9, 1])})`,
        }}
      >
        {/* LEFT HALF (B - I - half of R): Anchored at Center Hinge */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: 0,
            width: halfWidth,
            height: renderedHeight + 120,
            overflow: 'hidden',
            transformOrigin: 'right center',
            transform: `rotateZ(${leftRecoil}deg)`,
          }}
        >
          <svg
            width={renderedWidth}
            height={renderedHeight}
            viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
            style={{ marginTop: 60 }}
          >
            <path d={FULL_LOGO_PATH} fill={primaryColor} fillRule="evenodd" />
          </svg>
        </div>

        {/* RIGHT HALF (half of R - I - M): Tips Down from Center Hinge & Snaps Back */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: halfWidth,
            width: halfWidth + 60,
            height: renderedHeight + 220,
            overflow: 'hidden',
            transformOrigin: 'left center',
            transform: `translateY(${rightDropY}px) rotateZ(${rightRotateZ}deg) rotateX(${rightRotateX}deg)`,
          }}
        >
          <svg
            width={renderedWidth}
            height={renderedHeight}
            viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
            style={{
              marginTop: 60,
              transform: `translateX(${-halfWidth}px)`,
            }}
          >
            {/* Accent Shadow Layer when Tilted */}
            <path
              d={FULL_LOGO_PATH}
              fill={accentColor}
              fillRule="evenodd"
              opacity={netTilt * 0.85}
              transform={`translate(0, ${netTilt * 6})`}
            />
            <path d={FULL_LOGO_PATH} fill={primaryColor} fillRule="evenodd" />
          </svg>
        </div>

        {/* Center Fracture / Hinge Indicator Line */}
        <div
          style={{
            position: 'absolute',
            left: halfWidth - 1,
            top: -28,
            height: renderedHeight + 56,
            width: 2,
            backgroundColor: accentColor,
            opacity: netTilt * 0.9,
          }}
        />
      </div>

      {/* Caption */}
      <div
        style={{
          marginTop: 68,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: textSpring,
          transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateY(${interpolate(textSpring, [0, 1], [18, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: headlineSize,
            fontWeight: 500,
            letterSpacing: `${letterSpacing}em`,
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          <AnimatedTextLine
            text={headline}
            fontFamily={fontFamily}
            fontSize={headlineSize}
            letterSpacing={letterSpacing}
            color="inherit"
            accentColor={accentColor}
            animation={textAnimation}
            startFrame={34}
          />
        </div>
        <div
          style={{
            fontFamily,
            fontSize: subtitleSize,
            fontWeight: 400,
            letterSpacing: `${Math.max(0.04, letterSpacing * 0.7)}em`,
            color: accentColor,
            textTransform: 'uppercase',
          }}
        >
          <AnimatedTextLine
            text={subtitle}
            fontFamily={fontFamily}
            fontSize={subtitleSize}
            letterSpacing={Math.max(0.04, letterSpacing * 0.7)}
            color="inherit"
            accentColor={accentColor}
            animation={textAnimation}
            startFrame={42}
            isSubtitle
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
