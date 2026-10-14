import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { DirectionalLetterExpand } from '../compositions/DirectionalLetterExpand';
import { CadBlueprintDraft } from '../compositions/CadBlueprintDraft';
import { MonolithSunShadow } from '../compositions/MonolithSunShadow';
import { LaserSectionCut } from '../compositions/LaserSectionCut';
import { ModularKineticFacade } from '../compositions/ModularKineticFacade';
import { ArchitecturalLowerThird } from '../compositions/ArchitecturalLowerThird';
import { LiquidChromeSweep } from '../compositions/LiquidChromeSweep';
import { KineticElasticSplit } from '../compositions/KineticElasticSplit';
import { GlassPrismRefraction } from '../compositions/GlassPrismRefraction';
import { MinimalStaggerMorph } from '../compositions/MinimalStaggerMorph';
import { CleanVideoBadge } from '../compositions/CleanVideoBadge';
import { NeonLaserContour } from '../compositions/NeonLaserContour';
import { EditorialMaskCurtain } from '../compositions/EditorialMaskCurtain';
import { SpotlightDarkroomReveal } from '../compositions/SpotlightDarkroomReveal';
import { ElasticWaveDomino } from '../compositions/ElasticWaveDomino';
import { GlitchSignalLock } from '../compositions/GlitchSignalLock';
import { LiquidInkSpread } from '../compositions/LiquidInkSpread';
import { EchoOutlineTunnel } from '../compositions/EchoOutlineTunnel';
import { MagneticParticleSnap } from '../compositions/MagneticParticleSnap';
import { SplitScreenShutter } from '../compositions/SplitScreenShutter';
import { MinimalCornerWatermark } from '../compositions/MinimalCornerWatermark';
import { SplitFlapHalfFold } from '../compositions/SplitFlapHalfFold';
import { TopDownHeavyTopple } from '../compositions/TopDownHeavyTopple';
import { HalfLogoCantileverDrop } from '../compositions/HalfLogoCantileverDrop';
import { OrigamiAccordionUnfold } from '../compositions/OrigamiAccordionUnfold';
import { SplitHorizonDualTip } from '../compositions/SplitHorizonDualTip';
import { MasterShowcaseReel } from '../compositions/MasterShowcaseReel';
import { PureTypographyStudio } from '../compositions/PureTypographyStudio';
import {
  ArchitecturalSceneProps,
  LowerThirdProps,
  TextAnimationType,
} from '../types/schema';

type Category = 'all' | 'typography' | 'fold' | 'modern' | 'arch' | 'overlay';

interface SceneItem {
  id: string;
  title: string;
  desc: string;
  category: Category;
  durationInFrames: number;
  isOverlay?: boolean;
  archComponent?: React.FC<ArchitecturalSceneProps>;
  overlayComponent?: React.FC<LowerThirdProps>;
}

