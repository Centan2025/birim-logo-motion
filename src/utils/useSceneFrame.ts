import { useCurrentFrame } from 'remotion';

/**
 * Returns the effective animation frame scaled by the scene's playback speed.
 * The video duration remains constant, while internal entrance and transition
 * motions scale proportionally so faster speeds finish earlier and hold still.
 */
export const useSceneFrame = (playbackSpeed?: number): number => {
  const rawFrame = useCurrentFrame();
  const speed = typeof playbackSpeed === 'number' && playbackSpeed > 0 ? playbackSpeed : 1.0;
  return rawFrame * speed;
};
