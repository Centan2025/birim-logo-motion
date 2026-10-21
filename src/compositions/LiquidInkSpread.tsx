import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SceneCaption } from '../components/SceneCaption';
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const LiquidInkSpread: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor = '#B89758',
    backgroundColor,
    transparentBackground,
    logoScale = 1,
    showLogo = true,
    textDelayFrames,
  } = props;
  const isTransparent = transparentBackground || backgroundColor === 'transparent';
  const frame = useCurrentFrame();
  const { fps, width: compWidth = 1920, height: compHeight = 1080 } = useVideoConfig();

  const scale = 2.95 * logoScale;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - 36;

  const animSpring = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 85 },
  });

  // Expanding inversion portal radius (0 -> 1250px)
  const portalRadius = interpolate(frame, [28, 108], [0, 1250], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#F7F5F0'), overflow: 'hidden' }}>
      <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
        <defs>
          <clipPath id="inversion-portal-clip">
            <circle cx={compWidth / 2} cy={compHeight / 2 - 36} r={portalRadius} />
          </clipPath>
        </defs>

        {/* Layer 1: Light Background + Dark Logo */}
        {showLogo !== false && (
          <g
            transform={`translate(${compWidth / 2}, ${compHeight / 2 - 36}) scale(${interpolate(animSpring, [0, 1], [0.86, 1])}) translate(-${compWidth / 2}, -${compHeight / 2 - 36})`}
            opacity={animSpring}
          >
            <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
              <path d={FULL_LOGO_PATH} fill={isTransparent ? (props.primaryColor || '#F4F1EA') : '#0B0C0E'} fillRule="evenodd" />
            </g>
          </g>
        )}

        {/* Layer 2: Expanding Dark Portal + Inverted Light Logo */}
        <g clipPath="url(#inversion-portal-clip)">
          {!isTransparent && <rect x={0} y={0} width={compWidth} height={compHeight} fill="#0B0C0E" />}
          {showLogo !== false && (
            <g
              transform={`translate(${compWidth / 2}, ${compHeight / 2 - 36}) scale(${interpolate(animSpring, [0, 1], [0.86, 1])}) translate(-${compWidth / 2}, -${compHeight / 2 - 36})`}
            >
              <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
                <path d={FULL_LOGO_PATH} fill={isTransparent ? accentColor : "#F7F5F0"} fillRule="evenodd" />
              </g>
            </g>
          )}
        </g>

        {/* Expanding Accent Ring at Portal Boundary */}
        {portalRadius > 2 && portalRadius < 1200 && (
          <circle
            cx={compWidth / 2}
            cy={compHeight / 2 - 36}
            r={portalRadius}
            fill="none"
            stroke={accentColor}
            strokeWidth={3.5}
          />
        )}
      </svg>

      {/* Dynamic Inverted Caption */}
      <SceneCaption
        {...props}
        primaryColor={isTransparent ? (props.primaryColor || '#F4F1EA') : (portalRadius > 450 ? '#F7F5F0' : (props.primaryColor || '#0B0C0E'))}
        delayFrames={textDelayFrames ?? 34}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};
