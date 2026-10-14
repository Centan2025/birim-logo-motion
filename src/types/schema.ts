import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const FONT_OPTIONS = [
  "'Inter', sans-serif",
  "'Montserrat', sans-serif",
  "'Space Grotesk', sans-serif",
  "'Outfit', sans-serif",
  "'Syne', sans-serif",
  "'Cinzel', serif",
  "'Playfair Display', serif",
  "'JetBrains Mono', monospace",
] as const;

export const ArchitecturalSceneSchema = z.object({
  headline: z.string().default('MİMARİ TASARIM & YAPI'),
  subtitle: z.string().default('ÇAĞDAŞ MEKÂN KURGUSU // İSTANBUL'),
  projectCode: z.string().default('PRJ-2026 // PAFTA 01'),
  scaleText: z.string().default('ÖLÇEK 1:50 // BİRİM: MM'),
  accentColor: zColor().default('#C89D66'),
  primaryColor: zColor().default('#F4F1EA'),
  backgroundColor: zColor().default('#0B0D10'),
  fontFamily: z.enum(FONT_OPTIONS).optional().default("'Inter', sans-serif"),
  headlineSize: z.number().min(8).max(96).optional().default(19),
  subtitleSize: z.number().min(6).max(64).optional().default(12),
  letterSpacing: z.number().min(0).max(1.5).optional().default(0.4),
  textOffsetX: z.number().min(-900).max(900).optional().default(0),
  textOffsetY: z.number().min(-700).max(500).optional().default(0),
  textAlign: z.enum(['left', 'center', 'right']).optional().default('center'),
});

export type ArchitecturalSceneProps = z.infer<typeof ArchitecturalSceneSchema>;

export const LowerThirdSchema = z.object({
  projectTitle: z.string().default('KUZEY KAMPÜSÜ KÜLTÜR MERKEZİ'),
  architecturalPhase: z.string().default('UYGULAMA PROJESİ // KESİT A-A'),
  locationYear: z.string().default('İSTANBUL — 2026'),
  accentColor: zColor().default('#C89D66'),
  transparentBackground: z.boolean().default(false),
  fontFamily: z.enum(FONT_OPTIONS).optional().default("'Inter', sans-serif"),
  headlineSize: z.number().min(8).max(96).optional().default(22),
  subtitleSize: z.number().min(6).max(64).optional().default(12),
  letterSpacing: z.number().min(0).max(1.5).optional().default(0.18),
  textOffsetX: z.number().min(-900).max(900).optional().default(0),
  textOffsetY: z.number().min(-700).max(500).optional().default(0),
});

export type LowerThirdProps = z.infer<typeof LowerThirdSchema>;
