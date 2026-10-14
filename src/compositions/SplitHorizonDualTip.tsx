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

export const SplitHorizonDualTip: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  accentColor,
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
    frame: frame - 56,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F5F3EE',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1200,
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
        }}
      >
        {BIRIM_LETTERS.map((letter, idx) => {
          const isEven = idx % 2 === 0;

          // Top Half Tips Down
          const topSpring = spring({
            frame: frame - idx * 5,
            fps,
            config: { damping: 14, stiffness: 110 },
          });

          // Bottom Half Tips Down with Stagger
          const botSpring = spring({
            frame: frame - 8 - idx * 5,
            fps,
            config: { damping: 13, stiffness: 100 },
          });

          const topRotX = interpolate(topSpring, [0, 1], [-92, 0]);
          const botRotX = interpolate(
            botSpring,
            [0, 1],
            [isEven ? -92 : 92, 0]
          );

          return (
            <React.Fragment key={letter.id}>
              {/* UPPER HALF */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: renderedWidth,
                  height: halfHeight + 0.5,
                  overflow: 'hidden',
                  transformOrigin: 'center top',
                  transform: `rotateX(${topRotX}deg)`,
                }}
              >
                <svg
                  width={renderedWidth}
                  height={renderedHeight}
                  viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
                >
                  <path
                    d={letter.compoundPath}
                    fill="#0D0E12"
                    fillRule="evenodd"
                  />
                </svg>
              </div>

              {/* LOWER HALF */}
              <div
                style={{
                  position: 'absolute',
                  top: halfHeight,
                  left: 0,
                  width: renderedWidth,
                  height: halfHeight + 0.5,
                  overflow: 'hidden',
                  transformOrigin: 'center top',
                  transform: `rotateX(${botRotX}deg)`,
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
                    fill={botSpring < 0.45 ? accentColor : '#0D0E12'}
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Caption on Light Gallery Stage */}
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
            fontWeight: 600,
            letterSpacing: `${letterSpacing}em`,
            color: '#0D0E12',
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontFamily,
            fontSize: subtitleSize,
            fontWeight: 600,
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
