import React from 'react';
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TextAnimationType } from '../types/schema';

const DECODE_GLYPHS = '▓▒░#/_01X+<>[]=';

export interface AnimatedTextLineProps {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: number;
  letterSpacing: number;
  color: string;
  accentColor: string;
  animation: TextAnimationType;
  startFrame: number;
  isSubtitle?: boolean;
}

export const AnimatedTextLine: React.FC<AnimatedTextLineProps> = ({
  text,
  fontFamily,
  fontSize,
  fontWeight = 500,
  letterSpacing,
  color,
  accentColor,
  animation,
  startFrame,
  isSubtitle = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!text) return null;

  const baseStyle: React.CSSProperties = {
    fontFamily,
    fontSize,
    fontWeight,
    color,
    textTransform: 'uppercase',
    lineHeight: 1.3,
  };

  // 1. char-wave: Harf Harf Elastik Dalga
  if (animation === 'char-wave') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.1,
            fps,
            config: { damping: 13, stiffness: 150, mass: 0.8 },
          });
          const y = interpolate(s, [0, 1], [22, 0]);
          const sc = interpolate(s, [0, 1], [0.4, 1]);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(s, [0, 0.3, 1], [0, 1, 1]),
                transform: `translateY(${y}px) scale(${sc})`,
                marginRight: ch === ' ' ? `${letterSpacing + 0.35}em` : `${letterSpacing}em`,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          );
        })}
      </div>
    );
  }

  // 2. char-directional: Harf Harf Yönlü Genişleme (Sol-Alt-Sağ-Üst)
  if (animation === 'char-directional') {
    const chars = Array.from(text);
    const dirs = ['left', 'bottom', 'right', 'top'] as const;
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.2,
            fps,
            config: { damping: 17, stiffness: 110 },
          });
          const dir = dirs[i % 4];
          let origin = 'left center';
          let transform = `scaleX(${s})`;
          if (dir === 'right') {
            origin = 'right center';
            transform = `scaleX(${s})`;
          } else if (dir === 'bottom') {
            origin = 'center bottom';
            transform = `scaleY(${s})`;
          } else if (dir === 'top') {
            origin = 'center top';
            transform = `scaleY(${s})`;
          }
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                transformOrigin: origin,
                transform,
                marginRight: ch === ' ' ? `${letterSpacing + 0.35}em` : `${letterSpacing}em`,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          );
        })}
      </div>
    );
  }

  // 3. word-slide: Kelime Kelime Maskeli Çıkış
  if (animation === 'word-slide') {
    const words = text.split(' ');
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: `${letterSpacing + 0.38}em`,
        }}
      >
        {words.map((word, wIdx) => {
          const s = spring({
            frame: frame - startFrame - wIdx * 4,
            fps,
            config: { damping: 18, stiffness: 110 },
          });
          return (
            <span
              key={wIdx}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                paddingBottom: 3,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  letterSpacing: `${letterSpacing}em`,
                  transform: `translateY(${interpolate(s, [0, 1], [115, 0])}%)`,
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </div>
    );
  }

  // 4. tracking-in: Sinematik Harf Aralığı Kapanarak Odaklanma
  if (animation === 'tracking-in') {
    const s = spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 22, stiffness: 75 },
    });
    const curSpacing = interpolate(s, [0, 1], [letterSpacing + 0.9, letterSpacing]);
    const blurPx = interpolate(s, [0, 1], [10, 0]);
    return (
      <div
        style={{
          ...baseStyle,
          letterSpacing: `${curSpacing}em`,
          opacity: s,
          filter: `blur(${blurPx}px)`,
        }}
      >
        {text}
      </div>
    );
  }

  // 5. tracking-out: Merkezden Harf Aralığı Açılarak Yayılma
  if (animation === 'tracking-out') {
    const s = spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 20, stiffness: 85 },
    });
    const curSpacing = interpolate(s, [0, 1], [-0.04, letterSpacing]);
    return (
      <div
        style={{
          ...baseStyle,
          letterSpacing: `${curSpacing}em`,
          opacity: interpolate(s, [0, 0.35, 1], [0, 1, 1]),
          transform: `scale(${interpolate(s, [0, 1], [0.88, 1])})`,
        }}
      >
        {text}
      </div>
    );
  }

  // 6. split-curtain: Ufuk Çizgisinden Zıt Yönlü Açılış
  if (animation === 'split-curtain') {
    const s = spring({
      frame: frame - startFrame,
      fps,
      config: { damping: 20, stiffness: 95 },
    });
    const dir = isSubtitle ? -1 : 1;
    return (
      <div style={{ overflow: 'hidden', padding: '2px 0' }}>
        <div
          style={{
            ...baseStyle,
            letterSpacing: `${letterSpacing}em`,
            transform: `translateY(${interpolate(s, [0, 1], [dir * 110, 0])}%)`,
            opacity: s,
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  // 7. flip-3d: 3B Harf Devrilme (Split-Flap)
  if (animation === 'flip-3d') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          perspective: 600,
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.2,
            fps,
            config: { damping: 14, stiffness: 120 },
          });
          const rotX = interpolate(s, [0, 1], [-92, 0]);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                transformOrigin: 'center top',
                transform: `rotateX(${rotX}deg)`,
                opacity: interpolate(s, [0, 0.2, 1], [0, 1, 1]),
                marginRight: ch === ' ' ? `${letterSpacing + 0.35}em` : `${letterSpacing}em`,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          );
        })}
      </div>
    );
  }

  // 8. typewriter: Modern Daktilo & İmleç
  if (animation === 'typewriter') {
    const chars = Array.from(text);
    const visibleCount = Math.floor(
      interpolate(frame, [startFrame, startFrame + Math.max(18, chars.length * 1.35)], [0, chars.length], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    );
    const showCursor =
      frame >= startFrame &&
      (visibleCount < chars.length || Math.floor(frame / 8) % 2 === 0);

    return (
      <div
        style={{
          ...baseStyle,
          letterSpacing: `${letterSpacing}em`,
        }}
      >
        {chars.slice(0, visibleCount).join('')}
        {showCursor && (
          <span style={{ color: accentColor, marginLeft: 4 }}>▋</span>
        )}
      </div>
    );
  }

  // 9. glitch-decode: Dijital Şifre Çözücü (Matrix / CAD Decode)
  if (animation === 'glitch-decode') {
    const chars = Array.from(text);
    const totalDuration = Math.max(24, chars.length * 1.4);
    const progress = interpolate(
      frame,
      [startFrame, startFrame + totalDuration],
      [0, chars.length],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );

    if (frame < startFrame) return null;

    return (
      <div
        style={{
          ...baseStyle,
          letterSpacing: `${letterSpacing}em`,
        }}
      >
        {chars.map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < Math.floor(progress)) return ch;
          if (i < progress + 4) {
            const glyphIdx = (frame * 3 + i * 7) % DECODE_GLYPHS.length;
            return (
              <span key={i} style={{ color: accentColor }}>
                {DECODE_GLYPHS[glyphIdx]}
              </span>
            );
          }
          return '';
        })}
      </div>
    );
  }

  // 10. wipe-bar: Lazer Blok Tarama (Shutter Wipe)
  if (animation === 'wipe-bar') {
    const p = interpolate(frame, [startFrame, startFrame + 32], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
    const barLeft = interpolate(p, [0, 0.5, 1], [0, 0, 100]);
    const barRight = interpolate(p, [0, 0.5, 1], [100, 0, 0]);

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            ...baseStyle,
            letterSpacing: `${letterSpacing}em`,
            clipPath: `inset(0 ${100 - p * 100}% 0 0)`,
          }}
        >
          {text}
        </div>
        {p > 0.01 && p < 0.99 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${barLeft}%`,
              right: `${barRight}%`,
              backgroundColor: accentColor,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    );
  }

  // 11. blur-scale: Optik Odak & Büyüme
  if (animation === 'blur-scale') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.1,
            fps,
            config: { damping: 18, stiffness: 110 },
          });
          const sc = interpolate(s, [0, 1], [2.1, 1]);
          const bl = interpolate(s, [0, 1], [8, 0]);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: s,
                filter: `blur(${bl}px)`,
                transform: `scale(${sc})`,
                marginRight: ch === ' ' ? `${letterSpacing + 0.35}em` : `${letterSpacing}em`,
              }}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          );
        })}
      </div>
    );
  }

  // 12. fade-up (Default): Yumuşak Yükseliş
  const s = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20, stiffness: 95 },
  });
  return (
    <div
      style={{
        ...baseStyle,
        letterSpacing: `${letterSpacing}em`,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
      }}
    >
      {text}
    </div>
  );
};

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
  textAnimation?: TextAnimationType;
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
  textAnimation = 'char-wave',
  baseTop = 678,
  delayFrames = 32,
}) => {
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
        pointerEvents: 'none',
      }}
    >
      <AnimatedTextLine
        text={headline}
        fontFamily={fontFamily}
        fontSize={headlineSize}
        fontWeight={500}
        letterSpacing={letterSpacing}
        color={primaryColor}
        accentColor={accentColor}
        animation={textAnimation}
        startFrame={delayFrames}
      />
      <AnimatedTextLine
        text={subtitle}
        fontFamily={fontFamily}
        fontSize={subtitleSize}
        fontWeight={400}
        letterSpacing={Math.max(0.05, letterSpacing * 0.7)}
        color={accentColor}
        accentColor={primaryColor}
        animation={textAnimation}
        startFrame={delayFrames + 8}
        isSubtitle
      />
    </div>
  );
};
