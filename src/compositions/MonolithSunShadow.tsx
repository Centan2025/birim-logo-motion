import { SceneCaption } from '../components/SceneCaption';
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BIRIM_LETTERS, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalGrid } from '../components/ArchitecturalGrid';
import { ArchitecturalSceneProps } from '../types/schema';

const SHADOW_STEPS = 28;
const EXTRUSION_STEPS = 12;

export const MonolithSunShadow: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  tagline,
  projectCode,
  scaleText,
  accentColor,
  primaryColor = '#181715',
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

  const scale = 2.8;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 40;

  // Simulated Sun Azimuth sweeping across the architectural monolith
  const sunAngleDeg = interpolate(frame, [0, 150], [122, 228], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.sin),
  });
  const sunRad = (sunAngleDeg * Math.PI) / 180;
  const shadowDirX = Math.cos(sunRad);
  const shadowDirY = Math.sin(sunRad);

  const solarHour = Math.floor(interpolate(frame, [0, 150], [9, 17]));
  const solarMin = Math.floor(interpolate(frame, [0, 150], [0, 480]) % 60);

  return (
    <AbsoluteFill style={{ backgroundColor: '#EAE4DC' }}>
      <ArchitecturalGrid
        lineColor="rgba(26, 25, 23, 0.08)"
        accentColor="#9E6B3B"
        textColor="rgba(26, 25, 23, 0.62)"
        projectCode={projectCode}
        scaleText={scaleText}
        modeLabel={`ÖNERİ 02 // MONOLİT & GÜNEŞ ETÜDÜ [AZM ${sunAngleDeg.toFixed(1)}°]`}
      />

      {/* Solar Path & Heliodon Indicator Top-Right */}
      <div
        style={{
          position: 'absolute',
          top: 128,
          right: 112,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '10px 18px',
          border: '1px solid rgba(26, 25, 23, 0.16)',
          backgroundColor: 'rgba(234, 228, 220, 0.85)',
          fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          fontSize: 12,
          color: '#1A1917',
          letterSpacing: '0.14em',
        }}
      >
        <svg width="36" height="36" viewBox="-18 -18 36 36">
          <circle
            cx="0"
            cy="0"
            r="14"
            fill="none"
            stroke="#1A1917"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <line
            x1="0"
            y1="0"
            x2={ -shadowDirX * 13 }
            y2={ -shadowDirY * 13 }
            stroke="#9E6B3B"
            strokeWidth="1.5"
          />
          <circle
            cx={ -shadowDirX * 13 }
            cy={ -shadowDirY * 13 }
            r="3"
            fill="#9E6B3B"
          />
        </svg>
        <div>
          <div style={{ fontWeight: 700 }}>SOLAR HELIODON // 41°00&apos;N</div>
          <div style={{ color: '#9E6B3B' }}>
            SAAT {String(solarHour).padStart(2, '0')}:{String(solarMin).padStart(2, '0')} // AZM {sunAngleDeg.toFixed(0)}°
          </div>
        </div>
      </div>

      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {/* Cast Ground Shadows */}
          {BIRIM_LETTERS.map((letter, idx) => {
            const lift = spring({
              frame: frame - idx * 6,
              fps,
              config: { damping: 18, stiffness: 80, mass: 1.1 },
            });

            return (
              <g key={`shadow-${letter.id}`}>
                {Array.from({ length: SHADOW_STEPS }).map((_, sIdx) => {
                  const dist = (sIdx + 1) * 1.15 * lift;
                  const sx = shadowDirX * dist;
                  const sy = Math.abs(shadowDirY) * dist + dist * 0.45;
                  return (
                    <path
                      key={sIdx}
                      d={letter.compoundPath}
                      fill="#1A1917"
                      fillRule="evenodd"
                      opacity={0.022 * lift}
                      transform={`translate(${sx}, ${sy})`}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* 3D Architectural Concrete Extrusion Layers & Top Cap */}
          {BIRIM_LETTERS.map((letter, idx) => {
            const lift = spring({
              frame: frame - idx * 6,
              fps,
              config: { damping: 18, stiffness: 80, mass: 1.1 },
            });

            const elevationX = -shadowDirX * 3.2 * lift;
            const elevationY = -4.5 * lift;

            return (
              <g key={`monolith-${letter.id}`}>
                {/* Extrusion side walls */}
                {Array.from({ length: EXTRUSION_STEPS }).map((_, eIdx) => {
                  const t = (eIdx + 1) / EXTRUSION_STEPS;
                  return (
                    <path
                      key={eIdx}
                      d={letter.compoundPath}
                      fill="#2B2926"
                      fillRule="evenodd"
                      transform={`translate(${elevationX * t}, ${elevationY * t})`}
                    />
                  );
                })}

                {/* Top Monolith Face */}
                <path
                  d={letter.compoundPath}
                  fill="#181715"
                  stroke={accentColor}
                  strokeWidth={0.35}
                  fillRule="evenodd"
                  transform={`translate(${elevationX}, ${elevationY})`}
                />

                {/* Architectural Elevation Kot Marker */}
                <g
                  opacity={lift}
                  transform={`translate(${letter.bounds.xMin + elevationX}, ${elevationY - 6})`}
                >
                  <text
                    x={0}
                    y={0}
                    fill="#9E6B3B"
                    fontSize="3.6"
                    fontFamily="'JetBrains Mono', 'Consolas', monospace"
                    fontWeight="600"
                  >
                    +{(lift * 12.5).toFixed(2)}m
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </svg>

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
        baseTop={1080 - 230}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 34}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={showLogo}
      />
    </AbsoluteFill>
  );
};
