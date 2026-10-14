import { AnimatedTextLine } from '../components/SceneCaption';
import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { FULL_LOGO_PATH, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalGrid } from '../components/ArchitecturalGrid';
import { ArchitecturalSceneProps } from '../types/schema';

export const LaserSectionCut: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  projectCode,
  scaleText,
  accentColor,
  primaryColor,
  backgroundColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  letterSpacing = 0.38,
  textOffsetX = 0,
  textOffsetY = 0,
  textAnimation = 'char-wave',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = 2.85;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (1920 - renderedWidth) / 2;
  const offsetY = (1080 - renderedHeight) / 2 - 30;

  // Section line X in logo coordinate space (0 -> LOGO_VIEWBOX.width)
  const cutProgress = interpolate(frame, [10, 95], [0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // Secondary solid crystallization wave trailing the laser cut
  const solidProgress = interpolate(frame, [28, 112], [0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const cutX = cutProgress * LOGO_VIEWBOX.width;
  const solidX = solidProgress * LOGO_VIEWBOX.width;

  const badgeSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <ArchitecturalGrid
        accentColor={accentColor}
        projectCode={projectCode}
        scaleText={scaleText}
        modeLabel="ÖNERİ 03 // KESİT A—A LAZER TARAMA & KÜTLE ANALİZİ"
        showAxes={false}
      />

      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          {/* Architectural 45° Cross-Section Hatch Pattern */}
          <pattern
            id="section-hatch-pattern"
            width="5"
            height="5"
            patternTransform="rotate(-45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="5"
              stroke={accentColor}
              strokeWidth="1.1"
              strokeOpacity="0.7"
            />
          </pattern>

          {/* Clip for revealed section zone (between solidX and cutX) */}
          <clipPath id="clip-section-zone">
            <rect
              x={0}
              y={-20}
              width={Math.max(0, cutX)}
              height={LOGO_VIEWBOX.height + 40}
            />
          </clipPath>

          {/* Clip for solid finished zone (0 to solidX) */}
          <clipPath id="clip-solid-zone">
            <rect
              x={0}
              y={-20}
              width={Math.max(0, solidX)}
              height={LOGO_VIEWBOX.height + 40}
            />
          </clipPath>

          {/* Clip for active laser slice band */}
          <clipPath id="clip-laser-band">
            <rect
              x={cutX - 8}
              y={-20}
              width={16}
              height={LOGO_VIEWBOX.height + 40}
            />
          </clipPath>
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {/* 1. Ghost Wireframe Base (Unscanned Zone) */}
          <path
            d={FULL_LOGO_PATH}
            fill="none"
            stroke={primaryColor}
            strokeWidth={0.35}
            strokeOpacity={0.22}
            strokeDasharray="2 2"
            fillRule="evenodd"
          />

          {/* 2. Architectural Section Hatch Zone (Between Laser Cut and Solid Lock) */}
          <g clipPath="url(#clip-section-zone)">
            <path
              d={FULL_LOGO_PATH}
              fill="url(#section-hatch-pattern)"
              stroke={accentColor}
              strokeWidth={0.65}
              fillRule="evenodd"
            />
          </g>

          {/* 3. Solid Architectural Elevation Zone */}
          <g clipPath="url(#clip-solid-zone)">
            <path
              d={FULL_LOGO_PATH}
              fill={primaryColor}
              stroke={primaryColor}
              strokeWidth={0.3}
              fillRule="evenodd"
            />
          </g>

          {/* 4. Glowing Laser Intersection Slice Highlight */}
          {cutProgress > 0.01 && cutProgress < 1.02 && (
            <g clipPath="url(#clip-laser-band)">
              <path
                d={FULL_LOGO_PATH}
                fill={accentColor}
                stroke="#FFFFFF"
                strokeWidth={0.9}
                fillRule="evenodd"
              />
            </g>
          )}

          {/* 5. Active Vertical Section Plane A—A Line & Triangles */}
          {cutProgress > 0.01 && cutProgress < 1.02 && (
            <g transform={`translate(${cutX}, 0)`}>
              <line
                x1={0}
                y1={-32}
                x2={0}
                y2={LOGO_VIEWBOX.height + 32}
                stroke={accentColor}
                strokeWidth={0.75}
              />
              {/* Top Section Callout Flag (A) */}
              <polygon points="0,-32 10,-27 0,-22" fill={accentColor} />
              <text
                x={-4}
                y={-25}
                textAnchor="end"
                fill={accentColor}
                fontSize="5"
                fontFamily="'JetBrains Mono', 'Consolas', monospace"
                fontWeight="700"
              >
                KESİT A
              </text>
              {/* Bottom Section Callout Flag (A') */}
              <polygon
                points={`0,${LOGO_VIEWBOX.height + 32} 10,${LOGO_VIEWBOX.height + 27} 0,${LOGO_VIEWBOX.height + 22}`}
                fill={accentColor}
              />
              <text
                x={-4}
                y={LOGO_VIEWBOX.height + 29}
                textAnchor="end"
                fill={accentColor}
                fontSize="5"
                fontFamily="'JetBrains Mono', 'Consolas', monospace"
                fontWeight="700"
              >
                X={cutX.toFixed(1)}
              </text>
            </g>
          )}

          {/* Horizontal Elevation Datum Lines (±0.00 and +72.11) */}
          <g opacity={0.65}>
            <line
              x1={-25}
              y1={LOGO_VIEWBOX.height}
              x2={LOGO_VIEWBOX.width + 25}
              y2={LOGO_VIEWBOX.height}
              stroke={accentColor}
              strokeWidth={0.35}
              strokeDasharray="4 2"
            />
            <text
              x={LOGO_VIEWBOX.width + 28}
              y={LOGO_VIEWBOX.height + 1.5}
              fill={accentColor}
              fontSize="4"
              fontFamily="'JetBrains Mono', 'Consolas', monospace"
            >
              ±0.00 KOT
            </text>

            <line
              x1={-25}
              y1={0}
              x2={LOGO_VIEWBOX.width + 25}
              y2={0}
              stroke={accentColor}
              strokeWidth={0.35}
              strokeDasharray="4 2"
            />
            <text
              x={LOGO_VIEWBOX.width + 28}
              y={1.5}
              fill={accentColor}
              fontSize="4"
              fontFamily="'JetBrains Mono', 'Consolas', monospace"
            >
              +72.11 KOT
            </text>
          </g>
        </g>
      </svg>

      {/* Bottom Architectural Section Specification Box */}
      <div
        style={{
          position: 'absolute',
          bottom: 135,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: badgeSpring,
          transform: `translate(${textOffsetX}px, ${textOffsetY}px) translateY(${interpolate(badgeSpring, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 36,
            padding: '16px 36px',
            border: `1px solid ${accentColor}`,
            backgroundColor: 'rgba(11, 13, 16, 0.88)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', 'Consolas', monospace",
                fontSize: 11,
                color: accentColor,
                letterSpacing: '0.2em',
              }}
            >
              KESİT DÜZLEMİ // A—A
            </div>
            <div
              style={{
                fontFamily,
                fontSize: headlineSize,
                fontWeight: 600,
                color: primaryColor,
                letterSpacing: `${letterSpacing}em`,
                marginTop: 4,
              }}
            >
              <AnimatedTextLine
            text={headline}
            fontFamily={fontFamily}
            fontSize={headlineSize}
            letterSpacing={letterSpacing}
            color="inherit"
            accentColor={accentColor}
            animation={textAnimation}
            startFrame={34}
          />
            </div>
          </div>
          <div style={{ width: 1, height: 38, backgroundColor: 'rgba(200, 157, 102, 0.35)' }} />
          <div
            style={{
              fontFamily,
              fontSize: subtitleSize,
              color: primaryColor,
              letterSpacing: `${Math.max(0.04, letterSpacing * 0.7)}em`,
            }}
          >
            <AnimatedTextLine
            text={subtitle}
            fontFamily={fontFamily}
            fontSize={subtitleSize}
            letterSpacing={Math.max(0.04, letterSpacing * 0.7)}
            color="inherit"
            accentColor={accentColor}
            animation={textAnimation}
            startFrame={42}
            isSubtitle
          />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
