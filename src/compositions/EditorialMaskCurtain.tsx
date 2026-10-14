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

export const EditorialMaskCurtain: React.FC<ArchitecturalSceneProps> = (props) => {
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
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - (isVertical ? 100 : 48);

  const isTransparent = backgroundColor === 'transparent';

  const lineExpand = spring({
    frame: frame - 4,
    fps,
    config: { damping: 24, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#121110'),
        overflow: 'hidden',
      }}
    >
      {showLogo !== false && (
        <>
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
        <defs>
          <clipPath id="editorial-horizon-mask">
            <rect
              x={-50}
              y={-40}
              width={LOGO_VIEWBOX.width + 100}
              height={LOGO_VIEWBOX.height + 42}
            />
          </clipPath>
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {/* Masked Letters Rising from the Invisible Baseline */}
          <g clipPath="url(#editorial-horizon-mask)">
            {BIRIM_LETTERS.map((letter, idx) => {
              const rise = spring({
                frame: frame - 10 - idx * 6,
                fps,
                config: { damping: 22, stiffness: 88, mass: 1.05 },
              });

              const yOffset = interpolate(
                rise,
                [0, 1],
                [LOGO_VIEWBOX.height + 16, 0]
              );

              return (
                <path
                  key={letter.id}
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                  transform={`translate(0, ${yOffset})`}
                />
              );
            })}
          </g>

          {/* Razor-Thin Horizon Slit Line */}
          <line
            x1={(LOGO_VIEWBOX.width / 2) * (1 - lineExpand)}
            y1={LOGO_VIEWBOX.height + 10}
            x2={
              LOGO_VIEWBOX.width -
              (LOGO_VIEWBOX.width / 2) * (1 - lineExpand)
            }
            y2={LOGO_VIEWBOX.height + 10}
            stroke={accentColor}
            strokeWidth={0.6}
            strokeOpacity={0.75}
          />
        </g>
      </svg>
      </>
      )}

      {/* Dynamic Architecture Caption */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 32}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};
