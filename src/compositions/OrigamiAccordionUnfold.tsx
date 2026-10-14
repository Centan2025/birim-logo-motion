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

export const OrigamiAccordionUnfold: React.FC<ArchitecturalSceneProps> = ({
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
  const bandHeight = renderedHeight / 3;

  const textSpring = spring({
    frame: frame - 64,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1400,
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
          const s1 = spring({
            frame: frame - idx * 4,
            fps,
            config: { damping: 15, stiffness: 110 },
          });
          const s2 = spring({
            frame: frame - 10 - idx * 4,
            fps,
            config: { damping: 14, stiffness: 105 },
          });
          const s3 = spring({
            frame: frame - 20 - idx * 4,
            fps,
            config: { damping: 13, stiffness: 100 },
          });

          const rot1 = interpolate(s1, [0, 1], [-92, 0]);
          const rot2 = interpolate(s2, [0, 1], [150, 0]);
          const rot3 = interpolate(s3, [0, 1], [-150, 0]);

          return (
            <React.Fragment key={letter.id}>
              {/* STAGE 1: Top 1/3 Unfolds Down */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: renderedWidth,
                  height: bandHeight + 0.5,
                  overflow: 'hidden',
                  transformOrigin: 'center top',
                  transform: `rotateX(${rot1}deg)`,
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

              {/* STAGE 2: Middle 1/3 Unfolds Down from Stage 1 */}
              <div
                style={{
                  position: 'absolute',
                  top: bandHeight,
                  left: 0,
                  width: renderedWidth,
                  height: bandHeight + 0.5,
                  overflow: 'hidden',
                  transformOrigin: 'center top',
                  transform: `rotateX(${rot2}deg)`,
                  opacity: interpolate(s2, [0, 0.15, 1], [0, 1, 1]),
                }}
              >
                <svg
                  width={renderedWidth}
                  height={renderedHeight}
                  viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
                  style={{ transform: `translateY(${-bandHeight}px)` }}
                >
                  <path
                    d={letter.compoundPath}
                    fill={s2 < 0.4 ? accentColor : primaryColor}
                    fillRule="evenodd"
                  />
                  <path
                    d={letter.compoundPath}
                    fill="#000000"
                    fillRule="evenodd"
                    opacity={interpolate(s2, [0, 1], [0.55, 0])}
                  />
                </svg>
              </div>

              {/* STAGE 3: Bottom 1/3 Unfolds Down from Stage 2 */}
              <div
                style={{
                  position: 'absolute',
                  top: bandHeight * 2,
                  left: 0,
                  width: renderedWidth,
                  height: bandHeight + 1,
                  overflow: 'hidden',
                  transformOrigin: 'center top',
                  transform: `rotateX(${rot3}deg)`,
                  opacity: interpolate(s3, [0, 0.15, 1], [0, 1, 1]),
                }}
              >
                <svg
                  width={renderedWidth}
                  height={renderedHeight}
                  viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
                  style={{ transform: `translateY(${-bandHeight * 2}px)` }}
                >
                  <path
                    d={letter.compoundPath}
                    fill={s3 < 0.4 ? accentColor : primaryColor}
                    fillRule="evenodd"
                  />
                  <path
                    d={letter.compoundPath}
                    fill="#000000"
                    fillRule="evenodd"
                    opacity={interpolate(s3, [0, 1], [0.65, 0])}
                  />
                </svg>
              </div>
            </React.Fragment>
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
