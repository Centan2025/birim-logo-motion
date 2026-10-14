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
import { ArchitecturalSceneProps } from '../types/schema';

export const NeonLaserContour: React.FC<ArchitecturalSceneProps> = ({
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
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 36;

  const coreFill = interpolate(frame, [62, 96], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const textSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#040508', overflow: 'hidden' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {BIRIM_LETTERS.map((letter, idx) => {
            const p1 = interpolate(
              frame,
              [idx * 5, 58 + idx * 5],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.inOut(Easing.cubic),
              }
            );
            const p2 = interpolate(
              frame,
              [8 + idx * 5, 66 + idx * 5],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.inOut(Easing.cubic),
              }
            );

            const evolvedPrimary = evolvePath(p1, letter.outerPath);
            const evolvedSecondary = evolvePath(p2, letter.outerPath);

            return (
              <g key={letter.id}>
                {/* Solid Core Ignition */}
                <path
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                  opacity={coreFill}
                />

                {/* Outer Neon Beam 1 (Accent Color) */}
                <path
                  d={letter.outerPath}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth={1.3}
                  filter="url(#neon-glow)"
                  strokeDasharray={evolvedPrimary.strokeDasharray}
                  strokeDashoffset={evolvedPrimary.strokeDashoffset}
                  opacity={interpolate(frame, [75, 110], [1, 0.35], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />

                {/* Outer Neon Beam 2 (Cyan Counter-Beam) */}
                <path
                  d={letter.outerPath}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth={0.75}
                  filter="url(#neon-glow)"
                  strokeDasharray={evolvedSecondary.strokeDasharray}
                  strokeDashoffset={evolvedSecondary.strokeDashoffset}
                  opacity={interpolate(frame, [70, 105], [0.95, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />

                {/* Inner Holes Laser Trace */}
                {letter.holePaths.map((hp, hIdx) => {
                  const holeEv = evolvePath(p1, hp);
                  return (
                    <path
                      key={hIdx}
                      d={hp}
                      fill="none"
                      stroke={accentColor}
                      strokeWidth={1}
                      filter="url(#neon-glow)"
                      strokeDasharray={holeEv.strokeDasharray}
                      strokeDashoffset={holeEv.strokeDashoffset}
                      opacity={interpolate(frame, [75, 110], [1, 0.3], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      })}
                    />
                  );
                })}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Clean Minimalist Neon Subtitle */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 60,
          left: 0,
          right: 0,
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
