import React, { createContext, useContext } from 'react';
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ExitAnimationType, ExitTargetType } from '../types/schema';

export interface SceneExitContextValue {
  exitAnimation: ExitAnimationType;
  exitTarget: ExitTargetType;
  exitDurationFrames: number;
  exitStartFrame?: number;
  exitTimingMode: 'before-end' | 'after-appear' | 'custom';
  exitDelayFrames: number;
}

const defaultExitContext: SceneExitContextValue = {
  exitAnimation: 'none',
  exitTarget: 'both',
  exitDurationFrames: 25,
  exitTimingMode: 'before-end',
  exitDelayFrames: 30,
};

export const SceneExitContext = createContext<SceneExitContextValue>(defaultExitContext);

export interface SceneExitProviderProps extends Partial<SceneExitContextValue> {
  children: React.ReactNode;
}

export const SceneExitProvider: React.FC<SceneExitProviderProps> = ({
  exitAnimation = 'none',
  exitTarget = 'both',
  exitDurationFrames = 25,
  exitStartFrame,
  exitTimingMode = 'before-end',
  exitDelayFrames = 30,
  children,
}) => {
  return (
    <SceneExitContext.Provider
      value={{
        exitAnimation,
        exitTarget,
        exitDurationFrames,
        exitStartFrame,
        exitTimingMode,
        exitDelayFrames,
      }}
    >
      {children}
    </SceneExitContext.Provider>
  );
};

export interface SceneExitWrapperProps {
  id?: string;
  'data-role'?: string;
  children: React.ReactNode;
  target: 'scene' | 'text' | 'logo';
  style?: React.CSSProperties;
  className?: string;
  exitAnimation?: ExitAnimationType;
  exitTarget?: ExitTargetType;
  exitDurationFrames?: number;
  exitStartFrame?: number;
  exitTimingMode?: 'before-end' | 'after-appear' | 'custom';
  exitDelayFrames?: number;
}

