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

export const ModularKineticFacade: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  tagline,
  projectCode,
  scaleText,
  accentColor,
  primaryColor,
  taglineColor,
  backgroundColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 64,
  subtitleSize = 40,
  taglineSize = 28,
  letterSpacing = 0.4,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'center',
  textAnimation = 'char-wave',
  textDelayFrames,
  line1Delay,
  line2Delay,
  line3Delay,
  showLogo = true,
  aspectRatio = '16:9',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.65;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 20;

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <ArchitecturalGrid
        accentColor={accentColor}
        projectCode={projectCode}
        scaleText={scaleText}
        modeLabel="ÖNERİ 04 // MODÜLER CEPHE AKS SİSTEMİ & KİNETİK DİZİLİM"
        showAxes={false}
      />

      {showLogo !== false && (
<svg width="1920" height="1080" viewBox="0 0 1920 1080">
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

            {/* Customizable Architectural Kinetic Caption */}
      <SceneCaption
        headline={headline}
        subtitle={subtitle}
        tagline={tagline}
        primaryColor={primaryColor}
        accentColor={accentColor}
        taglineColor={taglineColor}
        fontFamily={fontFamily}
        headlineSize={headlineSize}
        subtitleSize={subtitleSize}
        taglineSize={taglineSize}
        letterSpacing={letterSpacing}
        textOffsetX={textOffsetX}
        textOffsetY={textOffsetY}
        textAlign={textAlign}
        textAnimation={textAnimation}
        baseTop={678}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 32}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
