import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BIRIM_LETTERS, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const SplitFlapHalfFold: React.FC<ArchitecturalSceneProps> = ({
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
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const halfHeight = renderedHeight / 2;

  const textSpring = spring({
    frame: frame - 54,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090A0F',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1400,
        overflow: 'hidden',
      }}
    >
      {/* 3D Split-Flap Stage */}
      <div
        style={{
          position: 'relative',
          width: renderedWidth,
          height: renderedHeight,
          transformStyle: 'preserve-3d',
          marginTop: -40,
        }}
      >
        {BIRIM_LETTERS.map((letter, idx) => {
          // Top half entrance
          const topEnter = spring({
            frame: frame - idx * 5,
            fps,
            config: { damping: 16, stiffness: 110 },
          });

          // Bottom half tips DOWN from the horizontal center axis (180deg -> 0deg)
          const flapSpring = spring({
            frame: frame - 10 - idx * 6,
            fps,
            config: { damping: 12, stiffness: 95, mass: 1.05 },
          });

          const topRotateX = interpolate(topEnter, [0, 1], [-88, 0]);
          const bottomRotateX = interpolate(flapSpring, [0, 1], [175, 0]);

          // Dynamic lighting shade as the bottom half tips down
          const shadeAlpha = interpolate(
            flapSpring,
            [0, 0.45, 0.85, 1],
            [0.75, 0.55, 0.15, 0]
          );

          return (
            <React.Fragment key={letter.id}>
              {/* UPPER HALF (Hinged at Center Horizon, drops in from top) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: renderedWidth,
                  height: halfHeight,
                  overflow: 'hidden',
                  transformOrigin: 'center bottom',
                  transform: `rotateX(${topRotateX}deg)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <svg
                  width={renderedWidth}
                  height={renderedHeight}
                  viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
                >
                  <path
                    d={letter.compoundPath}
                    fill={primaryColor}
                    fillRule="evenodd"
                  />
                </svg>
              </div>

              {/* LOWER HALF (Folds/Tips DOWN from Top Half to Bottom Half) */}
              <div
                style={{
                  position: 'absolute',
                  top: halfHeight,
                  left: 0,
                  width: renderedWidth,
                  height: halfHeight,
                  overflow: 'hidden',
                  transformOrigin: 'center top',
                  transform: `rotateX(${bottomRotateX}deg)`,
                }}
              >
                <svg
                  width={renderedWidth}
                  height={renderedHeight}
                  viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
                  style={{ transform: `translateY(${-halfHeight}px)` }}
                >
                  <path
                    d={letter.compoundPath}
                    fill={flapSpring < 0.35 ? accentColor : primaryColor}
                    fillRule="evenodd"
                  />
                  {/* Dynamic 3D Crease Shadow during fold */}
                  <path
                    d={letter.compoundPath}
                    fill="#000000"
                    fillRule="evenodd"
                    opacity={shadeAlpha}
                  />
                </svg>
              </div>
            </React.Fragment>
          );
        })}

        {/* Center Mechanical Split-Flap Seam Line (fades out once locked) */}
        <div
          style={{
            position: 'absolute',
            top: halfHeight - 1,
            left: -20,
            right: -20,
            height: 2,
            backgroundColor: accentColor,
            opacity: interpolate(frame, [15, 45, 78], [0.85, 0.65, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        />
      </div>

      {/* Clean Modern Subtitle */}
      <div
        style={{
          marginTop: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: textSpring,
          transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateY(${interpolate(textSpring, [0, 1], [16, 0])}px)`,
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
          {headline}
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
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};
