import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const FONT_OPTIONS = [
  "'Inter', sans-serif",
  "'Plus Jakarta Sans', sans-serif",
  "'Montserrat', sans-serif",
  "'Bebas Neue', sans-serif",
  "'Space Grotesk', sans-serif",
  "'Outfit', sans-serif",
  "'DM Sans', sans-serif",
  "'Syne', sans-serif",
  "'Sora', sans-serif",
  "'Oswald', sans-serif",
  "'Archivo Black', sans-serif",
  "'Cinzel', serif",
  "'Playfair Display', serif",
  "'Cormorant Garamond', serif",
  "'JetBrains Mono', monospace",
  "'Fira Code', monospace",
] as const;

export const TEXT_ANIMATION_OPTIONS = [
  'char-wave',
  'char-directional',
  'word-slide',
  'tracking-in',
  'tracking-out',
  'split-curtain',
  'flip-3d',
  'typewriter',
  'glitch-decode',
  'wipe-bar',
  'blur-scale',
  'fade-up',
  'bounce-drop',
  'skew-slide',
  'pop-scale',
  'smoke-dissolve',
  'shutter-reveal',
  'matrix-stream',
  'char-scramble-morph',
  'slot-machine-reel',
  'char-fragment-assemble',
  'neon-flicker',
  'wave-cascade-y',
] as const;

export type TextAnimationType = (typeof TEXT_ANIMATION_OPTIONS)[number];

export const ASPECT_RATIO_OPTIONS = [
  { value: '16:9', label: '16:9 Yatay', desc: 'YouTube / TV (1920×1080)', width: 1920, height: 1080, icon: '🖥️' },
  { value: '9:16', label: '9:16 Dikey', desc: 'Reels / Shorts / TikTok (1080×1920)', width: 1080, height: 1920, icon: '📱' },
  { value: '1:1', label: '1:1 Kare', desc: 'Instagram Feed (1080×1080)', width: 1080, height: 1080, icon: '⏹️' },
] as const;

export type AspectRatioType = (typeof ASPECT_RATIO_OPTIONS)[number]['value'];

export const EXIT_ANIMATION_OPTIONS = [
  'none',
  'fade-out',
  'reverse-spring',
  'slide-down',
  'slide-up',
  'zoom-out',
  'zoom-in',
  'blur-dissolve',
  'wipe-curtain',
  'glitch-fade',
] as const;

export type ExitAnimationType = (typeof EXIT_ANIMATION_OPTIONS)[number];

export const EXIT_TARGET_OPTIONS = [
  'both',
  'text-only',
  'logo-only',
] as const;

export type ExitTargetType = (typeof EXIT_TARGET_OPTIONS)[number];

export const ArchitecturalSceneSchema = z.object({
  headline: z.string().default('MİMARİ TASARIM & YAPI'),
  subtitle: z.string().default('ÇAĞDAŞ MEKÂN KURGUSU // İSTANBUL'),
  tagline: z.string().optional(),
  projectCode: z.string().default('PRJ-2026 // PAFTA 01'),
  scaleText: z.string().default('ÖLÇEK 1:50 // BİRİM: MM'),
  accentColor: zColor().default('#C89D66'),
  primaryColor: zColor().default('#F4F1EA'),
  taglineColor: zColor().optional(),
  backgroundColor: zColor().default('#0B0D10'),
  fontFamily: z.enum(FONT_OPTIONS).optional().default("'Inter', sans-serif"),
  headlineSize: z.number().min(6).max(500).optional().default(64),
  subtitleSize: z.number().min(6).max(500).optional().default(40),
  taglineSize: z.number().min(6).max(500).optional(),
  letterSpacing: z.number().min(0).max(2.0).optional().default(0.4),
  textOffsetX: z.number().min(-1200).max(1200).optional().default(0),
  textOffsetY: z.number().min(-900).max(900).optional().default(0),
  textAlign: z.enum(['left', 'center', 'right']).optional().default('center'),
  textAnimation: z.enum(TEXT_ANIMATION_OPTIONS).optional().default('char-wave'),
  textDelayFrames: z.number().min(0).max(300).optional(),
  line1Delay: z.number().min(0).max(300).optional(),
  line2Delay: z.number().min(0).max(300).optional(),
  line3Delay: z.number().min(0).max(300).optional(),
  aspectRatio: z.enum(['16:9', '9:16', '1:1']).optional(),
  showLogo: z.boolean().optional(),
  logoScale: z.number().min(0.1).max(5).optional(),
  playbackSpeed: z.number().min(0.1).max(5).optional(),
  durationInFrames: z.number().min(30).max(3600).optional(),
  exitAnimation: z.enum(EXIT_ANIMATION_OPTIONS).optional(),
  exitTarget: z.enum(EXIT_TARGET_OPTIONS).optional(),
  exitDurationFrames: z.number().min(5).max(120).optional(),
  exitStartFrame: z.number().min(0).max(3600).optional(),
  exitTimingMode: z.enum(['before-end', 'after-appear', 'custom']).optional(),
  exitDelayFrames: z.number().min(0).max(600).optional(),
});

export type ArchitecturalSceneProps = z.infer<typeof ArchitecturalSceneSchema>;

export const LowerThirdSchema = z.object({
  projectTitle: z.string().default('KUZEY KAMPÜSÜ KÜLTÜR MERKEZİ'),
  architecturalPhase: z.string().default('UYGULAMA PROJESİ // KESİT A-A'),
  tagline: z.string().optional(),
  locationYear: z.string().default('İSTANBUL — 2026'),
  accentColor: zColor().default('#C89D66'),
  primaryColor: zColor().optional(),
  taglineColor: zColor().optional(),
  transparentBackground: z.boolean().default(false),
  fontFamily: z.enum(FONT_OPTIONS).optional().default("'Inter', sans-serif"),
  headlineSize: z.number().min(6).max(500).optional().default(22),
  subtitleSize: z.number().min(6).max(500).optional().default(12),
  taglineSize: z.number().min(6).max(500).optional(),
  letterSpacing: z.number().min(0).max(2.0).optional().default(0.18),
  textOffsetX: z.number().min(-1200).max(1200).optional().default(0),
  textOffsetY: z.number().min(-900).max(900).optional().default(0),
  textAnimation: z.enum(TEXT_ANIMATION_OPTIONS).optional().default('char-wave'),
  textDelayFrames: z.number().min(0).max(300).optional(),
  line1Delay: z.number().min(0).max(300).optional(),
  line2Delay: z.number().min(0).max(300).optional(),
  line3Delay: z.number().min(0).max(300).optional(),
  aspectRatio: z.enum(['16:9', '9:16', '1:1']).optional(),
  showLogo: z.boolean().optional(),
  logoScale: z.number().min(0.1).max(5).optional(),
  playbackSpeed: z.number().min(0.1).max(5).optional(),
  durationInFrames: z.number().min(30).max(3600).optional(),
  exitAnimation: z.enum(EXIT_ANIMATION_OPTIONS).optional(),
  exitTarget: z.enum(EXIT_TARGET_OPTIONS).optional(),
  exitDurationFrames: z.number().min(5).max(120).optional(),
  exitStartFrame: z.number().min(0).max(3600).optional(),
  exitTimingMode: z.enum(['before-end', 'after-appear', 'custom']).optional(),
  exitDelayFrames: z.number().min(0).max(600).optional(),
});

export type LowerThirdProps = z.infer<typeof LowerThirdSchema>;
