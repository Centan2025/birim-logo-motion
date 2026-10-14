import React from 'react';
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ExitAnimationType, ExitTargetType, TextAnimationType } from '../types/schema';
import { SceneExitWrapper } from './SceneExitWrapper';

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
  textAlign?: 'left' | 'center' | 'right';
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
  textAlign = 'center',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (!text) return null;

  const justifyContent =
    textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center';

  const baseStyle: React.CSSProperties = {
    fontFamily,
    fontSize,
    fontWeight,
    color,
    textTransform: 'uppercase',
    lineHeight: 1.3,
    textAlign,
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
          justifyContent,
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
          justifyContent,
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
          justifyContent,
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
          justifyContent,
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
          justifyContent,
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

  // 13. bounce-drop: Harf Harf Esnek Düşüş & Yaylanma
  if (animation === 'bounce-drop') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.15,
            fps,
            config: { damping: 9, stiffness: 180, mass: 0.7 },
          });
          const y = interpolate(s, [0, 1], [-48, 0]);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(s, [0, 0.25, 1], [0, 1, 1]),
                transform: `translateY(${y}px)`,
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

  // 14. skew-slide: 20° Açılı İtalik Dinamik Kayma
  if (animation === 'skew-slide') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.0,
            fps,
            config: { damping: 14, stiffness: 130 },
          });
          const x = interpolate(s, [0, 1], [-35, 0]);
          const skew = interpolate(s, [0, 1], [-22, 0]);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: s,
                transform: `translateX(${x}px) skewX(${skew}deg)`,
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

  // 15. pop-scale: Elastik Patlama & Büyüme (Punchy Pop)
  if (animation === 'pop-scale') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.25,
            fps,
            config: { damping: 10, stiffness: 200, mass: 0.6 },
          });
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(s, [0, 0.15, 1], [0, 1, 1]),
                transform: `scale(${s})`,
                transformOrigin: 'center center',
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

  // 16. smoke-dissolve: Puslu Genişleme & Kristalize Olma
  if (animation === 'smoke-dissolve') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.0,
            fps,
            config: { damping: 20, stiffness: 95 },
          });
          const bl = interpolate(s, [0, 1], [14, 0]);
          const sc = interpolate(s, [0, 1], [1.6, 1]);
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

  // 17. shutter-reveal: Dikey Deklanşör / Maskeli Yükseliş
  if (animation === 'shutter-reveal') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - startFrame - i * 1.1,
            fps,
            config: { damping: 15, stiffness: 125 },
          });
          const y = interpolate(s, [0, 1], [105, 0]);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'top',
                paddingBottom: 2,
                marginRight: ch === ' ' ? `${letterSpacing + 0.35}em` : `${letterSpacing}em`,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: `translateY(${y}%)`,
                  opacity: interpolate(s, [0, 0.2, 1], [0, 1, 1]),
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            </span>
          );
        })}
      </div>
    );
  }

  // 18. matrix-stream: Siber Akış & Şelale İnişi
  if (animation === 'matrix-stream') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          const localF = frame - startFrame - i * 1.05;
          const s = spring({
            frame: localF,
            fps,
            config: { damping: 15, stiffness: 140 },
          });
          const y = interpolate(s, [0, 1], [-26, 0]);
          const isGlancing = localF >= 0 && localF < 7;
          const charColor = isGlancing ? accentColor : color;
          const textShadow = isGlancing ? `0 0 14px ${accentColor}` : 'none';
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: s,
                color: charColor,
                textShadow,
                transform: `translateY(${y}px)`,
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

  // 19. char-scramble-morph: Her Harf Belirirken Parçalar & Karakterler Hızla Değişip Asıl Harfe Kilitlenir
  if (animation === 'char-scramble-morph') {
    const chars = Array.from(text);
    const MORPH_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789§$%&#?@!/\\+=*░▒▓╱╲┼';
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((targetChar, i) => {
          if (targetChar === ' ') {
            return (
              <span key={i} style={{ marginRight: `${letterSpacing + 0.35}em` }}>
                {'\u00A0'}
              </span>
            );
          }

          const charStart = startFrame + i * 2.2;
          const morphDuration = 14;
          const lockFrame = charStart + morphDuration;

          if (frame < charStart) {
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  marginRight: `${letterSpacing}em`,
                }}
              >
                {targetChar}
              </span>
            );
          }

          const isLocked = frame >= lockFrame;
          let displayGlyph = targetChar;
          let glyphColor = color;
          let glyphScale = 1;
          let glyphShadow = 'none';

          if (!isLocked) {
            const pseudoRandomSeed = Math.floor(frame * 7 + i * 13);
            displayGlyph = MORPH_CHARS[pseudoRandomSeed % MORPH_CHARS.length];
            glyphColor = accentColor;
            glyphScale = 1.15;
            glyphShadow = `0 0 12px ${accentColor}80`;
          } else {
            const lockSpring = spring({
              frame: frame - lockFrame,
              fps,
              config: { damping: 11, stiffness: 190 },
            });
            glyphScale = interpolate(lockSpring, [0, 1], [1.35, 1]);
            const flashColorT = interpolate(frame - lockFrame, [0, 7], [1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            glyphColor = flashColorT > 0 ? accentColor : color;
          }

          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                color: glyphColor,
                transform: `scale(${glyphScale})`,
                textShadow: glyphShadow,
                marginRight: `${letterSpacing}em`,
              }}
            >
              {displayGlyph}
            </span>
          );
        })}
      </div>
    );
  }

  // 20. slot-machine-reel: Dikey Çark/Tambur Hareketi ile Harfe Oturma
  if (animation === 'slot-machine-reel') {
    const chars = Array.from(text);
    const DUMMY_POOL = ['X', '0', '7', 'A', '8', 'Z', '9', 'K', '#', '%', 'B', '4', 'M', '2'];
    const lineHeightPx = fontSize * 1.35;
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((targetChar, i) => {
          if (targetChar === ' ') {
            return (
              <span key={i} style={{ marginRight: `${letterSpacing + 0.35}em` }}>
                {'\u00A0'}
              </span>
            );
          }

          const charStart = startFrame + i * 1.5;
          if (frame < charStart) {
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  height: lineHeightPx,
                  overflow: 'hidden',
                  verticalAlign: 'top',
                  marginRight: `${letterSpacing}em`,
                  opacity: 0,
                }}
              >
                <span style={{ height: lineHeightPx, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {targetChar}
                </span>
              </span>
            );
          }

          const s = spring({
            frame: frame - charStart,
            fps,
            config: { damping: 14, stiffness: 140, mass: 0.8 },
          });

          const d1 = DUMMY_POOL[(i * 3 + 1) % DUMMY_POOL.length];
          const d2 = DUMMY_POOL[(i * 5 + 4) % DUMMY_POOL.length];
          const d3 = DUMMY_POOL[(i * 7 + 2) % DUMMY_POOL.length];
          const d4 = DUMMY_POOL[(i * 11 + 5) % DUMMY_POOL.length];
          const dBounce = DUMMY_POOL[(i * 13 + 3) % DUMMY_POOL.length];

          // Downward roll reel items:
          // Index 0: dBounce (overshoot buffer for spring bounce)
          // Index 1: targetChar (landing position)
          // Index 2..5: dummy characters rolling down
          const reelItems = [
            { char: dBounce, color: accentColor },
            { char: targetChar, color },
            { char: d4, color: accentColor },
            { char: d3, color: accentColor },
            { char: d2, color: accentColor },
            { char: d1, color: accentColor },
          ];

          const targetIndex = 1;
          const startIndex = reelItems.length - 1;
          const reelY = interpolate(s, [0, 1], [-startIndex * lineHeightPx, -targetIndex * lineHeightPx]);

          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                height: lineHeightPx,
                overflow: 'hidden',
                verticalAlign: 'top',
                marginRight: `${letterSpacing}em`,
              }}
            >
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  transform: `translateY(${reelY}px)`,
                  opacity: interpolate(s, [0, 0.15, 1], [0.2, 1, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              >
                {reelItems.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      height: lineHeightPx,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                    }}
                  >
                    {item.char}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </div>
    );
  }

  // 21. char-fragment-assemble: Harf 4 Parçadan Birleşerek Oluşur
  if (animation === 'char-fragment-assemble') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          if (ch === ' ') {
            return (
              <span key={i} style={{ marginRight: `${letterSpacing + 0.35}em` }}>
                {'\u00A0'}
              </span>
            );
          }
          const s = spring({
            frame: frame - startFrame - i * 1.3,
            fps,
            config: { damping: 13, stiffness: 160 },
          });

          const offset = interpolate(s, [0, 1], [22, 0]);
          const rot = interpolate(s, [0, 1], [25, 0]);
          const op = interpolate(s, [0, 0.25, 1], [0, 1, 1]);

          return (
            <span
              key={i}
              style={{
                position: 'relative',
                display: 'inline-block',
                marginRight: `${letterSpacing}em`,
              }}
            >
              {/* Top-Left Piece */}
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
                  transform: `translate(${-offset}px, ${-offset}px) rotate(${-rot}deg)`,
                  opacity: op,
                  color: s < 0.95 ? accentColor : color,
                }}
              >
                {ch}
              </span>
              {/* Top-Right Piece */}
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
                  transform: `translate(${offset}px, ${-offset}px) rotate(${rot}deg)`,
                  opacity: op,
                  color: s < 0.95 ? accentColor : color,
                }}
              >
                {ch}
              </span>
              {/* Bottom-Left Piece */}
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
                  transform: `translate(${-offset}px, ${offset}px) rotate(${rot}deg)`,
                  opacity: op,
                  color: s < 0.95 ? accentColor : color,
                }}
              >
                {ch}
              </span>
              {/* Bottom-Right Piece & Base Anchor */}
              <span
                style={{
                  display: 'inline-block',
                  clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
                  transform: `translate(${offset}px, ${offset}px) rotate(${-rot}deg)`,
                  opacity: op,
                  color: s < 0.95 ? accentColor : color,
                }}
              >
                {ch}
              </span>
            </span>
          );
        })}
      </div>
    );
  }

  // 22. neon-flicker: Neon Lamba Titremesi & Işık Patlaması
  if (animation === 'neon-flicker') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          if (ch === ' ') {
            return (
              <span key={i} style={{ marginRight: `${letterSpacing + 0.35}em` }}>
                {'\u00A0'}
              </span>
            );
          }
          const charFrame = frame - startFrame - i * 0.9;
          if (charFrame < 0) {
            return (
              <span key={i} style={{ opacity: 0, marginRight: `${letterSpacing}em` }}>
                {ch}
              </span>
            );
          }

          let op = 1;
          let glow = `0 0 10px ${accentColor}, 0 0 22px ${accentColor}, 0 0 45px ${accentColor}80`;
          let charColor = color;

          if (charFrame < 14) {
            const flickerPattern = [0.1, 0.9, 0.15, 0.95, 0.2, 0.4, 1.0, 0.3, 0.95, 0.6, 1.0, 0.85, 1.0, 1.0];
            op = flickerPattern[Math.min(charFrame, flickerPattern.length - 1)];
            glow = op > 0.5 ? `0 0 14px ${accentColor}, 0 0 30px ${accentColor}` : 'none';
            charColor = op > 0.5 ? accentColor : 'rgba(255,255,255,0.2)';
          }

          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: op,
                color: charColor,
                textShadow: glow,
                marginRight: `${letterSpacing}em`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>
    );
  }

  // 23. wave-cascade-y: Sinüs Dalgasal Kaskat
  if (animation === 'wave-cascade-y') {
    const chars = Array.from(text);
    return (
      <div
        style={{
          ...baseStyle,
          display: 'inline-flex',
          flexWrap: 'wrap',
          justifyContent,
        }}
      >
        {chars.map((ch, i) => {
          const charFrame = frame - startFrame - i * 1.35;
          const s = spring({
            frame: charFrame,
            fps,
            config: { damping: 15, stiffness: 120 },
          });

          const waveSine = Math.sin((frame * 0.12) + i * 0.4) * (1 - s) * 20;
          const y = interpolate(s, [0, 1], [-45, 0]) + waveSine;

          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(s, [0, 0.2, 1], [0, 1, 1]),
                transform: `translateY(${y}px)`,
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
  tagline?: string;
  primaryColor?: string;
  accentColor: string;
  taglineColor?: string;
  fontFamily?: string;
  headlineSize?: number;
  subtitleSize?: number;
  taglineSize?: number;
  letterSpacing?: number;
  textOffsetX?: number;
  textOffsetY?: number;
  textAlign?: 'left' | 'center' | 'right';
  textAnimation?: TextAnimationType;
  baseTop?: number;
  delayFrames?: number;
  line1Delay?: number;
  line2Delay?: number;
  line3Delay?: number;
  showLogo?: boolean;
  exitAnimation?: ExitAnimationType;
  exitTarget?: ExitTargetType;
  exitDurationFrames?: number;
  exitStartFrame?: number;
  exitTimingMode?: 'before-end' | 'after-appear' | 'custom';
  exitDelayFrames?: number;
}

export const SceneCaption: React.FC<SceneCaptionProps> = ({
  headline,
  subtitle,
  tagline = '',
  primaryColor = '#F4F1EA',
  accentColor,
  taglineColor,
  fontFamily = "'Inter', sans-serif",
  headlineSize = 64,
  subtitleSize = 40,
  taglineSize = 28,
  letterSpacing = 0.4,
  textOffsetX = 0,
  textOffsetY = 0,
  textAlign = 'center',
  textAnimation = 'char-wave',
  baseTop = 678,
  delayFrames = 32,
  line1Delay,
  line2Delay,
  line3Delay,
  showLogo = true,
  exitAnimation,
  exitTarget,
  exitDurationFrames,
  exitStartFrame,
  exitTimingMode,
  exitDelayFrames,
}) => {
  const alignItems =
    textAlign === 'left'
      ? 'flex-start'
      : textAlign === 'right'
        ? 'flex-end'
        : 'center';

  const startLine1 = line1Delay !== undefined ? line1Delay : delayFrames;
  const startLine2 = line2Delay !== undefined ? line2Delay : delayFrames + 12;
  const startLine3 = line3Delay !== undefined ? line3Delay : delayFrames + 24;

  const resolvedTaglineColor = taglineColor || accentColor;

  const { width: compWidth = 1920, height: compHeight = 1080 } = useVideoConfig();

  const totalTextHeight =
    headlineSize * 1.35 +
    (subtitle ? subtitleSize * 1.35 + Math.max(10, headlineSize * 0.15) : 0) +
    (tagline ? taglineSize * 1.35 + Math.max(10, subtitleSize * 0.15) : 0);

  const effectiveBaseTop =
    showLogo === false
      ? (compHeight - totalTextHeight) / 2
      : Math.round(baseTop * (compHeight / 1080));
  const horizontalPadding =
    showLogo === false ? Math.round(compWidth * 0.06) : Math.round(compWidth * 0.12);
  const effectiveWidth = compWidth - horizontalPadding * 2;
  const effectiveLeft = horizontalPadding;
  const gap = Math.max(10, Math.min(36, Math.round(headlineSize * 0.18)));

  return (
    <SceneExitWrapper
      target="text"
      exitAnimation={exitAnimation}
      exitTarget={exitTarget}
      exitDurationFrames={exitDurationFrames}
      exitStartFrame={exitStartFrame}
      exitTimingMode={exitTimingMode}
      exitDelayFrames={exitDelayFrames}
      style={{
        position: 'absolute',
        top: effectiveBaseTop + textOffsetY,
        left: effectiveLeft + textOffsetX,
        width: effectiveWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems,
        textAlign,
        gap,
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
        startFrame={startLine1}
        textAlign={textAlign}
      />
      {subtitle && (
        <AnimatedTextLine
          text={subtitle}
          fontFamily={fontFamily}
          fontSize={subtitleSize}
          fontWeight={400}
          letterSpacing={Math.max(0.05, letterSpacing * 0.7)}
          color={accentColor}
          accentColor={primaryColor}
          animation={textAnimation}
          startFrame={startLine2}
          textAlign={textAlign}
          isSubtitle
        />
      )}
      {tagline && (
        <AnimatedTextLine
          text={tagline}
          fontFamily={fontFamily}
          fontSize={taglineSize}
          fontWeight={400}
          letterSpacing={Math.max(0.04, letterSpacing * 0.6)}
          color={resolvedTaglineColor}
          accentColor={primaryColor}
          animation={textAnimation}
          startFrame={startLine3}
          textAlign={textAlign}
          isSubtitle
        />
      )}
    </SceneExitWrapper>
  );
};
