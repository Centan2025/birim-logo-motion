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

export const MagneticParticleSnap: React.FC<ArchitecturalSceneProps> = ({
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
  const offsetY = (1080 - renderedHeight) / 2 - 36;

  const solidOpacity = interpolate(frame, [52, 82], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const nodesFadeOut = interpolate(frame, [62, 95], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textSpring = spring({
    frame: frame - 62,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#06080E', overflow: 'hidden' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {BIRIM_LETTERS.map((letter, lIdx) => {
            // Compute animated vertex positions for each segment endpoint
            const animatedPoints = letter.segments.map((seg, sIdx) => {
              const target = seg.points[0];
              const seed = lIdx * 17 + sIdx * 13;
              const startX = target[0] + Math.sin(seed * 1.7) * 95;
              const startY = target[1] + Math.cos(seed * 2.3) * 85;

              const snap = spring({
                frame: frame - lIdx * 4 - (sIdx % 6) * 2,
                fps,
                config: { damping: 15, stiffness: 90 },
              });

              const curX = interpolate(snap, [0, 1], [startX, target[0]]);
              const curY = interpolate(snap, [0, 1], [startY, target[1]]);
              return { x: curX, y: curY, snap };
            });

            return (
              <g key={letter.id}>
                {/* Solid Letter Materialization */}
                <path
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                  opacity={solidOpacity}
                />

                {/* Constellation Plexus Lines & Magnetic Nodes */}
                {nodesFadeOut > 0.01 && (
                  <g opacity={nodesFadeOut}>
                    {animatedPoints.map((pt, i) => {
                      const nextPt =
                        animatedPoints[(i + 1) % animatedPoints.length];
                      const thirdPt =
                        animatedPoints[(i + 3) % animatedPoints.length];

                      return (
                        <g key={i}>
                          <line
                            x1={pt.x}
                            y1={pt.y}
                            x2={nextPt.x}
                            y2={nextPt.y}
                            stroke={primaryColor}
                            strokeWidth={0.45}
                            strokeOpacity={0.55 * pt.snap}
                          />
                          <line
                            x1={pt.x}
                            y1={pt.y}
                            x2={thirdPt.x}
                            y2={thirdPt.y}
                            stroke={accentColor}
                            strokeWidth={0.28}
                            strokeOpacity={0.35 * pt.snap}
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={1.35}
                            fill={i % 2 === 0 ? accentColor : primaryColor}
                          />
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Clean Minimal Caption */}
      <div
        style={{
          position: 'absolute',
          top: offsetY + renderedHeight + 58,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          opacity: textSpring,
          transform: `translateY(${interpolate(textSpring, [0, 1], [16, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 19,
            fontWeight: 500,
            letterSpacing: '0.4em',
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '0.28em',
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