const SCENES: SceneItem[] = [
  {
    id: '26-Directional-Letter-Expand',
    title: '26 // Harf Bazlı Yönlü Genişleme (Sol-Alt-Sağ-Üst-Alt)',
    desc: '1.Sol→Sağ, 2.Alt→Yukarı, 3.Sağ→Sol, 4.Üst→Aşağı, 5.Alt→Yukarı ardışık genişleme',
    category: 'modern',
    durationInFrames: 150,
    archComponent: DirectionalLetterExpand,
  },
  {
    id: '21-Split-Flap-Half-Fold',
    title: '21 // Yatay Yarı Devrilme (Split-Flap)',
    desc: 'Üst yarı sabitken alt yarının orta eksenden 3B devrilerek açılması',
    category: 'fold',
    durationInFrames: 150,
    archComponent: SplitFlapHalfFold,
  },
  {
    id: '22-Top-Down-Heavy-Topple',
    title: '22 // Yukarıdan Aşağı Monolit Devrilme',
    desc: 'Tavandan aşağıya ağır kütle fiziğiyle devrilip zemine oturma',
    category: 'fold',
    durationInFrames: 150,
    archComponent: TopDownHeavyTopple,
  },
  {
    id: '23-Half-Logo-Cantilever-Drop',
    title: '23 // Sağ Yarının Kırılıp Devrilmesi',
    desc: 'Sol yarı sabitken sağ yarının ortadan kırılıp aşağı sarkması ve kilitlenmesi',
    category: 'fold',
    durationInFrames: 150,
    archComponent: HalfLogoCantileverDrop,
  },
  {
    id: '24-Origami-Accordion-Unfold',
    title: '24 // 3 Kademeli Akordeon Devrilme',
    desc: 'Yukarıdan aşağıya 3 yatay plakanın şelale gibi katlanarak açılması',
    category: 'fold',
    durationInFrames: 150,
    archComponent: OrigamiAccordionUnfold,
  },
  {
    id: '25-Split-Horizon-Dual-Tip',
    title: '25 // Çift Eksenli Zıt Yarı-Devrilme',
    desc: 'Açık galeri zemininde üst ve alt yarıların kademeli devrilerek birleşmesi',
    category: 'fold',
    durationInFrames: 150,
    archComponent: SplitHorizonDualTip,
  },
  {
    id: '06-Liquid-Chrome-Sweep',
    title: '06 // Saten Metal & Işık Yansıması',
    desc: 'İnce kontur ışığı ve yüzeyden diyagonal akan sıvı krom yansıması',
    category: 'modern',
    durationInFrames: 150,
    archComponent: LiquidChromeSweep,
  },
  {
    id: '07-Kinetic-Elastic-Split',
    title: '07 // Kinetik Dilimleme & Elastik',
    desc: '3 yatay şeride bölünen harflerin zıt yönlerden yay fiziğiyle kilitlenmesi',
    category: 'modern',
    durationInFrames: 150,
    archComponent: KineticElasticSplit,
  },
  {
    id: '08-Glass-Prism-Refraction',
    title: '08 // Buzlu Cam & Prizma Kırılması',
    desc: 'Buzlu cam kart içinde prizmatik renk ayrışmasından net vektöre odaklanma',
    category: 'modern',
    durationInFrames: 150,
    archComponent: GlassPrismRefraction,
  },
  {
    id: '09-Minimal-Stagger-Morph',
    title: '09 // Minimalist Negatif Alan Açılımı',
    desc: 'İnce dikey vurgu çizgilerinin genişleyerek harf formlarına dönüşmesi',
    category: 'modern',
    durationInFrames: 150,
    archComponent: MinimalStaggerMorph,
  },
  {
    id: '11-Neon-Laser-Contour',
    title: '11 // Çift Lazer Kontur Ateşleme',
    desc: 'İki zıt lazer hüzmesinin dış ve iç konturları çizip kütleyi yakması',
    category: 'modern',
    durationInFrames: 150,
    archComponent: NeonLaserContour,
  },
  {
    id: '12-Editorial-Mask-Curtain',
    title: '12 // Editoryal Ufuk Çizgisi',
    desc: 'Görünmez ufuk çizgisinden logo yukarı çıkarken metnin aşağı inmesi',
    category: 'modern',
    durationInFrames: 150,
    archComponent: EditorialMaskCurtain,
  },
  {
    id: '13-Spotlight-Darkroom-Reveal',
    title: '13 // Karanlık Oda & Stüdyo Spotu',
    desc: 'Gezinen spot ışığıyla aydınlanan kütle ve dinamik zıt yönlü gölge',
    category: 'modern',
    durationInFrames: 150,
    archComponent: SpotlightDarkroomReveal,
  },
  {
    id: '14-Elastic-Wave-Domino',
    title: '14 // 3B Perspektif Domino Dalgası',
    desc: 'Harflerin domino taşları gibi dalga halinde dönerek açılması',
    category: 'modern',
    durationInFrames: 150,
    archComponent: ElasticWaveDomino,
  },
  {
    id: '15-Glitch-Signal-Lock',
    title: '15 // Dijital Sinyal Kilitlenmesi',
    desc: 'Yatay sinyal dilimlerinin titreşimden sonra net vektöre kilitlenmesi',
    category: 'modern',
    durationInFrames: 150,
    archComponent: GlitchSignalLock,
  },
  {
    id: '16-Liquid-Ink-Spread',
    title: '16 // Dairesel Renk Tersinmesi (Inversion)',
    desc: 'Merkezden yayılan dairesel dalgayla siyah-beyaz negatif renk dönüşümü',
    category: 'modern',
    durationInFrames: 150,
    archComponent: LiquidInkSpread,
  },
  {
    id: '17-Echo-Outline-Tunnel',
    title: '17 // Eko Kontur Tüneli',
    desc: 'Merkeze doğru küçülen 7 kontur halkasının ana logoda birleşmesi',
    category: 'modern',
    durationInFrames: 150,
    archComponent: EchoOutlineTunnel,
  },
  {
    id: '18-Magnetic-Particle-Snap',
    title: '18 // Manyetik Nokta Ağı (Plexus)',
    desc: 'DXF köşe noktalarının yıldız ağı gibi bağlanıp harflere çekilmesi',
    category: 'modern',
    durationInFrames: 150,
    archComponent: MagneticParticleSnap,
  },
  {
    id: '19-Split-Screen-Shutter',
    title: '19 // Diyagonal Deklanşör & Makro Zoom',
    desc: 'Makro yakın çekimden diyagonal kanatların açılmasıyla kadraja oturma',
    category: 'modern',
    durationInFrames: 150,
    archComponent: SplitScreenShutter,
  },
  {
    id: '01-CAD-Blueprint-Draft',
    title: '01 // Mimari CAD & Spline Röleve',
    desc: 'DXF Bézier kontrol kolları, ölçü okları ve 45° taramalı teknik çizim',
    category: 'arch',
    durationInFrames: 150,
    archComponent: CadBlueprintDraft,
  },
  {
    id: '02-Monolith-Sun-Shadow',
    title: '02 // Brütalist Monolit & Güneş Gölgesi',
    desc: 'Traverten zeminde yükselen kütleler ve güneş açısına göre uzayan gölge',
    category: 'arch',
    durationInFrames: 150,
    archComponent: MonolithSunShadow,
  },
  {
    id: '03-Laser-Section-Cut',
    title: '03 // Mimari Kesit A—A Lazer Tarama',
    desc: 'Lazer kesit düzlemiyle taranan 45° kesit dokusu ve cephe dolgusu',
    category: 'arch',
    durationInFrames: 150,
    archComponent: LaserSectionCut,
  },
  {
    id: '04-Modular-Kinetic-Facade',
    title: '04 // Modüler Cephe Aks Sistemi',
    desc: 'Yapısal aks rayları üzerinde kayarak hizalanan cephe modülleri',
    category: 'arch',
    durationInFrames: 150,
    archComponent: ModularKineticFacade,
  },
  {
    id: '05-Architectural-Lower-Third',
    title: '05 // Mimari Video Alt Bant (Künye)',
    desc: 'Videoların sol altına yerleşen pafta anteti formatında şeffaf alt bant',
    category: 'overlay',
    durationInFrames: 150,
    isOverlay: true,
    overlayComponent: ArchitecturalLowerThird,
  },
  {
    id: '10-Clean-Video-Badge',
    title: '10 // Modern Cam Kapsül Alt Bant',
    desc: 'Yuvarlatılmış buzlu cam kapsül içinde logo ve genişleyen video başlığı',
    category: 'overlay',
    durationInFrames: 150,
    isOverlay: true,
    overlayComponent: CleanVideoBadge,
  },
  {
    id: '20-Minimal-Corner-Watermark',
    title: '20 // Merkezden Köşe Filigrana Geçiş',
    desc: 'Merkezde açılıp sol üst köşe filigranına küçülen logo + daktilo alt bant',
    category: 'overlay',
    durationInFrames: 150,
    isOverlay: true,
    overlayComponent: MinimalCornerWatermark,
  },
  {
    id: '27-Master-Showcase-Reel',
    title: '27 // TÜM ÖNERİLER MASTER SUNUM (130 SN)',
    desc: '26 sahnenin tamamını kesintisiz peş peşe oynatan master katalog',
    category: 'all',
    durationInFrames: 3900,
    archComponent: MasterShowcaseReel,
  },
  {
    id: '28-Pure-Kinetic-Typography',
    title: '28 // Saf Kinetik Tipografi & Metin Stüdyosu',
    desc: 'Logo olmadan sadece metin ve kinetik tipografi animasyonuna odaklanan saf stüdyo sahnesi',
    category: 'typography',
    durationInFrames: 150,
    archComponent: PureTypographyStudio,
  },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'Tümü (28)' },
  { id: 'typography', label: 'Saf Tipografi (1)' },
  { id: 'fold', label: '3B Devrilme & Katlanma (5)' },
  { id: 'modern', label: 'Modern & Sade (14)' },
  { id: 'arch', label: 'Mimari Yaklaşım (4)' },
  { id: 'overlay', label: 'Video Alt Bant & Filigran (3)' },
];

const FONT_CHOICES = [
  { label: 'Inter (Modern Sans)', value: "'Inter', sans-serif" },
  { label: 'Plus Jakarta Sans (Tech Pro)', value: "'Plus Jakarta Sans', sans-serif" },
  { label: 'Montserrat (Geometrik)', value: "'Montserrat', sans-serif" },
  { label: 'Bebas Neue (Uzun / Güçlü Başlık)', value: "'Bebas Neue', sans-serif" },
  { label: 'Space Grotesk (Teknik)', value: "'Space Grotesk', sans-serif" },
  { label: 'Outfit (Minimalist)', value: "'Outfit', sans-serif" },
  { label: 'DM Sans (Temiz Modern)', value: "'DM Sans', sans-serif" },
  { label: 'Syne (Art / Kinetik)', value: "'Syne', sans-serif" },
  { label: 'Sora (Gelecekçi Sans)', value: "'Sora', sans-serif" },
  { label: 'Oswald (Endüstriyel)', value: "'Oswald', sans-serif" },
  { label: 'Archivo Black (Ağır Monolit)', value: "'Archivo Black', sans-serif" },
  { label: 'Cinzel (Lüks / Klasik)', value: "'Cinzel', serif" },
  { label: 'Playfair Display (Editoryal)', value: "'Playfair Display', serif" },
  { label: 'Cormorant Garamond (Zarif Antik)', value: "'Cormorant Garamond', serif" },
  { label: 'JetBrains Mono (Mimari CAD)', value: "'JetBrains Mono', monospace" },
  { label: 'Fira Code (Kod / Pafta)', value: "'Fira Code', monospace" },
] as const;

