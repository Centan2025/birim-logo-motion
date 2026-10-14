import React from 'react';
import { AbsoluteFill } from 'remotion';
import { SceneCaption } from '../components/SceneCaption';
import { ArchitecturalGrid } from '../components/ArchitecturalGrid';
import { ArchitecturalSceneProps } from '../types/schema';

export const PureTypographyStudio: React.FC<ArchitecturalSceneProps> = ({
  headline,
  subtitle,
  tagline = '',
  accentColor,
  primaryColor = '#F4F1EA',
  taglineColor,
  backgroundColor = 'transparent',
  fontFamily = "'Inter', sans-serif",
  headlineSize = 64,
  subtitleSize = 40,
  taglineSize = 28,
  letterSpacing = 0.25,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'left',
  textAnimation = 'char-scramble-morph',
  textDelayFrames = 15,
  line1Delay,
  line2Delay,
  line3Delay,
}) => {
  const isTransparent = backgroundColor === 'transparent' || !backgroundColor;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: isTransparent ? 'transparent' : backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* İnce Mimari Izgara Rehberi (Yalnızca koyu arka planda belirir) */}
      {!isTransparent && (
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}>
          <ArchitecturalGrid
            lineColor="rgba(255, 255, 255, 0.07)"
            accentColor={accentColor}
            textColor="rgba(255, 255, 255, 0.35)"
            showAxes={false}
          />
        </div>
      )}

      {/* Ana Kinetik Tipografi & Metin Katmanı (3 Satır Destekli) */}
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
        delayFrames={textDelayFrames}
        line1Delay={line1Delay}
        line2Delay={line2Delay}
        line3Delay={line3Delay}
        showLogo={false}
      />
    </AbsoluteFill>
  );
};
