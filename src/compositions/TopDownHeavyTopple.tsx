import { AnimatedTextLine } from '../components/SceneCaption';
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

export const TopDownHeavyTopple: React.FC<ArchitecturalSceneProps> = ({
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

  const scale = 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;

  const textSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07080C',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1100,
        overflow: 'hidden',
      }}
    >
      {/* Top Hinge Axis Bar */}
      <div
        style={{
          width: renderedWidth,
          height: 1,
          backgroundColor: 'rgba(255,255,255,0.16)',
          marginBottom: -1,
        }}
      />

      {/* 3D Top-Hinged Toppling Letters */}
      <div
        style={{
          position: 'relative',
          width: renderedWidth,
          height: renderedHeight,
          transformStyle: 'preserve-3d',
          marginTop: -30,
        }}
      >
        {BIRIM_LETTERS.map((letter, idx) => {
          const topple = spring({
            frame: frame - idx * 6,
            fps,
            config: { damping: 11, stiffness: 90, mass: 1.15 },
          });

          // Swings down from ceiling (-95deg) to vertical plane (0deg)
          const rotX = interpolate(topple, [0, 1], [-95, 0]);
          const zLift = interpolate(topple, [0, 0.5, 1], [140, 45, 0]);

          // Impact flash when letter hits 0deg
          const impactPulse = interpolate(
            topple,
            [0.75, 0.95, 1],
            [0, 1, 0],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          return (
            <div
              key={letter.id}
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'center top',
                transform: `translateZ(${zLift}px) rotateX(${rotX}deg)`,
              }}
            >
              <svg
                width={renderedWidth}
                height={renderedHeight}
                viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
                style={{ overflow: 'visible' }}
              >
                {/* Floor Cast Shadow Before Impact */}
                <path
                  d={letter.compoundPath}
                  fill="#000000"
                  fillRule="evenodd"
                  opacity={interpolate(topple, [0, 0.6, 1], [0, 0.5, 0])}
                  transform={`translate(0, ${interpolate(topple, [0, 1], [48, 0])})`}
                />

                {/* Accent Extrusion Thickness Rim during Topple */}
                <path
                  d={letter.compoundPath}
                  fill={accentColor}
                  fillRule="evenodd"
                  opacity={interpolate(topple, [0, 0.4, 0.95, 1], [0.9, 0.85, 0.25, 0])}
                  transform={`translate(0, ${interpolate(topple, [0, 1], [-5, 0])})`}
                />

                {/* Main Solid Letter */}
                <path
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                />

                {/* Bottom Impact Shockwave Bar */}
                <line
                  x1={letter.bounds.xMin}
                  y1={LOGO_VIEWBOX.height + 3}
                  x2={letter.bounds.xMax}
                  y2={LOGO_VIEWBOX.height + 3}
                  stroke={accentColor}
                  strokeWidth={1.6}
                  opacity={impactPulse}
                />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Caption */}
      <div
        style={{
          marginTop: 64,
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
