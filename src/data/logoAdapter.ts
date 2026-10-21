import { BIRIM_LETTERS, FULL_LOGO_PATH, LOGO_VIEWBOX, LogoLetterData } from './birimLogoPaths';
import { CustomLogo } from '../utils/logoStorage';

export interface EffectiveLogoData {
  isCustom: boolean;
  name: string;
  viewBox: {
    width: number;
    height: number;
  };
  fullPath: string;
  letters: LogoLetterData[];
  svgContent?: string;
}

export function getEffectiveLogo(customLogo?: CustomLogo | null): EffectiveLogoData {
  if (!customLogo || !customLogo.id || customLogo.id === 'birim') {
    return {
      isCustom: false,
      name: 'BİRİM',
      viewBox: {
        width: LOGO_VIEWBOX.width,
        height: LOGO_VIEWBOX.height,
      },
      fullPath: FULL_LOGO_PATH,
      letters: BIRIM_LETTERS,
    };
  }

  const vbWidth = customLogo.width > 0 ? customLogo.width : 480;
  const vbHeight = customLogo.height > 0 ? customLogo.height : 120;
  const fullPath = customLogo.compoundPath || '';

  const letters: LogoLetterData[] =
    customLogo.letters && customLogo.letters.length > 0
      ? customLogo.letters.map((l, i) => ({
          id: (l.id || `P${i + 1}`) as LogoLetterData['id'],
          char: l.char || String(i + 1),
          code: l.code || `MOD-0${i + 1}`,
          compoundPath: l.compoundPath,
          outerPath: l.outerPath || l.compoundPath,
          holePaths: l.holePaths || [],
          bounds: l.bounds || {
            xMin: 0,
            xMax: vbWidth,
            yMin: 0,
            yMax: vbHeight,
            width: vbWidth,
            height: vbHeight,
          },
          centerX: l.centerX ?? vbWidth / 2,
          centerY: l.centerY ?? vbHeight / 2,
          segments: [],
        }))
      : [
          {
            id: 'B' as const,
            char: customLogo.name.charAt(0) || 'L',
            code: 'MOD-01',
            compoundPath: fullPath,
            outerPath: fullPath,
            holePaths: [],
            bounds: {
              xMin: 0,
              xMax: vbWidth,
              yMin: 0,
              yMax: vbHeight,
              width: vbWidth,
              height: vbHeight,
            },
            centerX: vbWidth / 2,
            centerY: vbHeight / 2,
            segments: [],
          },
        ];

  return {
    isCustom: true,
    name: customLogo.name,
    viewBox: {
      width: vbWidth,
      height: vbHeight,
    },
    fullPath,
    letters,
    svgContent: customLogo.svgContent,
  };
}
