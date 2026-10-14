import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface ArchitecturalGridProps {
  lineColor?: string;
  accentColor?: string;
  textColor?: string;
  projectCode?: string;
  scaleText?: string;
  modeLabel?: string;
  showAxes?: boolean;
}

const AXIS_LABELS = ['A', 'B', 'C', 'D', 'E'] as const;

export const ArchitecturalGrid: React.FC<ArchitecturalGridProps> = ({
  lineColor = 'rgba(244, 241, 234, 0.08)',
  accentColor = '#C89D66',
  textColor = 'rgba(244, 241, 234, 0.55)',
  projectCode = 'PRJ-2026 // PAFTA 01',
  scaleText = 'ÖLÇEK 1:50 // BİRİM: MM',
  modeLabel = 'CAD // VECTORS',
  showAxes = true,
}) => {
  const frame = useCurrentFrame();
  const gridOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const liveCoordX = (69.466 + frame * 3.127).toFixed(2);
  const liveCoordY = (738.08 - frame * 0.481).toFixed(2);

  return (
    <AbsoluteFill style={{ opacity: gridOpacity, pointerEvents: 'none' }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <pattern id="arch-subgrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path
              d="M 30 0 L 0 0 0 30"
              fill="none"
              stroke={lineColor}
              strokeWidth="0.5"
              strokeOpacity="0.45"
            />
          </pattern>
          <pattern id="arch-grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill="url(#arch-subgrid)" />
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke={lineColor} strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="1920" height="1080" fill="url(#arch-grid)" />

        {/* Outer Architectural Sheet Border (Pafta Çerçevesi) */}
        <rect
          x="64"
          y="54"
          width="1792"
          height="972"
          fill="none"
          stroke={lineColor}
          strokeWidth="1.25"
        />
        <rect
          x="72"
          y="62"
          width="1776"
          height="956"
          fill="none"
          stroke={lineColor}
          strokeWidth="0.6"
        />

        {/* Structural Axis Bubbles (AKS A - E) */}
        {showAxes &&
          AXIS_LABELS.map((label, idx) => {
            const xPos = 360 + idx * 300;
            return (
              <g key={label}>
                <line
                  x1={xPos}
                  y1={62}
                  x2={xPos}
                  y2={1018}
                  stroke={lineColor}
                  strokeWidth="0.75"
                  strokeDasharray="8 6 2 6"
                />
                <circle
                  cx={xPos}
                  cy={92}
                  r={13}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                />
                <text
                  x={xPos}
                  y={96}
                  textAnchor="middle"
                  fill={accentColor}
                  fontSize="11"
                  fontFamily="'JetBrains Mono', 'Consolas', monospace"
                  fontWeight="600"
                >
                  {label}
                </text>
              </g>
            );
          })}

        {/* Corner Registration Crosshairs */}
        {[
          [110, 110],
          [1810, 110],
          [110, 970],
          [1810, 970],
        ].map(([cx, cy], i) => (
          <g key={i} stroke={accentColor} strokeWidth="1" opacity="0.65">
            <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} />
            <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} />
            <circle cx={cx} cy={cy} r="4" fill="none" />
          </g>
        ))}
      </svg>

      {/* Top Metadata Bar */}
      <div
        style={{
          position: 'absolute',
          top: 74,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          fontSize: 12,
          letterSpacing: '0.18em',
          color: textColor,
          textTransform: 'uppercase',
        }}
      >
        <div>
          <span style={{ color: accentColor, fontWeight: 700 }}>■</span> {modeLabel}
        </div>
        <div>
          DXF EXTENTS: X[{liveCoordX}] Y[{liveCoordY}] // AC1021
        </div>
        <div>{projectCode}</div>
      </div>

      {/* Bottom Metadata Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 74,
          left: 100,
          right: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'JetBrains Mono', 'Consolas', monospace",
          fontSize: 12,
          letterSpacing: '0.18em',
          color: textColor,
          textTransform: 'uppercase',
        }}
      >
        <div>{scaleText}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>0</span>
          <div
            style={{
              width: 120,
              height: 4,
              border: `1px solid ${accentColor}`,
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '50%',
                height: '100%',
                backgroundColor: accentColor,
              }}
            />
          </div>
          <span>469.53 MM</span>
        </div>
        <div>FRAME // {String(frame).padStart(3, '0')}</div>
      </div>
    </AbsoluteFill>
  );
};