export const SceneExitWrapper: React.FC<SceneExitWrapperProps> = ({
  id,
  'data-role': dataRole,
  children,
  target,
  style,
  className,
  exitAnimation: propExitAnimation,
  exitTarget: propExitTarget,
  exitDurationFrames: propExitDuration,
  exitStartFrame: propExitStart,
  exitTimingMode: propExitTimingMode,
  exitDelayFrames: propExitDelay,
}) => {
  const ctx = useContext(SceneExitContext);
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Props override Context if provided
  const exitAnimation = propExitAnimation ?? ctx.exitAnimation ?? 'none';
  const exitTarget = propExitTarget ?? ctx.exitTarget ?? 'both';
  const exitDuration = Math.max(5, propExitDuration ?? ctx.exitDurationFrames ?? 25);
  const exitTimingMode = propExitTimingMode ?? ctx.exitTimingMode ?? 'before-end';
  const exitDelay = propExitDelay ?? ctx.exitDelayFrames ?? 30;
  const customStart = propExitStart ?? ctx.exitStartFrame;

  // If no exit animation requested, render directly
  if (exitAnimation === 'none') {
    return (
      <div id={id} data-role={dataRole} style={style} className={className}>
        {children}
      </div>
    );
  }

  // Smart Target Filtering
  let shouldAnimate = false;
  if (exitTarget === 'both') {
    // When target is 'both', the outer 'scene' wrapper performs the unified exit animation
    // Inner text and logo wrappers don't duplicate the animation
    shouldAnimate = target === 'scene';
  } else if (exitTarget === 'text-only') {
    // Only text caption wrapper animates out
    shouldAnimate = target === 'text';
  } else if (exitTarget === 'logo-only') {
    // Only logo wrapper animates out
    shouldAnimate = target === 'logo';
  }

  if (!shouldAnimate) {
    return (
      <div id={id} data-role={dataRole} style={style} className={className}>
        {children}
      </div>
    );
  }

  // Calculate exit start frame
  let computedStartFrame = 0;
  if (exitTimingMode === 'before-end') {
    computedStartFrame = Math.max(0, durationInFrames - exitDuration - exitDelay);
  } else if (exitTimingMode === 'after-appear') {
    // Typically entrance completes within ~35-50 frames; hold for exitDelay then exit
    computedStartFrame = Math.max(0, 45 + exitDelay);
  } else if (exitTimingMode === 'custom') {
    computedStartFrame = customStart !== undefined
      ? customStart
      : Math.max(0, durationInFrames - exitDuration - 10);
  }

  // If we haven't reached exit start frame yet
  if (frame < computedStartFrame) {
    return (
      <div id={id} data-role={dataRole} style={style} className={className}>
        {children}
      </div>
    );
  }

  const exitFrame = frame - computedStartFrame;
  const progress = interpolate(
    exitFrame,
    [0, exitDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  let transform = '';
  let opacity = 1;
  let filter = '';
  let clipPath = '';

  switch (exitAnimation) {
    case 'fade-out': {
      opacity = 1 - progress;
      break;
    }
    case 'reverse-spring': {
      const spr = spring({
        frame: exitFrame,
        fps,
        config: { damping: 14, mass: 0.8, stiffness: 120 },
      });
      const scale = Math.max(0, 1 - spr);
      opacity = Math.max(0, 1 - progress);
      transform = `scale(${scale})`;
      break;
    }
    case 'slide-down': {
      const translateY = interpolate(progress, [0, 1], [0, 120], {
        easing: Easing.inOut(Easing.cubic),
      });
      opacity = 1 - progress;
      transform = `translateY(${translateY}px)`;
      break;
    }
    case 'slide-up': {
      const translateY = interpolate(progress, [0, 1], [0, -120], {
        easing: Easing.inOut(Easing.cubic),
      });
      opacity = 1 - progress;
      transform = `translateY(${translateY}px)`;
      break;
    }
    case 'zoom-out': {
      const scale = interpolate(progress, [0, 1], [1, 0.4], {
        easing: Easing.in(Easing.back(1.5)),
      });
      opacity = 1 - progress;
      transform = `scale(${scale})`;
      break;
    }
    case 'zoom-in': {
      const scale = interpolate(progress, [0, 1], [1, 1.8], {
        easing: Easing.in(Easing.cubic),
      });
      opacity = Math.max(0, 1 - progress);
      transform = `scale(${scale})`;
      break;
    }
    case 'blur-dissolve': {
      const blurPx = interpolate(progress, [0, 1], [0, 24]);
      const scale = interpolate(progress, [0, 1], [1, 1.05]);
      opacity = 1 - progress;
      filter = `blur(${blurPx}px)`;
      transform = `scale(${scale})`;
      break;
    }
    case 'wipe-curtain': {
      const wipePct = progress * 50;
      clipPath = `inset(0% ${wipePct}% 0% ${wipePct}%)`;
      opacity = interpolate(progress, [0.85, 1], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      break;
    }
    case 'glitch-fade': {
      const jitterX = Math.sin(frame * 4.2) * (1 - progress) * 16;
      const jitterY = Math.cos(frame * 3.7) * (1 - progress) * 8;
      const flicker = Math.sin(frame * 2.8) > 0.4 ? 0.35 : 1;
      opacity = Math.max(0, (1 - progress) * flicker);
      transform = `translate(${jitterX}px, ${jitterY}px)`;
      break;
    }
  }

  const exitStyle: React.CSSProperties = {
    ...style,
    transform: [style?.transform, transform].filter(Boolean).join(' ') || undefined,
    opacity: style?.opacity !== undefined ? Number(style.opacity) * opacity : opacity,
    filter: [style?.filter, filter].filter(Boolean).join(' ') || undefined,
    clipPath: clipPath || style?.clipPath,
    transformOrigin: 'center center',
  };

  return (
    <div id={id} data-role={dataRole} style={exitStyle} className={className}>
      {children}
    </div>
  );
};
