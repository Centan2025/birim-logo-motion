import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const ArchitecturalSceneSchema = z.object({
  headline: z.string().default('MİMARİ TASARIM & YAPI'),
  subtitle: z.string().default('ÇAĞDAŞ MEKÂN KURGUSU // İSTANBUL'),
  projectCode: z.string().default('PRJ-2026 // PAFTA 01'),
  scaleText: z.string().default('ÖLÇEK 1:50 // BİRİM: MM'),
  accentColor: zColor().default('#C89D66'),
  primaryColor: zColor().default('#F4F1EA'),
  backgroundColor: zColor().default('#0B0D10'),
});

export type ArchitecturalSceneProps = z.infer<typeof ArchitecturalSceneSchema>;

export const LowerThirdSchema = z.object({
  projectTitle: z.string().default('KUZEY KAMPÜSÜ KÜLTÜR MERKEZİ'),
  architecturalPhase: z.string().default('UYGULAMA PROJESİ // KESİT A-A'),
  locationYear: z.string().default('İSTANBUL — 2026'),
  accentColor: zColor().default('#C89D66'),
  transparentBackground: z.boolean().default(false),
});

export type LowerThirdProps = z.infer<typeof LowerThirdSchema>;