const TEXT_ANIMATION_CHOICES: ReadonlyArray<{
  label: string;
  value: TextAnimationType;
}> = [
  { label: '1. Harf Dalga (Char Wave)', value: 'char-wave' },
  { label: '2. 4 Yönden Harf Genişleme (Directional)', value: 'char-directional' },
  { label: '3. Kelime Maskeli Kayma (Word Slide)', value: 'word-slide' },
  { label: '4. Harf Aralığı Daralarak (Tracking In)', value: 'tracking-in' },
  { label: '5. Merkezden Açılma (Tracking Out)', value: 'tracking-out' },
  { label: '6. Ortadan İkiye Perde (Split Curtain)', value: 'split-curtain' },
  { label: '7. 3B Dikey Harf Taklası (3D Flip)', value: 'flip-3d' },
  { label: '8. Daktilo İmleçli (Typewriter)', value: 'typewriter' },
  { label: '9. Siber Şifre Çözme (Glitch Decode)', value: 'glitch-decode' },
  { label: '10. Lazer Tarama Çubuğu (Wipe Bar)', value: 'wipe-bar' },
  { label: '11. Sinematik Odaklanma (Blur Scale)', value: 'blur-scale' },
  { label: '12. Klasik Yumuşak Yükseliş (Fade Up)', value: 'fade-up' },
  { label: '13. Elastik Zıplama & Düşüş (Bounce Drop)', value: 'bounce-drop' },
  { label: '14. Açılı Dinamik Kayma (Skew Slide)', value: 'skew-slide' },
  { label: '15. Enerjik Büyüme (Pop Scale)', value: 'pop-scale' },
  { label: '16. Puslu Odak & Çözülme (Smoke Dissolve)', value: 'smoke-dissolve' },
  { label: '17. Deklanşör Perde Maskesi (Shutter Reveal)', value: 'shutter-reveal' },
  { label: '18. Siber Akış & Şelale (Matrix Stream)', value: 'matrix-stream' },
  { label: '19. Harf Parça & Değişimli Morf (Scramble Morph)', value: 'char-scramble-morph' },
  { label: '20. Dikey Harf Tamburu (Slot Machine Reel)', value: 'slot-machine-reel' },
  { label: '21. Geometrik Parça Birleşimi (Fragment Assemble)', value: 'char-fragment-assemble' },
  { label: '22. Neon Işık Titremesi (Neon Flicker Glow)', value: 'neon-flicker' },
  { label: '23. Sinüs Dalgasal Kaskat (Sine Wave Cascade)', value: 'wave-cascade-y' },
];

interface SceneCustomConfig {
  headline: string;
  subtitle: string;
  projectCode: string;
  accentColor: string;
  textColor: string;
  fontFamily: (typeof FONT_CHOICES)[number]['value'];
  textAnimation: TextAnimationType;
  headlineSize: number;
  subtitleSize: number;
  letterSpacing: number;
  textOffsetX: number;
  textOffsetY: number;
  textAlign: 'left' | 'center' | 'right';
  textDelayFrames: number;
  durationInFrames: number;
  transparentBg: boolean;
  showLogo: boolean;
}

const DEFAULT_SCENE_CONFIG: SceneCustomConfig = {
  headline: 'HİS',
  subtitle: '2004',
  projectCode: '',
  accentColor: '#FFFFFF',
  textColor: '#FFFFFF',
  fontFamily: "'Inter', sans-serif",
  textAnimation: 'char-wave',
  headlineSize: 64,
  subtitleSize: 40,
  letterSpacing: 0.25,
  textOffsetX: 0,
  textOffsetY: 0,
  textAlign: 'left',
  textDelayFrames: 30,
  durationInFrames: 150,
  transparentBg: true,
  showLogo: true,
};

