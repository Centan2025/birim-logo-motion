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
import { ArchitecturalGrid } from '../components/ArchitecturalGrid';
import { ArchitecturalSceneProps } from '../types/schema';

export const ModularKineticFacade: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    projectCode,
    scaleText,
    accentColor,
    primaryColor,
    backgroundColor,
    transparentBackground,
    textDelayFrames,
    showLogo = true,
  } = props;

  const frame = useSceneFrame(props.playbackSpeed);
  const { width: compWidth = 1920, height: compHeight = 1080, fps } = useVideoConfig();

  const isVertical = compHeight > compWidth;
  const isSquare = compWidth === compHeight;
  const scale = isVertical ? 1.8 : isSquare ? 2.0 : 2.65;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - (isVertical ? 100 : 20);

  const isTransparent = transparentBackground || backgroundColor === 'transparent';

  return (
    <AbsoluteFill style={{ backgroundColor: isTransparent ? 'transparent' : (backgroundColor || '#0B0D10') }}>
      <ArchitecturalGrid
        accentColor={accentColor}
        projectCode={projectCode}
        scaleText={scaleText}
        modeLabel="ÖNERİ 04 // MODÜLER CEPHE AKS SİSTEMİ & KİNETİK DİZİLİM"
        showAxes={false}
      />

      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {BIRIM_LETTERS.map((letter, idx) => {
            const slideSpring = spring({
              frame: frame - idx * 8,
              fps,
              config: { damping: 16, stiffness: 85, mass: 1.05 },
            });

            const direction = idx % 2 === 0 ? -1 : 1;
            const translateY = interpolate(slideSpring, [0, 1], [direction * 68, 0]);
            const moduleOpacity = interpolate(slideSpring, [0, 0.35, 1], [0, 1, 1]);

            return (
              <g key={letter.id}>
                {/* Structural Vertical Rail Guides for each Letter Bay */}
                <line
                  x1={letter.bounds.xMin}
                  y1={-90}
                  x2={letter.bounds.xMin}
                  y2={LOGO_VIEWBOX.height + 90}
                  stroke={accentColor}
                  strokeWidth={0.3}
                  strokeOpacity={0.4}
                  strokeDasharray="2 2"
                />
                <line
                  x1={letter.bounds.xMax}
                  y1={-90}
                  x2={letter.bounds.xMax}
                  y2={LOGO_VIEWBOX.height + 90}
                  stroke={accentColor}
                  strokeWidth={0.3}
                  strokeOpacity={0.4}
                  strokeDasharray="2 2"
                />

                {/* Moving Structural Facade Module */}
                <g
                  transform={`translate(0, ${translateY})`}
                  opacity={moduleOpacity}
                >
                  {/* Module Bounding Frame */}
                  <rect
                    x={letter.bounds.xMin - 2}
                    y={letter.bounds.yMin - 2}
                    width={letter.bounds.width + 4}
                    height={letter.bounds.height + 4}
                    fill="none"
                    stroke={accentColor}
                    strokeWidth={0.45}
                    strokeOpacity={interpolate(slideSpring, [0.7, 1], [0.85, 0.25])}
                  />

                  {/* Module Code Tag */}
                  <text
                    x={letter.bounds.xMin}
                    y={-6}
                    fill={accentColor}
                    fontSize="4.2"
                    fontFamily="'JetBrains Mono', 'Consolas', monospace"
                    fontWeight="600"
                    letterSpacing="0.08em"
                  >
                    {letter.code}
                  </text>

                  {/* Live Delta Y Readout while sliding */}
                  <text
                    x={letter.bounds.xMax}
                    y={LOGO_VIEWBOX.height + 9}
                    textAnchor="end"
                    fill={primaryColor}
                    fillOpacity={0.65}
                    fontSize="3.6"
                    fontFamily="'JetBrains Mono', 'Consolas', monospace"
                  >
                    ΔY:{Math.abs(translateY).toFixed(1)}
                  </text>

                  {/* Solid Letter Geometry */}
                  <path
                    d={letter.compoundPath}
                    fill={primaryColor}
                    fillRule="evenodd"
                  />
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      )}

      {/* Architectural Caption */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 34}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};
