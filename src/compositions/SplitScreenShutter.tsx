import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { SceneCaption } from '../components/SceneCaption';
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalSceneProps } from '../types/schema';

export const SplitScreenShutter: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    accentColor = '#B89758',
    primaryColor = '#E6EDF3',
    backgroundColor,
    transparentBackground,
    logoScale = 1,
    showLogo = true,
    textDelayFrames,
  } = props;
  const isTransparent = transparentBackground || backgroundColor === 'transparent';
  const frame = useCurrentFrame();
  const { fps, width: compWidth = 1920, height: compHeight = 1080 } = useVideoConfig();

  const scale = 2.85 * logoScale;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - 20;

  const shutterSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 20, stiffness: 80, mass: 1.1 },
  });

  const macroZoom = interpolate(shutterSpring, [0, 1], [2.45, 1]);
  const shutterOffset = interpolate(shutterSpring, [0, 1], [0, 820]);

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#0A0B0E'), overflow: 'hidden' }}>
      <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
        {/* Center Macro-to-Normal Logo */}
        {showLogo !== false && (
          <g
            transform={`translate(${compWidth / 2}, ${compHeight / 2 - 20}) scale(${macroZoom}) translate(-${compWidth / 2}, -${compHeight / 2 - 20})`}
          >
            <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
              <path d={FULL_LOGO_PATH} fill={primaryColor} fillRule="evenodd" />
            </g>
          </g>
        )}

        {/* Top-Left Diagonal Shutter Blade */}
        <g transform={`translate(${-shutterOffset}, ${-shutterOffset * 0.55})`}>
          <polygon
            points="-200,-200 2120,-200 -200,1280"
            fill="#14161D"
            stroke={accentColor}
            strokeWidth={3}
          />
        </g>

        {/* Bottom-Right Diagonal Shutter Blade */}
        <g transform={`translate(${shutterOffset}, ${shutterOffset * 0.55})`}>
          <polygon
            points="2120,-200 2120,1280 -200,1280"
            fill="#14161D"
            stroke={accentColor}
            strokeWidth={3}
          />
        </g>
      </svg>

      {/* Modern Minimal Typography */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames ?? 34}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};