export const ShowcaseApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedId, setSelectedId] = useState<string>('26-Directional-Letter-Expand');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Her sahnenin kendine özgü ayarları burada saklanır
  const [sceneConfigs, setSceneConfigs] = useState<Record<string, SceneCustomConfig>>({});

  const cfg = sceneConfigs[selectedId] ?? DEFAULT_SCENE_CONFIG;

  const updateConfig = (patch: Partial<SceneCustomConfig>) => {
    setSceneConfigs((prev) => ({
      ...prev,
      [selectedId]: {
        ...(prev[selectedId] ?? DEFAULT_SCENE_CONFIG),
        ...patch,
      },
    }));
  };

  const [renderStatus, setRenderStatus] = useState<
    'idle' | 'rendering' | 'success' | 'error'
  >('idle');
  const [renderMessage, setRenderMessage] = useState<string>('');

  const filteredScenes = SCENES.filter((s) => {
    const matchesCategory =
      selectedCategory === 'all' || s.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const activeScene =
    SCENES.find((s) => s.id === selectedId) ?? SCENES[0];

  const handleRenderVideo = async (format: 'webm' | 'mp4' | 'mov') => {
    if (renderStatus === 'rendering') return;

    const isTrans = format === 'mov' ? true : format === 'webm' ? cfg.transparentBg : false;
    const ext = format === 'webm' ? 'webm' : format === 'mov' ? 'mov' : 'mp4';
    const safeScene = String(activeScene.id).replace(/[^a-zA-Z0-9_-]/g, '');
    const suggestedFilename = `${safeScene}-${isTrans ? 'seffaf-' : ''}${Date.now()}.${ext}`;

    interface NativeSaveHandle {
      createWritable: () => Promise<WritableStream & {
        write?: (chunk: unknown) => Promise<void>;
        close?: () => Promise<void>;
      }>;
    }

    let fileHandle: NativeSaveHandle | null = null;

    // 1. Tarayıcı destekliyorsa doğrudan Windows "Farklı Kaydet" penceresini aç
    if ('showSaveFilePicker' in window) {
      try {
        const picker = (window as unknown as {
          showSaveFilePicker?: (opts: unknown) => Promise<NativeSaveHandle>;
        }).showSaveFilePicker;

        if (picker) {
          fileHandle = await picker({
            suggestedName: suggestedFilename,
            types: [
              {
                description:
                  format === 'webm'
                    ? 'WebM Video (*.webm)'
                    : format === 'mp4'
                    ? 'MP4 Video (*.mp4)'
                    : 'Apple ProRes (*.mov)',
                accept: {
                  [format === 'webm'
                    ? 'video/webm'
                    : format === 'mp4'
                    ? 'video/mp4'
                    : 'video/quicktime']: [`.${ext}`],
                },
              },
            ],
          });
        }
      } catch (err: unknown) {
        // Kullanıcı iptal ettiyse render başlatma
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        fileHandle = null;
      }
    }

    try {
      setRenderStatus('rendering');
      setRenderMessage(
        fileHandle
          ? `⏳ Video işleniyor ve seçtiğiniz klasöre kaydedilecek...`
          : format === 'mov'
          ? '🎬 Şeffaf ProRes 4444 (.mov) işleniyor... (Birkaç saniye sürebilir)'
          : format === 'webm'
          ? (cfg.transparentBg ? '🟢 Şeffaf WebM (Alpha) işleniyor...' : 'WebM video işleniyor...')
          : 'MP4 Full HD video işleniyor...'
      );

      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sceneId: activeScene.id,
          transparent: isTrans,
          headline: cfg.headline,
          subtitle: cfg.subtitle,
          projectCode: cfg.projectCode,
          accentColor: cfg.accentColor,
          primaryColor: cfg.textColor,
          fontFamily: cfg.fontFamily,
          headlineSize: cfg.headlineSize,
          subtitleSize: cfg.subtitleSize,
          letterSpacing: cfg.letterSpacing,
          textOffsetX: cfg.textOffsetX,
          textOffsetY: cfg.textOffsetY,
          textAlign: cfg.textAlign,
          textAnimation: cfg.textAnimation,
          textDelayFrames: cfg.textDelayFrames,
          durationInFrames: cfg.durationInFrames,
          showLogo: cfg.showLogo,
          format,
        }),
      });

      if (!res.ok) {
        throw new Error(`Render sunucu hatası (${res.status})`);
      }

      const json = (await res.json()) as {
        success?: boolean;
        downloadUrl?: string;
        filename?: string;
        error?: string;
      };

      if (!json.success || !json.downloadUrl) {
        throw new Error(json.error || 'Video oluşturulamadı');
      }

      // 2. Seçilen konuma doğrudan kaydet
      if (fileHandle && typeof fileHandle.createWritable === 'function') {
        const fileRes = await fetch(json.downloadUrl);
        const writable = await fileHandle.createWritable();
        if (fileRes.body && typeof fileRes.body.pipeTo === 'function') {
          await fileRes.body.pipeTo(writable);
        } else if (typeof writable.write === 'function') {
          const blob = await fileRes.blob();
          await writable.write(blob);
          if (typeof writable.close === 'function') {
            await writable.close();
          }
        }
        setRenderStatus('success');
        setRenderMessage(`✓ Video seçtiğiniz konuma kaydedildi!`);
      } else {
        // Fallback: Standart tarayıcı indirmesi
        const link = document.createElement('a');
        link.href = json.downloadUrl;
        link.download = json.filename ?? 'video';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setRenderStatus('success');
        setRenderMessage(`✓ Video hazır! İndiriliyor: ${json.filename}`);
      }

      setTimeout(() => {
        setRenderStatus('idle');
        setRenderMessage('');
      }, 6000);
    } catch (err: unknown) {
      setRenderStatus('error');
      const msg = err instanceof Error ? err.message : String(err);
      setRenderMessage(`Hata: ${msg}`);
      setTimeout(() => {
        setRenderStatus('idle');
        setRenderMessage('');
      }, 7000);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#07090E',
        color: '#F4F1EA',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* 0. ÜST MODERN STÜDYO BAR (TOPBAR) */}
      <header
        style={{
          height: 48,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#0B0E15',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: '0.15em',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: '#3B82F6' }}>◆</span> BİRİM STUDIO
            <span
              style={{
                fontSize: 9.5,
                padding: '2px 6px',
                borderRadius: 4,
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                color: '#60A5FA',
                fontWeight: 600,
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              PRO v2.5
            </span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
            {activeScene.title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            ⏱ {(cfg.durationInFrames / 30).toFixed(1)} SN // 30 FPS // 1080P
          </div>
          <div
            style={{
              fontSize: 11,
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: cfg.transparentBg
                ? 'rgba(46, 204, 113, 0.15)'
                : 'rgba(255,255,255,0.05)',
              border: cfg.transparentBg
                ? '1px solid rgba(46, 204, 113, 0.35)'
                : '1px solid rgba(255,255,255,0.1)',
              color: cfg.transparentBg ? '#2ecc71' : 'rgba(255,255,255,0.6)',
              fontWeight: 600,
            }}
          >
            {cfg.transparentBg ? '🟢 ŞEFFAF ALPHA' : '⚪ SİYAH ZEMİN'}
          </div>
        </div>
      </header>

      {/* ANA ÇALIŞMA ALANI (3 SÜTUN) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '310px 1fr 360px',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        {/* 1. SOL PANEL: Modern Sahne Gezgini */}
        <aside
          style={{
            borderRight: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: '#0B0D14',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Arama ve Filtreleme */}
          <div
            style={{
              padding: '14px 14px 10px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {/* Arama Girişi */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 10,
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sahne veya efekt ara..."
                style={{
                  width: '100%',
                  padding: '7px 28px 7px 30px',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: '#12151E',
                  color: '#FFFFFF',
                  fontSize: 12,
                  outline: 'none',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 8,
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    fontSize: 11,
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Kategori Butonları */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? SCENES.length
                    : SCENES.filter((s) => s.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 6,
                      border: active
                        ? '1px solid #3B82F6'
                        : '1px solid rgba(255,255,255,0.07)',
                      backgroundColor: active
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(255,255,255,0.02)',
                      color: active ? '#93C5FD' : 'rgba(255,255,255,0.6)',
                      fontSize: 10.5,
                      fontWeight: active ? 600 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kaydırılabilir Sahne Listesi */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            {filteredScenes.map((scene) => {
              const isSelected = scene.id === activeScene.id;
              const sceneNum = scene.id.split('-')[0] ?? '';
              return (
                <button
                  key={scene.id}
                  onClick={() => setSelectedId(scene.id)}
                  style={{
                    textAlign: 'left',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: isSelected
                      ? '1px solid rgba(59, 130, 246, 0.6)'
                      : '1px solid rgba(255,255,255,0.05)',
                    borderLeft: isSelected
                      ? '3px solid #3B82F6'
                      : '3px solid transparent',
                    backgroundColor: isSelected
                      ? 'rgba(59, 130, 246, 0.12)'
                      : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 3,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: isSelected ? '#FFFFFF' : '#D1D5DB',
                      }}
                    >
                      {scene.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9.5,
                        padding: '1px 5px',
                        borderRadius: 4,
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      #{sceneNum}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: 'rgba(255,255,255,0.48)',
                      lineHeight: 1.35,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {scene.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* 2. ORTA ALAN: Video Oynatıcı & Canlı Dock */}
        <main
          style={{
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 12,
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#07080D',
          }}
        >
          {/* Sahne Başlık Çubuğu */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: '#FFFFFF' }}>
                {activeScene.title}
              </h2>
              <p
                style={{
                  fontSize: 11.5,
                  color: 'rgba(255,255,255,0.55)',
                  margin: '2px 0 0',
                }}
              >
                {activeScene.desc}
              </p>
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5,
                padding: '4px 10px',
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              1920×1080 • 30 FPS • {(cfg.durationInFrames / 30).toFixed(1)} SN
            </div>
          </div>

          {/* Oynatıcı Çerçevesi */}
          <div
            style={{
              width: '100%',
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
              backgroundColor: cfg.transparentBg ? '#10131B' : '#050608',
              backgroundImage: cfg.transparentBg
                ? 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)'
                : undefined,
              backgroundSize: '16px 16px',
              overflow: 'hidden',
            }}
          >
            {activeScene.isOverlay && activeScene.overlayComponent ? (
              <Player
                key={`${activeScene.id}-${cfg.transparentBg}-${cfg.textAnimation}-${cfg.textColor}-${cfg.accentColor}-${cfg.textDelayFrames}-${cfg.durationInFrames}-${cfg.showLogo}`}
                component={activeScene.overlayComponent}
                inputProps={{
                  projectTitle: cfg.headline,
                  architecturalPhase: cfg.subtitle,
                  locationYear: cfg.projectCode,
                  accentColor: cfg.accentColor,
                  primaryColor: cfg.textColor,
                  transparentBackground: cfg.transparentBg,
                  fontFamily: cfg.fontFamily,
                  headlineSize: cfg.headlineSize,
                  subtitleSize: cfg.subtitleSize,
                  letterSpacing: cfg.letterSpacing,
                  textOffsetX: cfg.textOffsetX,
                  textOffsetY: cfg.textOffsetY,
                  textAnimation: cfg.textAnimation,
                  textDelayFrames: cfg.textDelayFrames,
                  showLogo: cfg.showLogo,
                }}
                durationInFrames={cfg.durationInFrames}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{ width: '100%', height: '100%' }}
                controls
                alwaysShowControls
                showPlaybackRateControl
                allowFullscreen
                autoPlay
                loop
              />
            ) : (
              activeScene.archComponent && (
                <Player
                  key={`${activeScene.id}-${cfg.transparentBg}-${cfg.textAnimation}-${cfg.textColor}-${cfg.accentColor}-${cfg.textDelayFrames}-${cfg.durationInFrames}-${cfg.showLogo}`}
                  component={activeScene.archComponent}
                  inputProps={{
                    headline: cfg.headline,
                    subtitle: cfg.subtitle,
                    projectCode: cfg.projectCode,
                    scaleText: 'ÖLÇEK 1:50 // BİRİM: MM',
                    accentColor: cfg.accentColor,
                    primaryColor: cfg.textColor,
                    backgroundColor: cfg.transparentBg ? 'transparent' : '#0B0D10',
                    fontFamily: cfg.fontFamily,
                    headlineSize: cfg.headlineSize,
                    subtitleSize: cfg.subtitleSize,
                    letterSpacing: cfg.letterSpacing,
                    textOffsetX: cfg.textOffsetX,
                    textOffsetY: cfg.textOffsetY,
                    textAlign: cfg.textAlign,
                    textAnimation: cfg.textAnimation,
                    textDelayFrames: cfg.textDelayFrames,
                    showLogo: cfg.showLogo,
                  }}
                  durationInFrames={cfg.durationInFrames}
                  fps={30}
                  compositionWidth={1920}
                  compositionHeight={1080}
                  style={{ width: '100%', height: '100%' }}
                  controls
                  alwaysShowControls
                  showPlaybackRateControl
                  allowFullscreen
                  autoPlay
                  loop
                />
              )
            )}
          </div>

          {/* HIZLI KONTROL & İNDİRME DOCK'U (Videonun Tam Altında) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#0F121A',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '10px 16px',
              gap: 12,
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            }}
          >
            {/* Sol: Süre Hızlı Seçimi (3s, 5s, 7s, 10s) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 8px',
                borderRadius: 8,
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 600,
                  marginRight: 2,
                }}
              >
                ⏱ Süre:
              </span>
              {[
                { label: '3s', frames: 90 },
                { label: '5s', frames: 150 },
                { label: '7s', frames: 210 },
                { label: '10s', frames: 300 },
              ].map((d) => (
                <button
                  key={d.frames}
                  onClick={() => updateConfig({ durationInFrames: d.frames })}
                  style={{
                    padding: '4px 9px',
                    borderRadius: 6,
                    border:
                      cfg.durationInFrames === d.frames
                        ? '1px solid #3B82F6'
                        : '1px solid transparent',
                    backgroundColor:
                      cfg.durationInFrames === d.frames
                        ? 'rgba(59, 130, 246, 0.25)'
                        : 'transparent',
                    color:
                      cfg.durationInFrames === d.frames
                        ? '#93C5FD'
                        : 'rgba(255,255,255,0.65)',
                    fontSize: 11.5,
                    fontWeight: cfg.durationInFrames === d.frames ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Şeffaflık Düğmesi */}
            <button
              onClick={() => updateConfig({ transparentBg: !cfg.transparentBg })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 8,
                border: cfg.transparentBg
                  ? '1px solid #2ecc71'
                  : '1px solid rgba(255,255,255,0.18)',
                backgroundColor: cfg.transparentBg
                  ? 'rgba(46, 204, 113, 0.18)'
                  : 'rgba(255,255,255,0.05)',
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 14 }}>{cfg.transparentBg ? '🟢' : '⚪'}</span>
              <span>Şeffaf:</span>
              <strong
                style={{
                  color: cfg.transparentBg ? '#2ecc71' : 'rgba(255,255,255,0.5)',
                }}
              >
                {cfg.transparentBg ? 'AÇIK' : 'KAPALI'}
              </strong>
            </button>

            {/* Logo Görünürlüğü Düğmesi (Açık/Kapalı - Saf Metin Modu) */}
            <button
              onClick={() => updateConfig({ showLogo: !cfg.showLogo })}
              title={cfg.showLogo ? 'Logoyu Gizle (Sadece Metin Animasyonu Yap)' : 'Logoyu Göster'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 8,
                border: cfg.showLogo
                  ? '1px solid rgba(255,255,255,0.2)'
                  : '1px solid #F59E0B',
                backgroundColor: cfg.showLogo
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(245, 158, 11, 0.22)',
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 13 }}>{cfg.showLogo ? '🏛️' : '📝'}</span>
              <span>Logo:</span>
              <strong
                style={{
                  color: cfg.showLogo ? '#60A5FA' : '#FBBF24',
                }}
              >
                {cfg.showLogo ? 'AÇIK' : 'KAPALI (SAF METİN)'}
              </strong>
            </button>

            {/* Orta: Canlı Durum / Bildirim */}
            {renderStatus !== 'idle' ? (
              <div
                style={{
                  flex: 1,
                  padding: '7px 12px',
                  borderRadius: 8,
                  fontSize: 11.5,
                  fontWeight: 600,
                  textAlign: 'center',
                  backgroundColor:
                    renderStatus === 'rendering'
                      ? 'rgba(243, 156, 18, 0.15)'
                      : renderStatus === 'success'
                      ? 'rgba(46, 204, 113, 0.15)'
                      : 'rgba(231, 76, 60, 0.15)',
                  border:
                    renderStatus === 'rendering'
                      ? '1px solid #f39c12'
                      : renderStatus === 'success'
                      ? '1px solid #2ecc71'
                      : '1px solid #e74c3c',
                  color:
                    renderStatus === 'rendering'
                      ? '#f39c12'
                      : renderStatus === 'success'
                      ? '#2ecc71'
                      : '#e74c3c',
                }}
              >
                {renderStatus === 'rendering' ? '⏳ ' : renderStatus === 'success' ? '✓ ' : '⚠ '}
                {renderMessage}
              </div>
            ) : (
              <div
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 11.5,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                {cfg.transparentBg
                  ? '🟢 Şeffaf mod devrede. Videoyu transparan indirin:'
                  : 'Normal mod. Videoyu doğrudan bilgisayara indirin:'}
              </div>
            )}

            {/* Sağ: Büyük İndirme Düğmeleri */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                disabled={renderStatus === 'rendering'}
                onClick={() => handleRenderVideo('webm')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: '#2ecc71',
                  color: '#000000',
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                  opacity: renderStatus === 'rendering' ? 0.6 : 1,
                  boxShadow: '0 4px 14px rgba(46, 204, 113, 0.3)',
                }}
              >
                <span>⬇</span>
                <span>{cfg.transparentBg ? 'Şeffaf WebM İndir' : 'WebM İndir'}</span>
              </button>

              <button
                disabled={renderStatus === 'rendering'}
                onClick={() => handleRenderVideo('mp4')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: `1px solid ${cfg.accentColor}`,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                  opacity: renderStatus === 'rendering' ? 0.6 : 1,
                }}
              >
                <span>🎬</span>
                <span>MP4 İndir</span>
              </button>
            </div>
          </div>
        </main>

      {/* 3. SAĞ PANEL: Metin, Font, Boyut ve Konum Ayarları (Her Zaman Görünür) */}
      <aside
        style={{
          borderLeft: '1px solid rgba(255,255,255,0.09)',
          backgroundColor: '#0C0E13',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflowY: 'auto',
          padding: '18px 18px 28px',
          gap: 16,
        }}
      >
        {/* Üst Başlık & Sıfırla */}
        <div
          style={{
            paddingBottom: 10,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: '0.15em',
                color: cfg.accentColor,
              }}
            >
              KONTROL PANELİ
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 1 }}>
              {activeScene.title.split('//')[1]?.trim() ?? activeScene.title}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>
              Her animasyon kendi ayarını saklar
            </div>
          </div>
          <button
            onClick={() => updateConfig(DEFAULT_SCENE_CONFIG)}
            title="Bu sahnenin ayarlarını varsayılana sıfırla"
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: `1px solid ${cfg.accentColor}`,
              backgroundColor: 'rgba(224, 122, 95, 0.12)',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Sıfırla
          </button>
        </div>

        {/* 1. BÖLÜM: METİNLER VE RENKLERİ (Yan Yana & Kolay Erişilebilir) */}
        <div
          style={{
            padding: '12px',
            borderRadius: 10,
            backgroundColor: '#12151D',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#F4F1EA',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>✏️ 1. METİNLER VE RENKLERİ</span>
          </div>

          {/* 1A: Ana Metin & Rengi */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                Ana Metin
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: cfg.textColor, fontFamily: 'monospace' }}>
                  {cfg.textColor}
                </span>
                <input
                  type="color"
                  value={cfg.textColor}
                  onChange={(e) => updateConfig({ textColor: e.target.value })}
                  title="Ana Metin Rengi Seç"
                  style={{
                    width: 22,
                    height: 22,
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: 0,
                    backgroundColor: 'transparent',
                  }}
                />
              </div>
            </div>
            <input
              type="text"
              value={cfg.headline}
              onChange={(e) => updateConfig({ headline: e.target.value })}
              placeholder="Ana metin girin..."
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.16)',
                backgroundColor: '#1A1E29',
                color: cfg.textColor,
                fontSize: 12.5,
                fontWeight: 600,
              }}
            />
            {/* Hızlı Ana Renk Paleti */}
            <div style={{ display: 'flex', gap: 4, marginTop: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', marginRight: 2 }}>
                Renk:
              </span>
              {[
                { label: 'Beyaz', color: '#FFFFFF' },
                { label: 'Krem', color: '#F4F1EA' },
                { label: 'Altın', color: '#C89D66' },
                { label: 'Turkuaz', color: '#00E5FF' },
                { label: 'Koyu', color: '#1A1A1A' },
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => updateConfig({ textColor: c.color })}
                  title={`Ana metni ${c.label} yap`}
                  style={{
                    flex: 1,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: c.color,
                    border:
                      cfg.textColor.toLowerCase() === c.color.toLowerCase()
                        ? `2px solid ${cfg.accentColor}`
                        : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>

          {/* 1B: Alt Metin & Rengi */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                Alt Metin
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: cfg.accentColor, fontFamily: 'monospace' }}>
                  {cfg.accentColor}
                </span>
                <input
                  type="color"
                  value={cfg.accentColor}
                  onChange={(e) => updateConfig({ accentColor: e.target.value })}
                  title="Alt Metin / Vurgu Rengi Seç"
                  style={{
                    width: 22,
                    height: 22,
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    padding: 0,
                    backgroundColor: 'transparent',
                  }}
                />
              </div>
            </div>
            <input
              type="text"
              value={cfg.subtitle}
              onChange={(e) => updateConfig({ subtitle: e.target.value })}
              placeholder="Alt metin girin..."
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.16)',
                backgroundColor: '#1A1E29',
                color: cfg.accentColor,
                fontSize: 12,
              }}
            />
            {/* Hızlı Alt Metin Renk Paleti */}
            <div style={{ display: 'flex', gap: 4, marginTop: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', marginRight: 2 }}>
                Vurgu:
              </span>
              {[
                { label: 'Bakır', color: '#E07A5F' },
                { label: 'Altın', color: '#C89D66' },
                { label: 'Zümrüt', color: '#2ECC71' },
                { label: 'Mavi', color: '#3498DB' },
                { label: 'Beyaz', color: '#FFFFFF' },
              ].map((c) => (
                <button
                  key={c.color}
                  onClick={() => updateConfig({ accentColor: c.color })}
                  title={`Alt metni ${c.label} yap`}
                  style={{
                    flex: 1,
                    height: 20,
                    borderRadius: 4,
                    backgroundColor: c.color,
                    border:
                      cfg.accentColor.toLowerCase() === c.color.toLowerCase()
                        ? '2px solid #FFFFFF'
                        : '1px solid rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                  }}
                />
              ))}
            </div>
          </div>

          {/* 1C: Künye Metni */}
          <div>
            <label style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.55)', marginBottom: 3 }}>
              Künye Metni (Alt Köşe / Detay)
            </label>
            <input
              type="text"
              value={cfg.projectCode}
              onChange={(e) => updateConfig({ projectCode: e.target.value })}
              style={{
                width: '100%',
                padding: '7px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.12)',
                backgroundColor: '#1A1E29',
                color: '#FFFFFF',
                fontSize: 11.5,
              }}
            />
          </div>
        </div>

        {/* 2. BÖLÜM: ANİMASYON VE GECİKME ZAMANI */}
        <div
          style={{
            padding: '12px',
            borderRadius: 10,
            backgroundColor: '#12151D',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#F4F1EA',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            ⏱️ 2. SÜRE VE ZAMANLAMA
          </div>

          {/* 2A: Video Toplam Süresi (Duration) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                Video Toplam Süresi
              </label>
              <strong style={{ fontSize: 11, color: '#60A5FA', fontFamily: 'monospace' }}>
                {(cfg.durationInFrames / 30).toFixed(1)} sn ({cfg.durationInFrames} frame)
              </strong>
            </div>
            <input
              type="range"
              min={60}
              max={450}
              step={15}
              value={cfg.durationInFrames}
              onChange={(e) => updateConfig({ durationInFrames: Number(e.target.value) })}
              style={{ width: '100%', accentColor: '#3B82F6', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              {[
                { label: '3s', frames: 90 },
                { label: '5s (Normal)', frames: 150 },
                { label: '7s', frames: 210 },
                { label: '10s (Uzun)', frames: 300 },
                { label: '12s', frames: 360 },
              ].map((btn) => (
                <button
                  key={btn.frames}
                  onClick={() => updateConfig({ durationInFrames: btn.frames })}
                  style={{
                    flex: 1,
                    padding: '4px 2px',
                    borderRadius: 4,
                    border:
                      cfg.durationInFrames === btn.frames
                        ? '1px solid #3B82F6'
                        : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor:
                      cfg.durationInFrames === btn.frames
                        ? 'rgba(59, 130, 246, 0.25)'
                        : 'rgba(255,255,255,0.04)',
                    color: cfg.durationInFrames === btn.frames ? '#93C5FD' : '#FFFFFF',
                    fontSize: 9.5,
                    fontWeight: cfg.durationInFrames === btn.frames ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.42)', marginTop: 4 }}>
              * Hem önizleme oynatıcısının hem indirilen videonun toplam süresini belirler.
            </div>
          </div>

          {/* 2B: Metin Başlama Gecikmesi */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                Metin Başlama Gecikmesi
              </label>
              <strong style={{ fontSize: 11, color: cfg.accentColor, fontFamily: 'monospace' }}>
                {(cfg.textDelayFrames / 30).toFixed(1)} sn ({cfg.textDelayFrames} frame)
              </strong>
            </div>
            <input
              type="range"
              min={0}
              max={90}
              step={3}
              value={cfg.textDelayFrames}
              onChange={(e) => updateConfig({ textDelayFrames: Number(e.target.value) })}
              style={{ width: '100%', accentColor: cfg.accentColor, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
              {[
                { label: 'Hemen (0s)', frames: 0 },
                { label: '0.8s (24f)', frames: 24 },
                { label: '1.0s (30f)', frames: 30 },
                { label: '1.5s (45f)', frames: 45 },
              ].map((btn) => (
                <button
                  key={btn.frames}
                  onClick={() => updateConfig({ textDelayFrames: btn.frames })}
                  style={{
                    flex: 1,
                    padding: '4px 2px',
                    borderRadius: 4,
                    border:
                      cfg.textDelayFrames === btn.frames
                        ? `1px solid ${cfg.accentColor}`
                        : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor:
                      cfg.textDelayFrames === btn.frames
                        ? `${cfg.accentColor}25`
                        : 'rgba(255,255,255,0.04)',
                    color: '#FFFFFF',
                    fontSize: 10,
                    cursor: 'pointer',
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.42)', marginTop: 4 }}>
              * Logo animasyonu başladıktan ne kadar süre sonra metinlerin gireceğini belirler.
            </div>
          </div>

          {/* Alt Metin Animasyonu Seçici */}
          <div>
            <label style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 4 }}>
              Metin Animasyon Efekti
            </label>
            <select
              value={cfg.textAnimation}
              onChange={(e) =>
                updateConfig({ textAnimation: e.target.value as TextAnimationType })
              }
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 6,
                border: `1.5px solid ${cfg.accentColor}`,
                backgroundColor: '#1A1E29',
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {TEXT_ANIMATION_CHOICES.map((anim) => (
                <option key={anim.value} value={anim.value}>
                  {anim.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* LOGO GÖRÜNÜRLÜĞÜ & SAF METİN MODU */}
        <div
          style={{
            padding: '12px',
            borderRadius: 10,
            backgroundColor: cfg.showLogo ? '#12151D' : 'rgba(245, 158, 11, 0.12)',
            border: cfg.showLogo
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(245, 158, 11, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            transition: 'all 0.2s ease',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: cfg.showLogo ? '#FFFFFF' : '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>{cfg.showLogo ? '🏛️' : '📝'}</span>
              <span>LOGO GÖRÜNÜRLÜĞÜ</span>
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
              {cfg.showLogo
                ? 'Logo ve metin birlikte gösteriliyor.'
                : '⚡ Logo gizlendi: Yalnızca metin animasyonu aktif (Otomatik merkezli).'}
            </div>
          </div>
          <button
            onClick={() => updateConfig({ showLogo: !cfg.showLogo })}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: cfg.showLogo
                ? '1px solid rgba(255,255,255,0.2)'
                : '1px solid #F59E0B',
              backgroundColor: cfg.showLogo ? 'rgba(255,255,255,0.08)' : '#F59E0B',
              color: cfg.showLogo ? '#FFFFFF' : '#000000',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
            }}
          >
            {cfg.showLogo ? 'Logoyu Gizle' : '✓ Logo Kapalı'}
          </button>
        </div>

        {/* 3. BÖLÜM: YAZI TİPİ, BOYUT & KONUM */}
        <div
          style={{
            padding: '12px',
            borderRadius: 10,
            backgroundColor: '#12151D',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#F4F1EA',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            📐 3. YAZI TİPİ, BOYUT &amp; KONUM
          </div>

          {/* Font Seçici */}
          <div>
            <label style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
              Yazı Tipi (Font)
            </label>
            <select
              value={cfg.fontFamily}
              onChange={(e) =>
                updateConfig({
                  fontFamily: e.target.value as (typeof FONT_CHOICES)[number]['value'],
                })
              }
              style={{
                width: '100%',
                padding: '7px 10px',
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.18)',
                backgroundColor: '#1A1E29',
                color: '#FFFFFF',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {FONT_CHOICES.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ana Metin Boyutu */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
              <span>Ana Metin Boyutu</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="number"
                  min={8}
                  max={500}
                  value={cfg.headlineSize}
                  onChange={(e) =>
                    updateConfig({
                      headlineSize: Math.max(8, Math.min(500, Number(e.target.value) || 8)),
                    })
                  }
                  style={{
                    width: 52,
                    padding: '2px 4px',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: '#1E2330',
                    color: cfg.accentColor,
                    fontSize: 11,
                    fontWeight: 700,
                    textAlign: 'right',
                  }}
                />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>px</span>
              </div>
            </div>
            <input
              type="range"
              min={8}
              max={500}
              value={cfg.headlineSize}
              onChange={(e) => updateConfig({ headlineSize: Number(e.target.value) })}
              style={{ width: '100%', accentColor: cfg.accentColor, cursor: 'pointer' }}
            />
            {/* Hızlı Ana Boyut Butonları */}
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              {[
                { label: '32', size: 32 },
                { label: '64 (Def)', size: 64 },
                { label: '96', size: 96 },
                { label: '140', size: 140 },
                { label: '220 (Dev)', size: 220 },
                { label: '360', size: 360 },
              ].map((p) => (
                <button
                  key={p.size}
                  onClick={() => updateConfig({ headlineSize: p.size })}
                  style={{
                    flex: 1,
                    padding: '2px 0',
                    borderRadius: 4,
                    border:
                      cfg.headlineSize === p.size
                        ? `1px solid ${cfg.accentColor}`
                        : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor:
                      cfg.headlineSize === p.size ? `${cfg.accentColor}25` : 'rgba(255,255,255,0.03)',
                    color: '#FFFFFF',
                    fontSize: 9.5,
                    cursor: 'pointer',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Alt Metin Boyutu */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
              <span>Alt Metin Boyutu</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="number"
                  min={6}
                  max={250}
                  value={cfg.subtitleSize}
                  onChange={(e) =>
                    updateConfig({
                      subtitleSize: Math.max(6, Math.min(250, Number(e.target.value) || 6)),
                    })
                  }
                  style={{
                    width: 52,
                    padding: '2px 4px',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: '#1E2330',
                    color: cfg.accentColor,
                    fontSize: 11,
                    fontWeight: 700,
                    textAlign: 'right',
                  }}
                />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>px</span>
              </div>
            </div>
            <input
              type="range"
              min={6}
              max={250}
              value={cfg.subtitleSize}
              onChange={(e) => updateConfig({ subtitleSize: Number(e.target.value) })}
              style={{ width: '100%', accentColor: cfg.accentColor, cursor: 'pointer' }}
            />
            {/* Hızlı Alt Boyut Butonları */}
            <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
              {[
                { label: '20', size: 20 },
                { label: '40 (Def)', size: 40 },
                { label: '60', size: 60 },
                { label: '90', size: 90 },
                { label: '140', size: 140 },
              ].map((p) => (
                <button
                  key={p.size}
                  onClick={() => updateConfig({ subtitleSize: p.size })}
                  style={{
                    flex: 1,
                    padding: '2px 0',
                    borderRadius: 4,
                    border:
                      cfg.subtitleSize === p.size
                        ? `1px solid ${cfg.accentColor}`
                        : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor:
                      cfg.subtitleSize === p.size ? `${cfg.accentColor}25` : 'rgba(255,255,255,0.03)',
                    color: '#FFFFFF',
                    fontSize: 9.5,
                    cursor: 'pointer',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Harf Aralığı */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
              <span>Harf Aralığı</span>
              <strong style={{ color: cfg.accentColor }}>{cfg.letterSpacing.toFixed(2)} em</strong>
            </div>
            <input
              type="range"
              min={0}
              max={2.0}
              step={0.02}
              value={cfg.letterSpacing}
              onChange={(e) => updateConfig({ letterSpacing: Number(e.target.value) })}
              style={{ width: '100%', accentColor: cfg.accentColor, cursor: 'pointer' }}
            />
          </div>

          {/* Dikey Konum (Y) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
              <span>Dikey Konum (Y)</span>
              <strong style={{ color: cfg.accentColor }}>{cfg.textOffsetY} px</strong>
            </div>
            <input
              type="range"
              min={-700}
              max={500}
              step={5}
              value={cfg.textOffsetY}
              onChange={(e) => updateConfig({ textOffsetY: Number(e.target.value) })}
              style={{ width: '100%', accentColor: cfg.accentColor, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <button
                onClick={() => updateConfig({ textOffsetX: 0, textOffsetY: -380 })}
                style={{
                  flex: 1,
                  padding: '5px',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: 10.5,
                  cursor: 'pointer',
                }}
              >
                ↑ Üste Al
              </button>
              <button
                onClick={() => updateConfig({ textOffsetX: 0, textOffsetY: 0 })}
                style={{
                  flex: 1,
                  padding: '5px',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: 10.5,
                  cursor: 'pointer',
                }}
              >
                • Sıfırla / Merkez
              </button>
              <button
                onClick={() => updateConfig({ textOffsetX: 0, textOffsetY: 200 })}
                style={{
                  flex: 1,
                  padding: '5px',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: '#FFFFFF',
                  fontSize: 10.5,
                  cursor: 'pointer',
                }}
              >
                ↓ Alta Al
              </button>
            </div>
          </div>

          {/* Yatay Konum (X) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
              <span>Yatay Konum (X)</span>
              <strong style={{ color: cfg.accentColor }}>{cfg.textOffsetX} px</strong>
            </div>
            <input
              type="range"
              min={-500}
              max={500}
              step={5}
              value={cfg.textOffsetX}
              onChange={(e) => updateConfig({ textOffsetX: Number(e.target.value) })}
              style={{ width: '100%', accentColor: cfg.accentColor, cursor: 'pointer' }}
            />
          </div>

          {/* Hizalama */}
          <div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginBottom: 5 }}>
              Metin Hizalama
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {(
                [
                  ['left', 'Sola'],
                  ['center', 'Ortala'],
                  ['right', 'Sağa'],
                ] as const
              ).map(([al, lbl]) => (
                <button
                  key={al}
                  onClick={() => updateConfig({ textAlign: al })}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: 4,
                    border:
                      cfg.textAlign === al
                        ? `1px solid ${cfg.accentColor}`
                        : '1px solid rgba(255,255,255,0.12)',
                    backgroundColor:
                      cfg.textAlign === al
                        ? `${cfg.accentColor}28`
                        : 'rgba(255,255,255,0.04)',
                    color: '#FFFFFF',
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. BÖLÜM: VİDEO DIŞA AKTARMA VE İNDİRME */}
        <div
          style={{
            padding: '14px',
            borderRadius: 12,
            backgroundColor: '#12151D',
            border: '1px solid rgba(46, 204, 113, 0.35)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#2ecc71',
                textTransform: 'uppercase',
              }}
            >
              📥 4. VİDEO DIŞA AKTARMA
            </span>
          </div>

          {/* Şeffaflık Aç/Kapa Düğmesi */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: 8,
              backgroundColor: cfg.transparentBg
                ? 'rgba(46, 204, 113, 0.15)'
                : 'rgba(255,255,255,0.04)',
              border: cfg.transparentBg
                ? '1px solid rgba(46, 204, 113, 0.4)'
                : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>
                Şeffaf Arka Plan
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
                {cfg.transparentBg ? 'Alpha kanallı (arka plansız)' : 'Normal siyah zemin'}
              </div>
            </div>
            <button
              onClick={() => updateConfig({ transparentBg: !cfg.transparentBg })}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: 'none',
                backgroundColor: cfg.transparentBg ? '#2ecc71' : 'rgba(255,255,255,0.15)',
                color: cfg.transparentBg ? '#000000' : '#FFFFFF',
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {cfg.transparentBg ? 'AÇIK 🟢' : 'KAPALI ⚪'}
            </button>
          </div>

          {/* İndirme Butonları */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              disabled={renderStatus === 'rendering'}
              onClick={() => handleRenderVideo('webm')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '10px',
                borderRadius: 8,
                border: 'none',
                backgroundColor: '#2ecc71',
                color: '#000000',
                fontSize: 12.5,
                fontWeight: 700,
                cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                opacity: renderStatus === 'rendering' ? 0.6 : 1,
              }}
            >
              <span>⬇</span>
              <span>{cfg.transparentBg ? 'Şeffaf WebM İndir' : 'WebM İndir'}</span>
            </button>

            <button
              disabled={renderStatus === 'rendering'}
              onClick={() => handleRenderVideo('mp4')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '9px',
                borderRadius: 8,
                border: `1px solid ${cfg.accentColor}`,
                backgroundColor: `${cfg.accentColor}18`,
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: 600,
                cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                opacity: renderStatus === 'rendering' ? 0.6 : 1,
              }}
            >
              <span>🎬</span>
              <span>Full HD MP4 İndir</span>
            </button>

            <button
              disabled={renderStatus === 'rendering'}
              onClick={() => handleRenderVideo('mov')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '8px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#FFFFFF',
                fontSize: 11.5,
                fontWeight: 600,
                cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                opacity: renderStatus === 'rendering' ? 0.6 : 1,
              }}
            >
              <span>🍎</span>
              <span>Apple ProRes 4444 (.mov) İndir</span>
            </button>
          </div>

          {/* Durum Mesajı */}
          {renderStatus !== 'idle' && (
            <div
              style={{
                fontSize: 11,
                padding: '7px 9px',
                borderRadius: 6,
                backgroundColor:
                  renderStatus === 'error'
                    ? 'rgba(231,76,60,0.15)'
                    : renderStatus === 'success'
                    ? 'rgba(46,204,113,0.15)'
                    : 'rgba(241,196,15,0.15)',
                color:
                  renderStatus === 'error'
                    ? '#e74c3c'
                    : renderStatus === 'success'
                    ? '#2ecc71'
                    : '#f1c40f',
                border: `1px solid ${
                  renderStatus === 'error'
                    ? 'rgba(231,76,60,0.3)'
                    : renderStatus === 'success'
                    ? 'rgba(46,204,113,0.3)'
                    : 'rgba(241,196,15,0.3)'
                }`,
                textAlign: 'center',
              }}
            >
              {renderStatus === 'rendering' ? '⏳ ' : renderStatus === 'success' ? '✓ ' : '⚠ '}
              {renderMessage}
            </div>
          )}
        </div>
      </aside>
      </div>
    </div>
  );
};
