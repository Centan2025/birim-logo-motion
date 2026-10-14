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

export const ArchitecturalSceneSchema = z.object({
  headline: z.string().default('MİMARİ TASARIM & YAPI'),
  subtitle: z.string().default('ÇAĞDAŞ MEKÂN KURGUSU // İSTANBUL'),
  projectCode: z.string().default('PRJ-2026 // PAFTA 01'),
  scaleText: z.string().default('ÖLÇEK 1:50 // BİRİM: MM'),
  accentColor: zColor().default('#C89D66'),
  primaryColor: zColor().default('#F4F1EA'),
  backgroundColor: zColor().default('#0B0D10'),
  fontFamily: z.enum(FONT_OPTIONS).optional().default("'Inter', sans-serif"),
  headlineSize: z.number().min(8).max(500).optional().default(19),
  subtitleSize: z.number().min(6).max(250).optional().default(12),
  letterSpacing: z.number().min(0).max(2.0).optional().default(0.4),
  textOffsetX: z.number().min(-1200).max(1200).optional().default(0),
  textOffsetY: z.number().min(-900).max(900).optional().default(0),
  textAlign: z.enum(['left', 'center', 'right']).optional().default('center'),
  textAnimation: z.enum(TEXT_ANIMATION_OPTIONS).optional().default('char-wave'),
  textDelayFrames: z.number().min(0).max(180).optional(),
  showLogo: z.boolean().optional(),
});

export type ArchitecturalSceneProps = z.infer<typeof ArchitecturalSceneSchema>;

export const LowerThirdSchema = z.object({
  projectTitle: z.string().default('KUZEY KAMPÜSÜ KÜLTÜR MERKEZİ'),
  architecturalPhase: z.string().default('UYGULAMA PROJESİ // KESİT A-A'),
  locationYear: z.string().default('İSTANBUL — 2026'),
  accentColor: zColor().default('#C89D66'),
  primaryColor: zColor().optional(),
  transparentBackground: z.boolean().default(false),
  fontFamily: z.enum(FONT_OPTIONS).optional().default("'Inter', sans-serif"),
  headlineSize: z.number().min(8).max(500).optional().default(22),
  subtitleSize: z.number().min(6).max(250).optional().default(12),
  letterSpacing: z.number().min(0).max(2.0).optional().default(0.18),
  textOffsetX: z.number().min(-1200).max(1200).optional().default(0),
  textOffsetY: z.number().min(-900).max(900).optional().default(0),
  textAnimation: z.enum(TEXT_ANIMATION_OPTIONS).optional().default('char-wave'),
  textDelayFrames: z.number().min(0).max(180).optional(),
  showLogo: z.boolean().optional(),
});

export type LowerThirdProps = z.infer<typeof LowerThirdSchema>;
