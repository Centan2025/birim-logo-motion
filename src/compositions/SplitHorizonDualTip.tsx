import { SceneCaption } from '../components/SceneCaption';
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

export const SplitHorizonDualTip: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor,
    primaryColor,
    backgroundColor,
    textDelayFrames,
    showLogo = true,
  } = props;

  const frame = useCurrentFrame();
  const { width: compWidth = 1920, height: compHeight = 1080, fps } = useVideoConfig();

  const isVertical = compHeight > compWidth;
  const isSquare = compWidth === compHeight;
  const scale = isVertical ? 2.0 : isSquare ? 2.2 : 2.95;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const halfHeight = renderedHeight / 2;

  const isTransparent = backgroundColor === 'transparent';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#F5F3EE'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1200,
        overflow: 'hidden',
      }}
    >
      {showLogo !== false && (
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
      )}

      {/* Dynamic Architecture Caption */}
      <SceneCaption
        {...props}
        primaryColor={primaryColor || '#0D0E12'}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 45}
        showLogo={showLogo}
        baseTop={678}
      />
    </AbsoluteFill>
  );
};
