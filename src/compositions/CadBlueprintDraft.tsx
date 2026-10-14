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
import { evolvePath } from '@remotion/paths';
import { BIRIM_LETTERS, LOGO_VIEWBOX } from '../data/birimLogoPaths';
import { ArchitecturalGrid } from '../components/ArchitecturalGrid';
import { ArchitecturalSceneProps } from '../types/schema';

export const CadBlueprintDraft: React.FC<ArchitecturalSceneProps> = (props) => {
  const {
    projectCode,
    scaleText,
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
  const scale = isVertical ? 1.8 : isSquare ? 2.0 : 2.75;
  const renderedWidth = LOGO_VIEWBOX.width * scale;
  const renderedHeight = LOGO_VIEWBOX.height * scale;
  const offsetX = (compWidth - renderedWidth) / 2;
  const offsetY = (compHeight - renderedHeight) / 2 - (isVertical ? 100 : 35);

  // Overall solid fill transition after CAD drafting completes
  const fillProgress = interpolate(frame, [78, 112], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // Control handles visibility (peaks during drafting, fades slightly when solid)
  const handlesOpacity = interpolate(frame, [10, 35, 85, 115], [0, 0.85, 0.85, 0.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dimension lines progress
  const dimProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  const textReveal = spring({
    frame: frame - 82,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <ArchitecturalGrid
        accentColor={accentColor}
        projectCode={projectCode}
        scaleText={scaleText}
        modeLabel="ÖNERİ 01 // MİMARİ CAD & SPLINE RÖLEVE"
      />

      {showLogo !== false && (
        <svg width={compWidth} height={compHeight} viewBox={`0 0 ${compWidth} ${compHeight}`}>
        <defs>
          <pattern
            id="cad-hatch"
            width="8"
            height="8"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke={accentColor}
              strokeWidth="0.8"
              strokeOpacity="0.35"
            />
          </pattern>
        </defs>

        <g transform={`translate(${offsetX}, ${offsetY}) scale(${scale})`}>
          {/* Architectural Bounding Box & Module Guides */}
          <rect
            x={0}
            y={0}
            width={LOGO_VIEWBOX.width}
            height={LOGO_VIEWBOX.height}
            fill="none"
            stroke={accentColor}
            strokeWidth={0.35}
            strokeDasharray="3 2"
            opacity={dimProgress * 0.5}
          />

          {/* Top Total Width Dimension Callout (469.53 MM) */}
          <g opacity={dimProgress}>
            <line
              x1={0}
              y1={-18}
              x2={LOGO_VIEWBOX.width * dimProgress}
              y2={-18}
              stroke={accentColor}
              strokeWidth={0.45}
            />
            <line x1={0} y1={-23} x2={0} y2={-4} stroke={accentColor} strokeWidth={0.45} />
            <line
              x1={LOGO_VIEWBOX.width}
              y1={-23}
              x2={LOGO_VIEWBOX.width}
              y2={-4}
              stroke={accentColor}
              strokeWidth={0.45}
            />
            {/* Architectural 45-degree tick marks */}
            <line x1={-3} y1={-15} x2={3} y2={-21} stroke={accentColor} strokeWidth={0.7} />
            <line
              x1={LOGO_VIEWBOX.width - 3}
              y1={-15}
              x2={LOGO_VIEWBOX.width + 3}
              y2={-21}
              stroke={accentColor}
              strokeWidth={0.7}
            />
            <text
              x={LOGO_VIEWBOX.width / 2}
              y={-24}
              textAnchor="middle"
              fill={accentColor}
              fontSize="4.5"
              fontFamily="'JetBrains Mono', 'Consolas', monospace"
              letterSpacing="0.15em"
            >
              469.53 MM // TOPLAM CEPHE GENİŞLİĞİ
            </text>
          </g>

          {/* Left Height Dimension Callout (72.11 MM) */}
          <g opacity={dimProgress}>
            <line
              x1={-16}
              y1={0}
              x2={-16}
              y2={LOGO_VIEWBOX.height * dimProgress}
              stroke={accentColor}
              strokeWidth={0.45}
            />
            <line x1={-21} y1={0} x2={-4} y2={0} stroke={accentColor} strokeWidth={0.45} />
            <line
              x1={-21}
              y1={LOGO_VIEWBOX.height}
              x2={-4}
              y2={LOGO_VIEWBOX.height}
              stroke={accentColor}
              strokeWidth={0.45}
            />
            <text
              x={-24}
              y={LOGO_VIEWBOX.height / 2}
              textAnchor="middle"
              fill={accentColor}
              fontSize="4.2"
              fontFamily="'JetBrains Mono', 'Consolas', monospace"
              transform={`rotate(-90, -24, ${LOGO_VIEWBOX.height / 2})`}
              letterSpacing="0.12em"
            >
              72.11 MM
            </text>
          </g>

          {/* Letters: CAD Drafting + Bezier Control Handles + Hatch + Solid Fill */}
          {BIRIM_LETTERS.map((letter, idx) => {
            const letterStart = 8 + idx * 11;
            const drawProgress = interpolate(
              frame,
              [letterStart, letterStart + 42],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              }
            );

            const outerEvolved = evolvePath(drawProgress, letter.outerPath);

            return (
              <g key={letter.id}>
                {/* Individual Module Dimension at Bottom */}
                <g opacity={dimProgress * 0.85}>
                  <line
                    x1={letter.bounds.xMin}
                    y1={LOGO_VIEWBOX.height + 12}
                    x2={letter.bounds.xMax}
                    y2={LOGO_VIEWBOX.height + 12}
                    stroke={primaryColor}
                    strokeWidth={0.35}
                    strokeOpacity={0.5}
                  />
                  <line
                    x1={letter.bounds.xMin}
                    y1={LOGO_VIEWBOX.height + 4}
                    x2={letter.bounds.xMin}
                    y2={LOGO_VIEWBOX.height + 16}
                    stroke={primaryColor}
                    strokeWidth={0.35}
                    strokeOpacity={0.4}
                  />
                  <line
                    x1={letter.bounds.xMax}
                    y1={LOGO_VIEWBOX.height + 4}
                    x2={letter.bounds.xMax}
                    y2={LOGO_VIEWBOX.height + 16}
                    stroke={primaryColor}
                    strokeWidth={0.35}
                    strokeOpacity={0.4}
                  />
                  <text
                    x={letter.centerX}
                    y={LOGO_VIEWBOX.height + 21}
                    textAnchor="middle"
                    fill={primaryColor}
                    fillOpacity={0.65}
                    fontSize="3.8"
                    fontFamily="'JetBrains Mono', 'Consolas', monospace"
                  >
                    {letter.bounds.width.toFixed(1)}
                  </text>
                </g>

                {/* Cross-hatch architectural fill during drafting */}
                <path
                  d={letter.compoundPath}
                  fill="url(#cad-hatch)"
                  fillRule="evenodd"
                  opacity={interpolate(drawProgress, [0.5, 1], [0, 0.9], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  })}
                />

                {/* Solid Architectural Monolith Fill */}
                <path
                  d={letter.compoundPath}
                  fill={primaryColor}
                  fillRule="evenodd"
                  opacity={fillProgress}
                />

                {/* Evolved Outer CAD Stroke */}
                <path
                  d={letter.outerPath}
                  fill="none"
                  stroke={primaryColor}
                  strokeWidth={0.85}
                  strokeDasharray={outerEvolved.strokeDasharray}
                  strokeDashoffset={outerEvolved.strokeDashoffset}
                />

                {/* Evolved Inner Hole CAD Strokes (for B and R) */}
                {letter.holePaths.map((hp, hIdx) => {
                  const holeEvolved = evolvePath(drawProgress, hp);
                  return (
                    <path
                      key={hIdx}
                      d={hp}
                      fill="none"
                      stroke={accentColor}
                      strokeWidth={0.75}
                      strokeDasharray={holeEvolved.strokeDasharray}
                      strokeDashoffset={holeEvolved.strokeDashoffset}
                    />
                  );
                })}

                {/* Authentic DXF Cubic Bezier Control Polygon & Vertex Nodes */}
                <g opacity={handlesOpacity * drawProgress}>
                  {letter.segments.map((seg, sIdx) => {
                    if (seg.type === 'C' && seg.points.length === 4) {
                      const [p0, p1, p2, p3] = seg.points;
                      return (
                        <g key={sIdx}>
                          <line
                            x1={p0[0]}
                            y1={p0[1]}
                            x2={p1[0]}
                            y2={p1[1]}
                            stroke={accentColor}
                            strokeWidth={0.28}
                            strokeDasharray="1 1"
                          />
                          <line
                            x1={p2[0]}
                            y1={p2[1]}
                            x2={p3[0]}
                            y2={p3[1]}
                            stroke={accentColor}
                            strokeWidth={0.28}
                            strokeDasharray="1 1"
                          />
                          <circle cx={p1[0]} cy={p1[1]} r={0.9} fill={accentColor} />
                          <circle cx={p2[0]} cy={p2[1]} r={0.9} fill={accentColor} />
                          <rect
                            x={p0[0] - 0.85}
                            y={p0[1] - 0.85}
                            width={1.7}
                            height={1.7}
                            fill={backgroundColor}
                            stroke={primaryColor}
                            strokeWidth={0.35}
                          />
                        </g>
                      );
                    }
                    const [p0] = seg.points;
                    return (
                      <rect
                        key={sIdx}
                        x={p0[0] - 0.85}
                        y={p0[1] - 0.85}
                        width={1.7}
                        height={1.7}
                        fill={backgroundColor}
                        stroke={primaryColor}
                        strokeWidth={0.35}
                      />
                    );
                  })}
                </g>
              </g>
            );
          })}
        </g>
      </svg>
      )}

      {/* Architectural Typography Lockup Below Logo */}
      <SceneCaption
        {...props}
        delayFrames={textDelayFrames !== undefined ? textDelayFrames : 82}
        showLogo={showLogo}
        baseTop={offsetY + renderedHeight + 58}
      />
    </AbsoluteFill>
  );
};
