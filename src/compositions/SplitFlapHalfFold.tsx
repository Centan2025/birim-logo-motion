import { useSceneFrame } from '../utils/useSceneFrame';
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

export const SplitFlapHalfFold: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor,
    primaryColor,
    backgroundColor,
    textDelayFrames = 34,
    showLogo = true,
  } = props;

  const frame = useSceneFrame(props.playbackSpeed);
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
        backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#090A0F'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1400,
        overflow: 'hidden',
      }}
    >
      {/* 3D Split-Flap Stage */}
      {showLogo !== false && (
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


        </div>
      )}

      {/* Clean Dynamic Caption */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames}
        showLogo={showLogo}
        baseTop={678}
      />
    </AbsoluteFill>
  );
};
