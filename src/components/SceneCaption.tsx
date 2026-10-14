import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface SceneCaptionProps {
  headline: string;
  subtitle: string;
  primaryColor?: string;
  accentColor: string;
  fontFamily?: string;
  headlineSize?: number;
  subtitleSize?: number;
  letterSpacing?: number;
  textOffsetX?: number;
  textOffsetY?: number;
  textAlign?: 'left' | 'center' | 'right';
  baseTop?: number;
  delayFrames?: number;
}

export const SceneCaption: React.FC<SceneCaptionProps> = ({
  headline,
  subtitle,
  primaryColor = '#F4F1EA',
  accentColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 19,
  subtitleSize = 12,
  letterSpacing = 0.4,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'center',
  baseTop = 678,
  delayFrames = 48,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 20, stiffness: 95 },
  });

  const alignItems =
    textAlign === 'left'
      ? 'flex-start'
      : textAlign === 'right'
        ? 'flex-end'
        : 'center';

  return (
    <div
      style={{
        position: 'absolute',
        top: baseTop + textOffsetY,
        left: 268 + textOffsetX,
        width: 1384,
        display: 'flex',
        flexDirection: 'column',
        alignItems,
        textAlign,
        gap: 10,
        opacity: textSpring,
        transform: `translateY(${interpolate(textSpring, [0, 1], [16, 0])}px)`,
        pointerEvents: 'none',
      }}
    >
      {headline && (
        <div
          style={{
            fontFamily,
            fontSize: headlineSize,
            fontWeight: 500,
            letterSpacing: `${letterSpacing}em`,
            color: primaryColor,
            textTransform: 'uppercase',
          }}
        >
          {headline}
        </div>
      )}
      {subtitle && (
        <div
          style={{
            fontFamily,
            fontSize: subtitleSize,
            fontWeight: 400,
            letterSpacing: `${Math.max(0.05, letterSpacing * 0.7)}em`,
            color: accentColor,
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
