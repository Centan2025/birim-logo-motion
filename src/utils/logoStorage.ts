export interface CustomLetterData {
  id: string;
  char?: string;
  code?: string;
  compoundPath: string;
  outerPath?: string;
  holePaths?: string[];
  bounds?: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    width: number;
    height: number;
  };
  centerX?: number;
  centerY?: number;
}

export interface CustomLogo {
  id: string;
  name: string;
  svgContent: string;
  viewBox: string;
  width: number;
  height: number;
  compoundPath?: string;
  letters?: CustomLetterData[];
  createdAt?: number;
}

const STORAGE_KEY = 'birim_custom_logos_v1';
const ACTIVE_LOGO_KEY = 'birim_active_logo_id_v1';

export const getStoredCustomLogos = (): CustomLogo[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('[LogoStorage] Logolar okunamadı:', err);
    return [];
  }
};

export const saveCustomLogo = (logo: CustomLogo): CustomLogo[] => {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredCustomLogos();
    const updated = [logo, ...existing.filter((l) => l.id !== logo.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('[LogoStorage] Logo kaydedilemedi:', err);
    return getStoredCustomLogos();
  }
};

export const deleteCustomLogo = (id: string): CustomLogo[] => {
  if (typeof window === 'undefined') return [];
  try {
    const existing = getStoredCustomLogos();
    const updated = existing.filter((l) => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (getActiveLogoId() === id) {
      setActiveLogoId('birim');
    }
    return updated;
  } catch (err) {
    console.error('[LogoStorage] Logo silinemedi:', err);
    return getStoredCustomLogos();
  }
};

export const getActiveLogoId = (): string => {
  if (typeof window === 'undefined') return 'birim';
  try {
    return localStorage.getItem(ACTIVE_LOGO_KEY) || 'birim';
  } catch {
    return 'birim';
  }
};

export const setActiveLogoId = (id: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ACTIVE_LOGO_KEY, id);
  } catch (err) {
    console.warn('[LogoStorage] Aktif logo kaydedilemedi:', err);
  }
};

/**
 * Yüklenen .svg dosyasını tarayıcıda parse eder, viewBox, path ve harf/parça koordinatlarını ayıklar.
 */
export const parseSvgFile = async (file: File): Promise<CustomLogo> => {
  const text = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');

  if (!svgEl) {
    throw new Error('Geçerli bir SVG formatı bulunamadı.');
  }

  // 1. Güvenlik: script ve zararlı etiketleri temizle
  const scripts = svgEl.querySelectorAll('script, foreignObject');
  scripts.forEach((s) => s.remove());

  // 2. ViewBox çözümleme
  let viewBox = svgEl.getAttribute('viewBox') || '';
  let vbWidth = 480;
  let vbHeight = 120;

  if (viewBox) {
    const parts = viewBox.trim().split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      vbWidth = parts[2];
      vbHeight = parts[3];
    }
  } else {
    const wAttr = parseFloat(svgEl.getAttribute('width') || '480');
    const hAttr = parseFloat(svgEl.getAttribute('height') || '120');
    if (!isNaN(wAttr) && !isNaN(hAttr) && wAttr > 0 && hAttr > 0) {
      vbWidth = wAttr;
      vbHeight = hAttr;
      viewBox = `0 0 ${vbWidth} ${vbHeight}`;
    } else {
      viewBox = '0 0 480 120';
    }
  }

  // 3. İçerideki tüm path elemanlarını ayıkla ve bounding box hesapla
  const pathEls = Array.from(svgEl.querySelectorAll('path'));
  const letters: CustomLetterData[] = [];

  // Geçici offscreen SVG oluşturarak tam BBox koordinatlarını al
  let tempSvg: SVGSVGElement | null = null;
  if (typeof document !== 'undefined') {
    tempSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tempSvg.setAttribute('viewBox', viewBox);
    tempSvg.style.position = 'absolute';
    tempSvg.style.visibility = 'hidden';
    tempSvg.style.pointerEvents = 'none';
    tempSvg.style.width = '0';
    tempSvg.style.height = '0';
    document.body.appendChild(tempSvg);
  }

  try {
    for (let i = 0; i < pathEls.length; i++) {
      const p = pathEls[i];
      const d = p.getAttribute('d')?.trim();
      if (!d) continue;

      let bounds = {
        xMin: 0,
        xMax: vbWidth,
        yMin: 0,
        yMax: vbHeight,
        width: vbWidth,
        height: vbHeight,
      };
      let centerX = vbWidth / 2;
      let centerY = vbHeight / 2;

      if (tempSvg) {
        const testPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        testPath.setAttribute('d', d);
        tempSvg.appendChild(testPath);
        try {
          const bbox = testPath.getBBox();
          if (bbox && bbox.width > 0 && bbox.height > 0) {
            bounds = {
              xMin: bbox.x,
              xMax: bbox.x + bbox.width,
              yMin: bbox.y,
              yMax: bbox.y + bbox.height,
              width: bbox.width,
              height: bbox.height,
            };
            centerX = bbox.x + bbox.width / 2;
            centerY = bbox.y + bbox.height / 2;
          }
        } catch {
          // getBBox desteklenmiyorsa varsayılan sınırlar kullanılır
        }
        testPath.remove();
      }

      letters.push({
        id: `P${i + 1}`,
        char: String(i + 1),
        code: `PARCA-${i + 1}`,
        compoundPath: d,
        outerPath: d,
        bounds,
        centerX,
        centerY,
      });
    }
  } finally {
    if (tempSvg) {
      tempSvg.remove();
    }
  }

  const compoundPath = letters.map((l) => l.compoundPath).join(' ');
  const innerContent = svgEl.innerHTML;
  const baseName = file.name.replace(/\.svg$/i, '').trim() || 'Özel Logo';

  return {
    id: `custom-logo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: baseName,
    svgContent: innerContent,
    viewBox,
    width: vbWidth,
    height: vbHeight,
    compoundPath: compoundPath || undefined,
    letters: letters.length > 0 ? letters : undefined,
    createdAt: Date.now(),
  };
};
