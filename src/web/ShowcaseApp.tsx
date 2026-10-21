import React, { useState, useRef } from 'react';
import { Player, PlayerRef } from '@remotion/player';
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
  AspectRatioType,
  ASPECT_RATIO_OPTIONS,
  EXIT_ANIMATION_OPTIONS,
  ExitAnimationType,
  EXIT_TARGET_OPTIONS,
  ExitTargetType,
  LowerThirdProps,
  TextAnimationType,
} from '../types/schema';
import { SceneExitProvider, SceneExitWrapper } from '../components/SceneExitWrapper';

export const EXIT_ANIMATION_CHOICES: { value: ExitAnimationType; label: string; desc: string; icon: string }[] = [
  { value: 'none', label: 'Sabit Kal (Kaybolma Yok)', desc: 'Animasyon ekranda kalır, kaybolmaz', icon: '⏸️' },
  { value: 'fade-out', label: 'Zarif Fade-Out', desc: 'Akıcı şeffaflaşarak erime', icon: '🌫️' },
  { value: 'reverse-spring', label: 'Ters Elastik Yay', desc: 'Geriye yaylanarak elastik büzülme', icon: '🔄' },
  { value: 'slide-down', label: 'Aşağı Süzülerek Kaybol', desc: 'Aşağıya doğru kayarak şeffaflaşma', icon: '⬇️' },
  { value: 'slide-up', label: 'Yukarı Uçarak Kaybol', desc: 'Yukarıya doğru uçarak şeffaflaşma', icon: '⬆️' },
  { value: 'zoom-out', label: 'Geriye Çekilerek Küçül', desc: 'Kameradan uzaklaşarak ufukta kaybolma', icon: '🔍' },
  { value: 'zoom-in', label: 'Yaklaşarak Kaybol', desc: 'Kameraya yaklaşarak şeffaflaşma', icon: '🔎' },
  { value: 'blur-dissolve', label: 'Bulanıklaşarak Dağılma', desc: 'Duman gibi optik bulanıklıkla erime', icon: '💨' },
  { value: 'wipe-curtain', label: 'Mimari Perde Kapanışı', desc: 'İki yandan merkeze kapanan shutter', icon: '🚪' },
  { value: 'glitch-fade', label: 'Glitch Sinyal Kesilmesi', desc: 'Kuantum sinyal titremesiyle sonlanma', icon: '⚡' },
];

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
  tagline: string;
  projectCode: string;
  accentColor: string;
  textColor: string;
  taglineColor: string;
  fontFamily: (typeof FONT_CHOICES)[number]['value'];
  textAnimation: TextAnimationType;
  headlineSize: number;
  subtitleSize: number;
  taglineSize: number;
  letterSpacing: number;
  textOffsetX: number;
  textOffsetY: number;
  textAlign: 'left' | 'center' | 'right';
  textDelayFrames: number;
  line1Delay: number;
  line2Delay: number;
  line3Delay: number;
  durationInFrames: number;
  playbackSpeed: number;
  transparentBg: boolean;
  showLogo: boolean;
  aspectRatio: AspectRatioType;
  exitAnimation: ExitAnimationType;
  exitTarget: ExitTargetType;
  exitDurationFrames: number;
  exitStartFrame?: number;
  exitTimingMode: 'before-end' | 'after-appear' | 'custom';
  exitDelayFrames: number;
}

const DEFAULT_SCENE_CONFIG: SceneCustomConfig = {
  headline: 'HİS',
  subtitle: '2004',
  tagline: '',
  projectCode: '',
  accentColor: '#FFFFFF',
  textColor: '#FFFFFF',
  taglineColor: '#C89D66',
  fontFamily: "'Inter', sans-serif",
  textAnimation: 'char-wave',
  headlineSize: 64,
  subtitleSize: 40,
  taglineSize: 28,
  letterSpacing: 0.25,
  textOffsetX: 0,
  textOffsetY: 0,
  textAlign: 'left',
  textDelayFrames: 20,
  line1Delay: 20,
  line2Delay: 32,
  line3Delay: 44,
  durationInFrames: 150,
  playbackSpeed: 1.0,
  transparentBg: true,
  showLogo: true,
  aspectRatio: '16:9',
  exitAnimation: 'none',
  exitTarget: 'both',
  exitDurationFrames: 25,
  exitTimingMode: 'before-end',
  exitDelayFrames: 30,
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// Modern Studio SVG Icons (Zero-dependency, crisp 2026 geometry)
const SvgIcons = {
  EyeOff: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  Search: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Type: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  Clock: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Zap: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Gauge: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 12 16 8" />
    </svg>
  ),
  Sliders: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  Download: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Film: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
  ),
  Sparkles: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
    </svg>
  ),
  Layers: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  RotateCcw: ({ size = 13, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  ),
  X: ({ size = 12, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  AlignLeft: ({ size = 13, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
    </svg>
  ),
  AlignCenter: ({ size = 13, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="10" x2="6" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="18" y1="18" x2="6" y2="18" />
    </svg>
  ),
  AlignRight: ({ size = 13, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="21" y1="10" x2="7" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="7" y2="18" />
    </svg>
  ),
  Activity: ({ size = 14, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
};

const sceneExitWrappedCache = new WeakMap<React.ComponentType<any>, React.ComponentType<any>>();

function getOrCreateExitWrapped(Comp: React.ComponentType<any>): React.ComponentType<any> {
  let existing = sceneExitWrappedCache.get(Comp);
  if (!existing) {
    existing = (props: any) => (
      <SceneExitProvider
        exitAnimation={props.exitAnimation}
        exitTarget={props.exitTarget}
        exitDurationFrames={props.exitDurationFrames}
        exitStartFrame={props.exitStartFrame}
        exitTimingMode={props.exitTimingMode}
        exitDelayFrames={props.exitDelayFrames}
      >
        <SceneExitWrapper
          target="scene"
          exitAnimation={props.exitAnimation}
          exitTarget={props.exitTarget}
          exitDurationFrames={props.exitDurationFrames}
          exitStartFrame={props.exitStartFrame}
          exitTimingMode={props.exitTimingMode}
          exitDelayFrames={props.exitDelayFrames}
          style={{ width: '100%', height: '100%', position: 'relative' }}
        >
          <Comp {...props} />
        </SceneExitWrapper>
      </SceneExitProvider>
    );
    sceneExitWrappedCache.set(Comp, existing);
  }
  return existing;
}

export const ShowcaseApp: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedId, setSelectedId] = useState<string>('26-Directional-Letter-Expand');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectorTab, setInspectorTab] = useState<'content' | 'timing' | 'export'>('content');

  // Her sahnede ortak stüdyo ayarları (metinler, logo durumu, animasyon, font, renkler)
  const [studioConfig, setStudioConfig] = useState<SceneCustomConfig>(DEFAULT_SCENE_CONFIG);
  const [sceneConfigs, setSceneConfigs] = useState<Record<string, Partial<SceneCustomConfig>>>({});

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

  const sceneCustom = sceneConfigs[selectedId];
  const cfg: SceneCustomConfig = {
    ...DEFAULT_SCENE_CONFIG,
    ...studioConfig,
    ...sceneCustom,
  };

  const updateConfig = (patch: Partial<SceneCustomConfig>) => {
    // 1. Genel stüdyo durumunu güncelle: Tüm sahneler arasında metin, logo, font vb. korunur
    setStudioConfig((prev) => ({
      ...prev,
      ...patch,
    }));
    // 2. Sahneye özel durum da saklanır
    setSceneConfigs((prev) => ({
      ...prev,
      [selectedId]: {
        ...(prev[selectedId] ?? {}),
        ...patch,
      },
    }));
  };

  const [renderStatus, setRenderStatus] = useState<
    'idle' | 'rendering' | 'success' | 'error'
  >('idle');
  const [renderMessage, setRenderMessage] = useState<string>('');
  const [renderProgress, setRenderProgress] = useState<number>(0);

  interface NativeSaveHandle {
    createWritable: () => Promise<WritableStream & {
      write?: (chunk: unknown) => Promise<void>;
      close?: () => Promise<void>;
    }>;
  }

  const recordInBrowser = async (
    suggestedFilename: string,
    fileHandle: NativeSaveHandle | null
  ) => {
    const player = playerRef.current;
    if (!player) {
      throw new Error('Oynatıcı bulunamadı');
    }

    const container = player.getContainerNode();
    if (!container) {
      throw new Error('Oynatıcı DOM alanı bulunamadı');
    }

    setRenderStatus('rendering');
    setRenderProgress(0);
    setRenderMessage('Tarayıcı içi video motoru hazırlanıyor...');

    const width = cfg.aspectRatio === '9:16' ? 1080 : cfg.aspectRatio === '1:1' ? 1080 : 1920;
    const height = cfg.aspectRatio === '9:16' ? 1920 : cfg.aspectRatio === '1:1' ? 1080 : 1080;
    const totalFrames = cfg.durationInFrames;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas render katmanı oluşturulamadı');
    }

    const stream = canvas.captureStream(30);
    let mimeType = 'video/webm;codecs=vp9';
    if (typeof MediaRecorder !== 'undefined') {
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp8')
          ? 'video/webm;codecs=vp8'
          : 'video/webm';
      }
    }

    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 16000000,
    });

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    const initialFrame = player.getCurrentFrame();
    player.pause();
    recorder.start(100);

    try {
      for (let f = 0; f < totalFrames; f++) {
        player.seekTo(f);
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            setTimeout(resolve, 34);
          });
        });

        ctx.clearRect(0, 0, width, height);
        if (!cfg.transparentBg) {
          ctx.fillStyle = '#0B0D10';
          ctx.fillRect(0, 0, width, height);
        }

        // 1. SVG Vektörlerini Çiz
        const svgEl = container.querySelector('svg');
        if (svgEl) {
          const clone = svgEl.cloneNode(true) as SVGSVGElement;
          clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
          clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
          clone.setAttribute('width', String(width));
          clone.setAttribute('height', String(height));

          const svgString = new XMLSerializer().serializeToString(clone);
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const svgUrl = URL.createObjectURL(svgBlob);
          const img = new Image();

          await new Promise<void>((resolve) => {
            img.onload = () => {
              ctx.drawImage(img, 0, 0, width, height);
              URL.revokeObjectURL(svgUrl);
              resolve();
            };
            img.onerror = () => {
              URL.revokeObjectURL(svgUrl);
              resolve();
            };
            img.src = svgUrl;
          });
        }

        // 2. Metin Katmanlarını Çiz (Canvas 2D - Güvenli & Net)
        const textSpans = container.querySelectorAll('span');
        if (textSpans.length > 0) {
          const contRect = container.getBoundingClientRect();
          const scaleX = width / (contRect.width || 1);
          const scaleY = height / (contRect.height || 1);

          ctx.save();
          for (const span of Array.from(textSpans)) {
            const text = span.textContent?.trim();
            if (!text) continue;
            const sRect = span.getBoundingClientRect();
            const style = window.getComputedStyle(span);
            const x = (sRect.left - contRect.left) * scaleX;
            const y = (sRect.bottom - contRect.top) * scaleY;
            const fontSize = parseFloat(style.fontSize) * scaleY;

            ctx.font = `${style.fontWeight || '600'} ${fontSize}px ${style.fontFamily || cfg.fontFamily}`;
            ctx.fillStyle = style.color || cfg.textColor;
            ctx.globalAlpha = parseFloat(style.opacity || '1');
            ctx.fillText(text, x, y);
          }
          ctx.restore();
        }

        const pct = Math.round(((f + 1) / totalFrames) * 100);
        setRenderProgress(pct);
        setRenderMessage(`Tarayıcıda işleniyor: %${pct} (${f + 1}/${totalFrames})`);
      }

      await new Promise<void>((resolve) => {
        recorder.onstop = () => resolve();
        recorder.stop();
      });

      const finalBlob = new Blob(chunks, { type: mimeType });
      const outFilename = suggestedFilename.replace(/\.mp4$/i, '.webm');

      if (fileHandle && typeof fileHandle.createWritable === 'function') {
        const writable = await fileHandle.createWritable();
        if (typeof writable.write === 'function') {
          await writable.write(finalBlob);
        }
        if (typeof writable.close === 'function') {
          await writable.close();
        }
        setRenderStatus('success');
        setRenderProgress(100);
        setRenderMessage(`✓ Video seçtiğiniz konuma kaydedildi! (%100)`);
      } else {
        const downloadUrl = URL.createObjectURL(finalBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = outFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setRenderStatus('success');
        setRenderProgress(100);
        setRenderMessage(`✓ Video tarayıcıda hazırlandı ve indirildi: ${outFilename}`);
      }
    } finally {
      player.seekTo(initialFrame);
      setTimeout(() => {
        setRenderStatus('idle');
        setRenderMessage('');
        setRenderProgress(0);
      }, 6000);
    }
  };

  const handleRenderVideo = async (format: 'webm' | 'mp4' | 'mov') => {
    if (renderStatus === 'rendering') return;

    const isTrans = (format === 'mov' || format === 'webm') ? cfg.transparentBg : false;
    const ext = format === 'webm' ? 'webm' : format === 'mov' ? 'mov' : 'mp4';
    const safeScene = String(activeScene.id).replace(/[^a-zA-Z0-9_-]/g, '');
    const ratioTag = cfg.aspectRatio === '9:16' ? 'dikey-9x16-' : cfg.aspectRatio === '1:1' ? 'kare-1x1-' : 'yatay-16x9-';
    const suggestedFilename = `${safeScene}-${ratioTag}${isTrans ? 'seffaf-' : ''}${Date.now()}.${ext}`;

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
      setRenderProgress(0);

      const isLocalHost = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.port === '5173'
      );

      // Canlı ortamda (Vercel vb.) doğrudan tarayıcı içi render motoruna geç, /api/render çağrısı yapma
      if (!isLocalHost) {
        console.log('[Render] Canlı statik ortam (Vercel): Doğrudan tarayıcı içi render motoru başlatılıyor...');
        await recordInBrowser(suggestedFilename, fileHandle);
        return;
      }

      setRenderMessage(
        fileHandle
          ? `⏳ Video işleniyor ve seçtiğiniz klasöre kaydedilecek...`
          : format === 'mov'
          ? (isTrans ? '🎬 Şeffaf Apple ProRes 4444 işleniyor...' : '🎬 Apple ProRes 4444 (.mov) işleniyor...')
          : format === 'webm'
          ? (isTrans ? '🟢 Şeffaf WebM işleniyor...' : 'WebM video işleniyor...')
          : (cfg.transparentBg ? 'ℹ️ MP4 işleniyor (Opak siyah zemin)...' : 'MP4 video işleniyor...')
      );

      let res: Response | null = null;
      try {
        res = await fetch('/api/render', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
          },
          body: JSON.stringify({
            sceneId: activeScene.id,
            transparent: isTrans,
            headline: cfg.headline,
            subtitle: cfg.subtitle,
            tagline: cfg.tagline,
            projectCode: cfg.projectCode,
            accentColor: cfg.accentColor,
            primaryColor: cfg.textColor,
            taglineColor: cfg.taglineColor,
            fontFamily: cfg.fontFamily,
            headlineSize: cfg.headlineSize,
            subtitleSize: cfg.subtitleSize,
            taglineSize: cfg.taglineSize,
            letterSpacing: cfg.letterSpacing,
            textOffsetX: cfg.textOffsetX,
            textOffsetY: cfg.textOffsetY,
            textAlign: cfg.textAlign,
            textAnimation: cfg.textAnimation,
            textDelayFrames: cfg.textDelayFrames,
            line1Delay: cfg.line1Delay,
            line2Delay: cfg.line2Delay,
            line3Delay: cfg.line3Delay,
            durationInFrames: cfg.durationInFrames,
            playbackSpeed: cfg.playbackSpeed ?? 1.0,
            showLogo: cfg.showLogo,
            aspectRatio: cfg.aspectRatio,
            exitAnimation: cfg.exitAnimation,
            exitTarget: cfg.exitTarget,
            exitDurationFrames: cfg.exitDurationFrames,
            exitStartFrame: cfg.exitStartFrame,
            exitTimingMode: cfg.exitTimingMode,
            exitDelayFrames: cfg.exitDelayFrames,
            format,
          }),
        });
      } catch (netErr: unknown) {
        console.warn('[Render] Sunucu API erişilemedi, tarayıcı render motoruna geçiliyor:', netErr);
      }

      if (!res || !res.ok) {
        if (!res || res.status === 404 || res.status === 502 || res.status === 503) {
          console.log('[Render] Sunucu bulunamadı, tarayıcı render motoru devreye giriyor...');
          await recordInBrowser(suggestedFilename, fileHandle);
          return;
        }
        throw new Error(`Render sunucu hatası (${res.status})`);
      }

      interface RenderDonePayload {
        success?: boolean;
        downloadUrl?: string;
        filename?: string;
        error?: string;
      }

      let donePayload: RenderDonePayload | null = null;
      const reader = res.body?.getReader();

      if (reader) {
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop() ?? '';

          for (const part of parts) {
            const trimmedPart = part.trim();
            if (!trimmedPart) continue;

            let eventName = 'message';
            let dataStr = '';

            const lines = trimmedPart.split('\n');
            for (const line of lines) {
              if (line.startsWith('event:')) {
                eventName = line.slice(6).trim();
              } else if (line.startsWith('data:')) {
                dataStr = line.slice(5).trim();
              }
            }

            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr) as {
                percent?: number;
                message?: string;
                success?: boolean;
                downloadUrl?: string;
                filename?: string;
                error?: string;
              };

              if (eventName === 'progress') {
                if (typeof data.percent === 'number') {
                  setRenderProgress(data.percent);
                }
                if (data.message) {
                  setRenderMessage(data.message);
                }
              } else if (eventName === 'done') {
                setRenderProgress(100);
                donePayload = data;
              } else if (eventName === 'error') {
                throw new Error(data.error || 'Render hatası');
              }
            } catch (pErr: unknown) {
              if (pErr instanceof Error && pErr.message.includes('Render hatası')) {
                throw pErr;
              }
            }
          }
        }
      } else {
        donePayload = (await res.json()) as RenderDonePayload;
      }

      if (!donePayload || !donePayload.success || !donePayload.downloadUrl) {
        throw new Error(donePayload?.error || 'Video oluşturulamadı');
      }

      const finalDownloadUrl = donePayload.downloadUrl;
      const finalFilename = donePayload.filename ?? 'video';

      // 2. Seçilen konuma doğrudan kaydet
      if (fileHandle && typeof fileHandle.createWritable === 'function') {
        const fileRes = await fetch(finalDownloadUrl);
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
        setRenderProgress(100);
        setRenderMessage(`✓ Video seçtiğiniz konuma kaydedildi!`);
      } else {
        // Fallback: Standart tarayıcı indirmesi
        const link = document.createElement('a');
        link.href = finalDownloadUrl;
        link.download = finalFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setRenderStatus('success');
        setRenderProgress(100);
        setRenderMessage(`✓ Video hazır! İndiriliyor: ${finalFilename}`);
      }

      setTimeout(() => {
        setRenderStatus('idle');
        setRenderMessage('');
        setRenderProgress(0);
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
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: 'rgba(10, 12, 18, 0.95)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Logo Mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 8px',
              borderRadius: 8,
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(99, 102, 241, 0.5)',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 900, color: '#FFFFFF' }}>B</span>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: '0.12em',
                color: '#FFFFFF',
              }}
            >
              BİRİM STUDIO
            </span>
            <span
              style={{
                fontSize: 9,
                padding: '2px 5px',
                borderRadius: 4,
                backgroundColor: 'rgba(99, 102, 241, 0.15)',
                color: '#818CF8',
                fontWeight: 700,
                border: '1px solid rgba(99, 102, 241, 0.3)',
                letterSpacing: '0.04em',
              }}
            >
              PRO v3.0
            </span>
          </div>

          <div style={{ width: 1, height: 16, backgroundColor: 'rgba(255,255,255,0.1)' }} />

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Katalog</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{activeScene.title}</span>
          </div>
        </div>

        {/* Sağ Status Bilgileri */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Canlı Motor Göstergesi */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 10.5,
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 6,
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              color: '#34D399',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 8px #10B981',
              }}
            />
            <span>STUDIO ENGINE</span>
          </div>

          {/* Format / En-Boy Rozeti */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              padding: '4px 9px',
              borderRadius: 6,
              backgroundColor:
                cfg.aspectRatio === '9:16'
                  ? 'rgba(236, 72, 153, 0.15)'
                  : cfg.aspectRatio === '1:1'
                  ? 'rgba(245, 158, 11, 0.15)'
                  : 'rgba(59, 130, 246, 0.15)',
              border:
                cfg.aspectRatio === '9:16'
                  ? '1px solid rgba(236, 72, 153, 0.35)'
                  : cfg.aspectRatio === '1:1'
                  ? '1px solid rgba(245, 158, 11, 0.35)'
                  : '1px solid rgba(59, 130, 246, 0.3)',
              color:
                cfg.aspectRatio === '9:16'
                  ? '#F472B6'
                  : cfg.aspectRatio === '1:1'
                  ? '#FBBF24'
                  : '#60A5FA',
              fontWeight: 700,
            }}
          >
            {cfg.aspectRatio === '9:16'
              ? '📱 9:16 DİKEY'
              : cfg.aspectRatio === '1:1'
              ? '⏹️ 1:1 KARE'
              : '🖥️ 16:9 YATAY'}
          </div>

          {/* Özellikler Rozeti */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              padding: '4px 9px',
              borderRadius: 6,
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            {(cfg.durationInFrames / 30).toFixed(1)}s • ⚡ {(cfg.playbackSpeed ?? 1.0).toFixed(2)}x • 30 FPS •{' '}
            {cfg.aspectRatio === '9:16' ? '1080×1920' : cfg.aspectRatio === '1:1' ? '1080×1080' : '1920×1080'}
          </div>

          {/* Şeffaflık Rozeti */}
          <div
            style={{
              fontSize: 10.5,
              padding: '4px 9px',
              borderRadius: 6,
              backgroundColor: cfg.transparentBg ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255,0.04)',
              border: cfg.transparentBg ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(255,255,255,0.08)',
              color: cfg.transparentBg ? '#A5B4FC' : 'rgba(255,255,255,0.5)',
              fontWeight: 600,
            }}
          >
            {cfg.transparentBg ? 'ALPHA AKTİF' : 'NORMAL'}
          </div>
        </div>
      </header>

      {/* ANA ÇALIŞMA ALANI (3 SÜTUN) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '310px 1fr 360px',
          gridTemplateRows: '100%',
          flex: 1,
          minHeight: 0,
          height: 'calc(100vh - 48px)',
          overflow: 'hidden',
        }}
      >
        {/* 1. SOL PANEL: Modern Sahne Gezgini */}
        <aside
          style={{
            borderRight: '1px solid rgba(255,255,255,0.06)',
            backgroundColor: '#090B10',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Arama ve Filtreleme */}
          <div
            style={{
              padding: '12px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {/* Arama Girişi */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  position: 'absolute',
                  left: 10,
                  color: 'rgba(255,255,255,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <SvgIcons.Search width={13} height={13} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sahne veya animasyon ara..."
                style={{
                  width: '100%',
                  padding: '7px 28px 7px 30px',
                  borderRadius: 7,
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: '#11141D',
                  color: '#FFFFFF',
                  fontSize: 11.5,
                  outline: 'none',
                  transition: 'border-color 0.15s ease',
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
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SvgIcons.X width={12} height={12} />
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
                      padding: '4px 7px',
                      borderRadius: 5,
                      border: active
                        ? '1px solid rgba(99, 102, 241, 0.5)'
                        : '1px solid rgba(255,255,255,0.06)',
                      backgroundColor: active
                        ? 'rgba(99, 102, 241, 0.18)'
                        : 'rgba(255,255,255,0.02)',
                      color: active ? '#A5B4FC' : 'rgba(255,255,255,0.55)',
                      fontSize: 10,
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat.label.split('(')[0]?.trim()} ({count})
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
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
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
                    padding: '8px 10px',
                    borderRadius: 7,
                    border: isSelected
                      ? '1px solid rgba(99, 102, 241, 0.4)'
                      : '1px solid rgba(255,255,255,0.04)',
                    borderLeft: isSelected
                      ? '3px solid #6366F1'
                      : '3px solid transparent',
                    backgroundColor: isSelected
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(255,255,255,0.015)',
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 600,
                        color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.75)',
                      }}
                    >
                      {scene.title.split('//')[1]?.trim() ?? scene.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        padding: '1px 4px',
                        borderRadius: 3,
                        backgroundColor: isSelected
                          ? 'rgba(99, 102, 241, 0.3)'
                          : 'rgba(255,255,255,0.05)',
                        color: isSelected ? '#A5B4FC' : 'rgba(255,255,255,0.4)',
                        fontWeight: 600,
                      }}
                    >
                      #{sceneNum}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.3,
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
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            height: '100%',
            minHeight: 0,
            overflow: 'hidden',
            backgroundColor: '#07080C',
          }}
        >
          {/* Sahne Başlık Çubuğu */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
              padding: '2px 4px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    color: '#818CF8',
                  }}
                >
                  <SvgIcons.Film size={13} />
                </span>
                <h2 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#F1F5F9', letterSpacing: '-0.01em' }}>
                  {activeScene.title}
                </h2>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 5,
                    backgroundColor: activeScene.isOverlay ? 'rgba(16, 185, 129, 0.14)' : 'rgba(99, 102, 241, 0.14)',
                    color: activeScene.isOverlay ? '#34D399' : '#A5B4FC',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  {activeScene.category}
                </span>
              </div>
              <p
                style={{
                  fontSize: 11.5,
                  color: 'rgba(255,255,255,0.45)',
                  margin: '3px 0 0 30px',
                }}
              >
                {activeScene.desc}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  padding: '5px 12px',
                  borderRadius: 8,
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }} />
                {cfg.aspectRatio === '9:16' ? '1080×1920 (9:16 Dikey)' : cfg.aspectRatio === '1:1' ? '1080×1080 (1:1 Kare)' : '1920×1080 (16:9 Yatay)'} • 30 FPS • {(cfg.durationInFrames / 30).toFixed(1)}s • ⚡ {(cfg.playbackSpeed ?? 1.0).toFixed(2)}x
              </div>
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
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 60px -12px rgba(0,0,0,0.85)',
              backgroundColor: cfg.transparentBg ? '#0B0D13' : '#040507',
              backgroundImage: cfg.transparentBg
                ? 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)'
                : undefined,
              backgroundSize: '20px 20px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {activeScene.isOverlay && activeScene.overlayComponent ? (
              <Player
                ref={playerRef}
                acknowledgeRemotionLicense
                key={`${activeScene.id}-${cfg.aspectRatio}`}
                component={getOrCreateExitWrapped(activeScene.overlayComponent)}
                inputProps={{
                  projectTitle: cfg.headline,
                  architecturalPhase: cfg.subtitle,
                  tagline: cfg.tagline,
                  locationYear: cfg.projectCode,
                  accentColor: cfg.accentColor,
                  primaryColor: cfg.textColor,
                  taglineColor: cfg.taglineColor,
                  transparentBackground: cfg.transparentBg,
                  fontFamily: cfg.fontFamily,
                  headlineSize: cfg.headlineSize,
                  subtitleSize: cfg.subtitleSize,
                  taglineSize: cfg.taglineSize,
                  letterSpacing: cfg.letterSpacing,
                  textOffsetX: cfg.textOffsetX,
                  textOffsetY: cfg.textOffsetY,
                  textAnimation: cfg.textAnimation,
                  textDelayFrames: cfg.line1Delay,
                  line1Delay: cfg.line1Delay,
                  line2Delay: cfg.line2Delay,
                  line3Delay: cfg.line3Delay,
                  showLogo: cfg.showLogo,
                  aspectRatio: cfg.aspectRatio,
                  playbackSpeed: cfg.playbackSpeed ?? 1.0,
                  durationInFrames: cfg.durationInFrames,
                  exitAnimation: cfg.exitAnimation,
                  exitTarget: cfg.exitTarget,
                  exitDurationFrames: cfg.exitDurationFrames,
                  exitStartFrame: cfg.exitStartFrame,
                  exitTimingMode: cfg.exitTimingMode,
                  exitDelayFrames: cfg.exitDelayFrames,
                }}
                durationInFrames={cfg.durationInFrames}
                fps={30}
                playbackRate={cfg.playbackSpeed ?? 1.0}
                compositionWidth={cfg.aspectRatio === '9:16' ? 1080 : cfg.aspectRatio === '1:1' ? 1080 : 1920}
                compositionHeight={cfg.aspectRatio === '9:16' ? 1920 : cfg.aspectRatio === '1:1' ? 1080 : 1080}
                style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
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
                  ref={playerRef}
                  acknowledgeRemotionLicense
                  key={`${activeScene.id}-${cfg.aspectRatio}`}
                  component={getOrCreateExitWrapped(activeScene.archComponent)}
                  inputProps={{
                    headline: cfg.headline,
                    subtitle: cfg.subtitle,
                    tagline: cfg.tagline,
                    projectCode: cfg.projectCode,
                    scaleText: 'ÖLÇEK 1:50 // BİRİM: MM',
                    accentColor: cfg.accentColor,
                    primaryColor: cfg.textColor,
                    taglineColor: cfg.taglineColor,
                    transparentBackground: cfg.transparentBg,
                    backgroundColor: cfg.transparentBg ? 'transparent' : '#0B0D10',
                    fontFamily: cfg.fontFamily,
                    headlineSize: cfg.headlineSize,
                    subtitleSize: cfg.subtitleSize,
                    taglineSize: cfg.taglineSize,
                    letterSpacing: cfg.letterSpacing,
                    textOffsetX: cfg.textOffsetX,
                    textOffsetY: cfg.textOffsetY,
                    textAlign: cfg.textAlign,
                    textAnimation: cfg.textAnimation,
                    textDelayFrames: cfg.line1Delay,
                    line1Delay: cfg.line1Delay,
                    line2Delay: cfg.line2Delay,
                    line3Delay: cfg.line3Delay,
                    showLogo: cfg.showLogo,
                    aspectRatio: cfg.aspectRatio,
                    playbackSpeed: cfg.playbackSpeed ?? 1.0,
                    durationInFrames: cfg.durationInFrames,
                    exitAnimation: cfg.exitAnimation,
                    exitTarget: cfg.exitTarget,
                    exitDurationFrames: cfg.exitDurationFrames,
                    exitStartFrame: cfg.exitStartFrame,
                    exitTimingMode: cfg.exitTimingMode,
                    exitDelayFrames: cfg.exitDelayFrames,
                  }}
                  durationInFrames={cfg.durationInFrames}
                  fps={30}
                  playbackRate={cfg.playbackSpeed ?? 1.0}
                  compositionWidth={cfg.aspectRatio === '9:16' ? 1080 : cfg.aspectRatio === '1:1' ? 1080 : 1920}
                  compositionHeight={cfg.aspectRatio === '9:16' ? 1920 : cfg.aspectRatio === '1:1' ? 1080 : 1080}
                  style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }}
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
              flexDirection: 'column',
              gap: 8,
              backgroundColor: '#0E1118',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              padding: '8px 12px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              flexShrink: 0,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Üst Sıra: Esnek Sarılan Kontroller ve İndirme Düğmeleri */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                width: '100%',
              }}
            >
              {/* Sol / Orta: Ayar Grupları (Küçüldüğünde Zarifçe Bir Alt Satıra Sarılır) */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 6,
                  flex: '1 1 auto',
                  minWidth: 0,
                }}
              >
                {/* Format & Oryantasyon Seçimi (Yatay 16:9 vs Dikey 9:16 vs Kare 1:1) */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    padding: '3px 6px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10.5,
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 600,
                      marginRight: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    📐 Format:
                  </span>
                  {[
                    { value: '16:9' as const, label: '16:9', title: '16:9 Yatay (1920×1080 - YouTube/TV)' },
                    { value: '9:16' as const, label: '9:16', title: '9:16 Dikey (1080×1920 - Reels/Shorts/TikTok)' },
                    { value: '1:1' as const, label: '1:1', title: '1:1 Kare (1080×1080 - Post/Feed)' },
                  ].map((f) => (
                    <button
                      key={f.value}
                      onClick={() => updateConfig({ aspectRatio: f.value })}
                      title={f.title}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        padding: '3px 7px',
                        borderRadius: 6,
                        border:
                          cfg.aspectRatio === f.value
                            ? '1px solid #3B82F6'
                            : '1px solid transparent',
                        backgroundColor:
                          cfg.aspectRatio === f.value
                            ? 'rgba(59, 130, 246, 0.25)'
                            : 'transparent',
                        color:
                          cfg.aspectRatio === f.value
                            ? '#93C5FD'
                            : 'rgba(255,255,255,0.65)',
                        fontSize: 10.5,
                        fontWeight: cfg.aspectRatio === f.value ? 700 : 500,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: 11 }}>{f.value === '9:16' ? '📱' : f.value === '1:1' ? '⏹️' : '🖥️'}</span>
                      <span>{f.label}</span>
                    </button>
                  ))}
                </div>

                {/* Süre Hızlı Seçimi */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    padding: '3px 6px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 10.5,
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 600,
                      marginRight: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <SvgIcons.Clock size={11} />
                    Süre:
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
                        padding: '3px 7px',
                        borderRadius: 6,
                        border:
                          cfg.durationInFrames === d.frames
                            ? '1px solid #6366F1'
                            : '1px solid transparent',
                        backgroundColor:
                          cfg.durationInFrames === d.frames
                            ? 'rgba(99, 102, 241, 0.2)'
                            : 'transparent',
                        color:
                          cfg.durationInFrames === d.frames
                            ? '#A5B4FC'
                            : 'rgba(255,255,255,0.65)',
                        fontSize: 11,
                        fontWeight: cfg.durationInFrames === d.frames ? 700 : 500,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                {/* Animasyon Hızı Seçimi */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    padding: '3px 6px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 10.5,
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 600,
                      marginRight: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <SvgIcons.Zap size={11} color="#F59E0B" />
                    Hız:
                  </span>
                  {[
                    { label: '0.5x', speed: 0.5 },
                    { label: '0.75x', speed: 0.75 },
                    { label: '1x', speed: 1.0 },
                    { label: '1.25x', speed: 1.25 },
                    { label: '1.5x', speed: 1.5 },
                    { label: '2x', speed: 2.0 },
                  ].map((s) => {
                    const isActive = Math.abs((cfg.playbackSpeed ?? 1.0) - s.speed) < 0.01;
                    return (
                      <button
                        key={s.speed}
                        onClick={() => updateConfig({ playbackSpeed: s.speed })}
                        title={`Geçerli animasyon hızı: ${s.label}`}
                        style={{
                          padding: '3px 6px',
                          borderRadius: 6,
                          border: isActive
                            ? '1px solid #F59E0B'
                            : '1px solid transparent',
                          backgroundColor: isActive
                            ? 'rgba(245, 158, 11, 0.2)'
                            : 'transparent',
                          color: isActive
                            ? '#FCD34D'
                            : 'rgba(255,255,255,0.65)',
                          fontSize: 11,
                          fontWeight: isActive ? 700 : 500,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>

                {/* Şeffaflık Düğmesi */}
                <button
                  onClick={() => updateConfig({ transparentBg: !cfg.transparentBg })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 10px',
                    borderRadius: 8,
                    border: cfg.transparentBg
                      ? '1px solid rgba(16, 185, 129, 0.5)'
                      : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: cfg.transparentBg
                      ? 'rgba(16, 185, 129, 0.15)'
                      : 'rgba(255,255,255,0.04)',
                    color: '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: cfg.transparentBg ? '#10B981' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                  <span>Alpha:</span>
                  <span
                    style={{
                      color: cfg.transparentBg ? '#34D399' : 'rgba(255,255,255,0.45)',
                      fontWeight: 700,
                    }}
                  >
                    {cfg.transparentBg ? 'AÇIK' : 'KAPALI'}
                  </span>
                </button>

                {/* Logo Görünürlüğü Düğmesi */}
                <button
                  onClick={() => updateConfig({ showLogo: !cfg.showLogo })}
                  title={cfg.showLogo ? 'Logoyu Gizle (Sadece Metin Modu)' : 'Logoyu Göster'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 10px',
                    borderRadius: 8,
                    border: cfg.showLogo
                      ? '1px solid rgba(255,255,255,0.12)'
                      : '1px solid rgba(245, 158, 11, 0.5)',
                    backgroundColor: cfg.showLogo
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(245, 158, 11, 0.16)',
                    color: '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <SvgIcons.Layers size={12} color={cfg.showLogo ? 'rgba(255,255,255,0.6)' : '#FBBF24'} />
                  <span>Logo:</span>
                  <span
                    style={{
                      color: cfg.showLogo ? '#818CF8' : '#FBBF24',
                      fontWeight: 700,
                    }}
                  >
                    {cfg.showLogo ? 'AÇIK' : 'SAF METİN'}
                  </span>
                </button>

                {/* Hızlı Kaybolma / Ters Animasyon Seçimi */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    padding: '3px 6px',
                    borderRadius: 8,
                    backgroundColor: cfg.exitAnimation !== 'none' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.03)',
                    border: cfg.exitAnimation !== 'none' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      fontSize: 10.5,
                      color: cfg.exitAnimation !== 'none' ? '#34D399' : 'rgba(255,255,255,0.5)',
                      fontWeight: 600,
                      marginRight: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <SvgIcons.EyeOff size={11} />
                    Çıkış:
                  </span>
                  {[
                    { label: 'Yok', value: 'none' as const },
                    { label: 'Fade', value: 'fade-out' as const },
                    { label: 'Ters Yay', value: 'reverse-spring' as const },
                    { label: 'Süzül', value: 'slide-down' as const },
                    { label: 'Dağıl', value: 'blur-dissolve' as const },
                  ].map((ex) => {
                    const isActive = cfg.exitAnimation === ex.value;
                    return (
                      <button
                        key={ex.value}
                        onClick={() => updateConfig({ exitAnimation: ex.value })}
                        title={`Kaybolma animasyonu: ${ex.label}`}
                        style={{
                          padding: '3px 6px',
                          borderRadius: 5,
                          border: isActive ? '1px solid #10B981' : '1px solid transparent',
                          backgroundColor: isActive ? 'rgba(16, 185, 129, 0.22)' : 'transparent',
                          color: isActive ? '#34D399' : 'rgba(255,255,255,0.65)',
                          fontSize: 10.5,
                          fontWeight: isActive ? 700 : 500,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {ex.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sağ: İndirme Düğmeleri */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0, marginLeft: 'auto' }}>
                <button
                  disabled={renderStatus === 'rendering'}
                  onClick={() => handleRenderVideo('webm')}
                  title="WebM olarak indir"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 13px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#10B981',
                    color: '#07080C',
                    fontSize: 11.5,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                    opacity: renderStatus === 'rendering' ? 0.6 : 1,
                    boxShadow: '0 2px 10px rgba(16, 185, 129, 0.35)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <SvgIcons.Download size={13} color="#07080C" />
                  <span>
                    {renderStatus === 'rendering'
                      ? `%${renderProgress}`
                      : cfg.transparentBg
                      ? 'Şeffaf WebM'
                      : 'WebM'}
                  </span>
                </button>

                <button
                  disabled={renderStatus === 'rendering'}
                  onClick={() => handleRenderVideo('mp4')}
                  title="H.264 MP4 olarak indir"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.12)',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#F1F5F9',
                    fontSize: 11.5,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                    opacity: renderStatus === 'rendering' ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <SvgIcons.Film size={13} color="#A5B4FC" />
                  <span>MP4</span>
                </button>
              </div>
            </div>

            {/* Alt Sıra: Canlı Render İlerleme Barı (% Gösterimi) veya Durum Mesajı */}
            {renderStatus === 'rendering' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 5,
                  padding: '8px 12px',
                  borderRadius: 8,
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(99, 102, 241, 0.35)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 11.5,
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        backgroundColor: '#10B981',
                        boxShadow: '0 0 8px #10B981',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: '#E2E8F0',
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {renderMessage || 'Video render ediliyor...'}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 800,
                      fontSize: 13,
                      color: '#10B981',
                      padding: '2px 8px',
                      borderRadius: 6,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      flexShrink: 0,
                    }}
                  >
                    %{renderProgress}
                  </div>
                </div>

                {/* İlerleme Çubuğu */}
                <div
                  style={{
                    width: '100%',
                    height: 5,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: 999,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.max(2, Math.min(100, renderProgress))}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #6366F1 0%, #10B981 100%)',
                      borderRadius: 999,
                      transition: 'width 0.25s ease-out',
                      boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                    }}
                  />
                </div>
              </div>
            )}

            {renderStatus === 'success' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 12px',
                  borderRadius: 8,
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34D399',
                  fontSize: 11.5,
                  fontWeight: 600,
                }}
              >
                <span>✓ {renderMessage}</span>
                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#10B981' }}>%100</span>
              </div>
            )}

            {renderStatus === 'error' && (
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#F87171',
                  fontSize: 11.5,
                  fontWeight: 600,
                }}
              >
                ⚠ {renderMessage}
              </div>
            )}
          </div>
        </main>

      {/* 3. SAĞ PANEL: Modern 3-Sekmeli Inspector */}
      <aside
        style={{
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#0A0C11',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minHeight: 0,
          overflow: 'hidden',
          width: 360,
          flexShrink: 0,
        }}
      >
        {/* Panel Üst Başlık & Reset */}
        <div
          style={{
            padding: '14px 16px 10px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0D0F16',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: '#818CF8',
                textTransform: 'uppercase',
              }}
            >
              İnceleme &amp; Kontrol
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', marginTop: 1 }}>
              {activeScene.title.split('//')[1]?.trim() ?? activeScene.title}
            </div>
          </div>
          <button
            onClick={() => updateConfig(DEFAULT_SCENE_CONFIG)}
            title="Bu sahnenin ayarlarını varsayılana sıfırla"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 9px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <SvgIcons.RotateCcw size={12} />
            Sıfırla
          </button>
        </div>

        {/* 3-Sekmeli Modern Segmented Controller */}
        <div
          style={{
            display: 'flex',
            padding: '8px 12px',
            gap: 4,
            backgroundColor: '#0B0D13',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { id: 'content', label: 'İçerik & Tipografi', icon: SvgIcons.Type },
            { id: 'timing', label: 'Zaman & Efekt', icon: SvgIcons.Clock },
            { id: 'export', label: 'Dışa Aktar', icon: SvgIcons.Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = inspectorTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setInspectorTab(tab.id as 'content' | 'timing' | 'export')}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                  padding: '7px 4px',
                  borderRadius: 7,
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                  backgroundColor: isActive ? 'rgba(99, 102, 241, 0.16)' : 'transparent',
                  color: isActive ? '#A5B4FC' : 'rgba(255,255,255,0.5)',
                  fontSize: 11,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={12} color={isActive ? '#818CF8' : 'currentColor'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sekme İçerikleri (Kaydırılabilir) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* SEKME 1: İÇERİK & TİPOGRAFİ */}
          {inspectorTab === 'content' && (
            <>
              {/* 0: Format & En-Boy Oranı */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    📐 Video Formatı &amp; Boyut
                  </div>
                  <span style={{ fontSize: 10, color: '#93C5FD', fontWeight: 600, fontFamily: 'monospace' }}>
                    {cfg.aspectRatio === '9:16' ? '1080×1920' : cfg.aspectRatio === '1:1' ? '1080×1080' : '1920×1080'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {ASPECT_RATIO_OPTIONS.map((opt) => {
                    const isSelected = cfg.aspectRatio === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => updateConfig({ aspectRatio: opt.value })}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 3,
                          padding: '8px 4px',
                          borderRadius: 8,
                          border: isSelected
                            ? '1.5px solid #3B82F6'
                            : '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: isSelected
                            ? 'rgba(59, 130, 246, 0.2)'
                            : 'rgba(255,255,255,0.02)',
                          color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{opt.icon}</span>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>{opt.label}</span>
                        <span style={{ fontSize: 9.5, color: isSelected ? '#93C5FD' : 'rgba(255,255,255,0.4)', textAlign: 'center' }}>
                          {opt.width}×{opt.height}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
                  {cfg.aspectRatio === '9:16'
                    ? '📱 Dikey format seçildi: Instagram Reels, TikTok, YouTube Shorts ve Hikayeler için dikey video üretilir.'
                    : cfg.aspectRatio === '1:1'
                    ? '⏹️ Kare format seçildi: Instagram gönderileri ve sosyal medya feed paylaşımları için kare video üretilir.'
                    : '🖥️ Yatay geniş format seçildi: YouTube, web siteleri, sunumlar ve TV ekranları için standart 16:9 video üretilir.'}
                </div>
              </div>

              {/* Metin Satırları ve Renkleri */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Metin Katmanları &amp; Renkler
                </div>

                {/* 1A: Ana Metin */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                      Ana Metin (1. Satır)
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
                          width: 20,
                          height: 20,
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
                      padding: '7px 10px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.12)',
                      backgroundColor: '#161A24',
                      color: cfg.textColor,
                      fontSize: 12.5,
                      fontWeight: 600,
                    }}
                  />
                  {/* Renk Çipleri */}
                  <div style={{ display: 'flex', gap: 4, marginTop: 5 }}>
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
                          height: 18,
                          borderRadius: 4,
                          backgroundColor: c.color,
                          border:
                            cfg.textColor.toLowerCase() === c.color.toLowerCase()
                              ? '2px solid #818CF8'
                              : '1px solid rgba(255,255,255,0.15)',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 1B: Alt Metin */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                      Alt Metin (2. Satır)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, color: cfg.accentColor, fontFamily: 'monospace' }}>
                        {cfg.accentColor}
                      </span>
                      <input
                        type="color"
                        value={cfg.accentColor}
                        onChange={(e) => updateConfig({ accentColor: e.target.value })}
                        title="Alt Metin Rengi Seç"
                        style={{
                          width: 20,
                          height: 20,
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
                      padding: '7px 10px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.12)',
                      backgroundColor: '#161A24',
                      color: cfg.accentColor,
                      fontSize: 12,
                    }}
                  />
                  <div style={{ display: 'flex', gap: 4, marginTop: 5 }}>
                    {[
                      { label: 'Bakır', color: '#E07A5F' },
                      { label: 'Altın', color: '#C89D66' },
                      { label: 'Zümrüt', color: '#10B981' },
                      { label: 'İndigo', color: '#6366F1' },
                      { label: 'Beyaz', color: '#FFFFFF' },
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => updateConfig({ accentColor: c.color })}
                        title={`Alt metni ${c.label} yap`}
                        style={{
                          flex: 1,
                          height: 18,
                          borderRadius: 4,
                          backgroundColor: c.color,
                          border:
                            cfg.accentColor.toLowerCase() === c.color.toLowerCase()
                              ? '2px solid #FFFFFF'
                              : '1px solid rgba(255,255,255,0.15)',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* 1C: 3. Satır Metni */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                      3. Satır Metni (Tagline)
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, color: cfg.taglineColor, fontFamily: 'monospace' }}>
                        {cfg.taglineColor}
                      </span>
                      <input
                        type="color"
                        value={cfg.taglineColor}
                        onChange={(e) => updateConfig({ taglineColor: e.target.value })}
                        title="3. Satır Rengi Seç"
                        style={{
                          width: 20,
                          height: 20,
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          padding: 0,
                          backgroundColor: 'transparent',
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input
                      type="text"
                      value={cfg.tagline}
                      onChange={(e) => updateConfig({ tagline: e.target.value })}
                      placeholder="3. satır metni girin..."
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        borderRadius: 6,
                        border: '1px solid rgba(255,255,255,0.12)',
                        backgroundColor: '#161A24',
                        color: cfg.taglineColor,
                        fontSize: 12,
                      }}
                    />
                    {cfg.tagline ? (
                      <button
                        onClick={() => updateConfig({ tagline: '' })}
                        title="3. Satırı Temizle"
                        style={{
                          padding: '0 8px',
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.12)',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.6)',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        <SvgIcons.X size={12} />
                      </button>
                    ) : (
                      <button
                        onClick={() => updateConfig({ tagline: 'MİMARİ ÇÖZÜMLER // 2026' })}
                        title="Örnek 3. Satır Ekle"
                        style={{
                          padding: '0 8px',
                          borderRadius: 6,
                          border: '1px solid rgba(255,255,255,0.12)',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 10,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        + Örnek
                      </button>
                    )}
                  </div>
                </div>

                {/* 1D: Künye Metni */}
                <div>
                  <label style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.55)', marginBottom: 3 }}>
                    Künye / Lokasyon / Yıl
                  </label>
                  <input
                    type="text"
                    value={cfg.projectCode}
                    onChange={(e) => updateConfig({ projectCode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      borderRadius: 6,
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: '#161A24',
                      color: '#FFFFFF',
                      fontSize: 11.5,
                    }}
                  />
                </div>
              </div>

              {/* Tipografi, Boyut ve Konum Kartı */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Tipografi &amp; Düzen
                </div>

                {/* Font Seçici */}
                <div>
                  <label style={{ display: 'block', fontSize: 10.5, color: 'rgba(255,255,255,0.6)', marginBottom: 3 }}>
                    Yazı Tipi (Font Family)
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
                      border: '1px solid rgba(255,255,255,0.12)',
                      backgroundColor: '#161A24',
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
                          width: 48,
                          padding: '2px 4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: '#161A24',
                          color: '#A5B4FC',
                          fontSize: 11,
                          fontWeight: 700,
                          textAlign: 'right',
                        }}
                      />
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>px</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={500}
                    value={cfg.headlineSize}
                    onChange={(e) => updateConfig({ headlineSize: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                    {[32, 64, 96, 140, 220].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateConfig({ headlineSize: size })}
                        style={{
                          flex: 1,
                          padding: '2px 0',
                          borderRadius: 4,
                          border:
                            cfg.headlineSize === size
                              ? '1px solid #6366F1'
                              : '1px solid rgba(255,255,255,0.08)',
                          backgroundColor:
                            cfg.headlineSize === size ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                          color: '#FFFFFF',
                          fontSize: 9.5,
                          cursor: 'pointer',
                        }}
                      >
                        {size}
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
                        max={500}
                        value={cfg.subtitleSize}
                        onChange={(e) =>
                          updateConfig({
                            subtitleSize: Math.max(6, Math.min(500, Number(e.target.value) || 6)),
                          })
                        }
                        style={{
                          width: 48,
                          padding: '2px 4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: '#161A24',
                          color: '#A5B4FC',
                          fontSize: 11,
                          fontWeight: 700,
                          textAlign: 'right',
                        }}
                      />
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>px</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={500}
                    value={cfg.subtitleSize}
                    onChange={(e) => updateConfig({ subtitleSize: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
                    {[20, 40, 90, 160, 240].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateConfig({ subtitleSize: size })}
                        style={{
                          flex: 1,
                          padding: '2px 0',
                          borderRadius: 4,
                          border:
                            cfg.subtitleSize === size
                              ? '1px solid #6366F1'
                              : '1px solid rgba(255,255,255,0.08)',
                          backgroundColor:
                            cfg.subtitleSize === size ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.03)',
                          color: '#FFFFFF',
                          fontSize: 9.5,
                          cursor: 'pointer',
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Satır Boyutu */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
                    <span>3. Satır Boyutu</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input
                        type="number"
                        min={6}
                        max={500}
                        value={cfg.taglineSize}
                        onChange={(e) =>
                          updateConfig({
                            taglineSize: Math.max(6, Math.min(500, Number(e.target.value) || 6)),
                          })
                        }
                        style={{
                          width: 48,
                          padding: '2px 4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.15)',
                          backgroundColor: '#161A24',
                          color: '#A5B4FC',
                          fontSize: 11,
                          fontWeight: 700,
                          textAlign: 'right',
                        }}
                      />
                      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>px</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={6}
                    max={500}
                    value={cfg.taglineSize}
                    onChange={(e) => updateConfig({ taglineSize: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                {/* Harf Aralığı */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
                    <span>Harf Aralığı (Tracking)</span>
                    <strong style={{ color: '#A5B4FC' }}>{cfg.letterSpacing.toFixed(2)} em</strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={2.0}
                    step={0.02}
                    value={cfg.letterSpacing}
                    onChange={(e) => updateConfig({ letterSpacing: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer' }}
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
                        ['left', 'Sola', SvgIcons.AlignLeft],
                        ['center', 'Ortala', SvgIcons.AlignCenter],
                        ['right', 'Sağa', SvgIcons.AlignRight],
                      ] as const
                    ).map(([al, lbl, Icon]) => (
                      <button
                        key={al}
                        onClick={() => updateConfig({ textAlign: al })}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          padding: '6px',
                          borderRadius: 6,
                          border:
                            cfg.textAlign === al
                              ? '1px solid #6366F1'
                              : '1px solid rgba(255,255,255,0.1)',
                          backgroundColor:
                            cfg.textAlign === al
                              ? 'rgba(99, 102, 241, 0.2)'
                              : 'rgba(255,255,255,0.03)',
                          color: '#FFFFFF',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}
                      >
                        <Icon size={12} />
                        <span>{lbl}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Konumlandırma (X & Y) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* Yatay Kaydırma (X) */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
                      <span>Yatay Kaydırma (X)</span>
                      <strong style={{ color: '#A5B4FC' }}>{cfg.textOffsetX} px</strong>
                    </div>
                    <input
                      type="range"
                      min={-1000}
                      max={1000}
                      step={5}
                      value={cfg.textOffsetX}
                      onChange={(e) => updateConfig({ textOffsetX: Number(e.target.value) })}
                      style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      <button
                        onClick={() => updateConfig({ textOffsetX: -300 })}
                        style={{
                          flex: 1,
                          padding: '4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 10,
                          cursor: 'pointer',
                        }}
                      >
                        Sola (-300)
                      </button>
                      <button
                        onClick={() => updateConfig({ textOffsetX: 0 })}
                        style={{
                          flex: 1,
                          padding: '4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 10,
                          cursor: 'pointer',
                        }}
                      >
                        Ortala (0)
                      </button>
                      <button
                        onClick={() => updateConfig({ textOffsetX: 300 })}
                        style={{
                          flex: 1,
                          padding: '4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 10,
                          cursor: 'pointer',
                        }}
                      >
                        Sağa (+300)
                      </button>
                    </div>
                  </div>

                  {/* Dikey Kaydırma (Y) */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'rgba(255,255,255,0.65)', marginBottom: 3 }}>
                      <span>Dikey Kaydırma (Y)</span>
                      <strong style={{ color: '#A5B4FC' }}>{cfg.textOffsetY} px</strong>
                    </div>
                    <input
                      type="range"
                      min={-700}
                      max={500}
                      step={5}
                      value={cfg.textOffsetY}
                      onChange={(e) => updateConfig({ textOffsetY: Number(e.target.value) })}
                      style={{ width: '100%', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      <button
                        onClick={() => updateConfig({ textOffsetY: -380 })}
                        style={{
                          flex: 1,
                          padding: '4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 10,
                          cursor: 'pointer',
                        }}
                      >
                        Üste Al
                      </button>
                      <button
                        onClick={() => updateConfig({ textOffsetY: 0 })}
                        style={{
                          flex: 1,
                          padding: '4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 10,
                          cursor: 'pointer',
                        }}
                      >
                        Ortala
                      </button>
                      <button
                        onClick={() => updateConfig({ textOffsetY: 200 })}
                        style={{
                          flex: 1,
                          padding: '4px',
                          borderRadius: 4,
                          border: '1px solid rgba(255,255,255,0.1)',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          color: 'rgba(255,255,255,0.7)',
                          fontSize: 10,
                          cursor: 'pointer',
                        }}
                      >
                        Alta Al
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SEKME 2: ZAMANLAMA & EFEKT */}
          {inspectorTab === 'timing' && (
            <>
              {/* Metin Efekti Seçici */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  <SvgIcons.Sparkles size={13} color="#818CF8" />
                  Metin Animasyon Efekti (23 Tip)
                </div>
                <select
                  value={cfg.textAnimation}
                  onChange={(e) =>
                    updateConfig({ textAnimation: e.target.value as TextAnimationType })
                  }
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 6,
                    border: '1px solid #6366F1',
                    backgroundColor: '#161A24',
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
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
                  Tüm sahnelerle uyumlu 23 farklı mimari metin reveal efekti.
                </div>
              </div>

              {/* Logo Görünürlüğü Anahtarı */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: cfg.showLogo ? '#0F121A' : 'rgba(245, 158, 11, 0.12)',
                  border: cfg.showLogo
                    ? '1px solid rgba(255,255,255,0.07)'
                    : '1px solid rgba(245, 158, 11, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  transition: 'all 0.15s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: cfg.showLogo ? '#FFFFFF' : '#FBBF24' }}>
                    <SvgIcons.Layers size={13} color={cfg.showLogo ? 'rgba(255,255,255,0.7)' : '#FBBF24'} />
                    <span>LOGO KATMANI</span>
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                    {cfg.showLogo
                      ? 'Logo + Metin birlikte aktif'
                      : '⚡ Saf Metin: Logo gizli, sadece metin'}
                  </div>
                </div>
                <button
                  onClick={() => updateConfig({ showLogo: !cfg.showLogo })}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: cfg.showLogo
                      ? '1px solid rgba(255,255,255,0.15)'
                      : '1px solid #F59E0B',
                    backgroundColor: cfg.showLogo ? 'rgba(255,255,255,0.06)' : '#F59E0B',
                    color: cfg.showLogo ? '#FFFFFF' : '#000000',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cfg.showLogo ? 'Logoyu Gizle' : '✓ Saf Metin'}
                </button>
              </div>

              {/* KART 1: Geçerli Animasyon Hızı (Bağımsız Tempo) */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#FBBF24', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    <SvgIcons.Zap size={13} color="#F59E0B" />
                    <span>Geçerli Animasyon Hızı</span>
                  </div>
                  <strong style={{ fontSize: 11, color: '#FCD34D', fontFamily: "'JetBrains Mono', monospace", backgroundColor: 'rgba(245, 158, 11, 0.15)', padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                    {(cfg.playbackSpeed ?? 1.0).toFixed(2)}x
                  </strong>
                </div>

                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                  Geçerli sahnenin oynatılma temposu. Videonun toplam süresinden tamamen bağımsızdır.
                </div>

                {/* Hız Slider */}
                <input
                  type="range"
                  min={0.25}
                  max={3.0}
                  step={0.05}
                  value={cfg.playbackSpeed ?? 1.0}
                  onChange={(e) => updateConfig({ playbackSpeed: Number(e.target.value) })}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#F59E0B' }}
                />

                {/* Hız Hızlı Butonları */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {[
                    { label: '0.5x', speed: 0.5, desc: 'Yavaş' },
                    { label: '0.75x', speed: 0.75, desc: 'Akıcı' },
                    { label: '1.0x', speed: 1.0, desc: 'Normal' },
                    { label: '1.25x', speed: 1.25, desc: 'Seri' },
                    { label: '1.5x', speed: 1.5, desc: 'Hızlı' },
                    { label: '2.0x', speed: 2.0, desc: 'Çift' },
                  ].map((btn) => {
                    const isActive = Math.abs((cfg.playbackSpeed ?? 1.0) - btn.speed) < 0.01;
                    return (
                      <button
                        key={btn.speed}
                        onClick={() => updateConfig({ playbackSpeed: btn.speed })}
                        title={`${btn.label} - ${btn.desc} oynatma hızı`}
                        style={{
                          flex: 1,
                          padding: '5px 2px',
                          borderRadius: 4,
                          border: isActive
                            ? '1px solid #F59E0B'
                            : '1px solid rgba(255,255,255,0.08)',
                          backgroundColor: isActive
                            ? 'rgba(245, 158, 11, 0.22)'
                            : 'rgba(255,255,255,0.03)',
                          color: isActive ? '#FCD34D' : 'rgba(255,255,255,0.8)',
                          fontSize: 10,
                          fontWeight: isActive ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* KART 2: Animasyon / Video Toplam Süresi (Bağımsız Zaman Çizelgesi) */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#A5B4FC', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    <SvgIcons.Clock size={13} color="#818CF8" />
                    <span>Animasyon Toplam Süresi</span>
                  </div>
                  <strong style={{ fontSize: 11, color: '#A5B4FC', fontFamily: "'JetBrains Mono', monospace", backgroundColor: 'rgba(99, 102, 241, 0.15)', padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                    {(cfg.durationInFrames / 30).toFixed(1)}s ({cfg.durationInFrames}f)
                  </strong>
                </div>

                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                  Videonun zaman çizelgesi uzunluğu. Geçerli animasyon hızından tamamen bağımsızdır.
                </div>

                <input
                  type="range"
                  min={60}
                  max={450}
                  step={15}
                  value={cfg.durationInFrames}
                  onChange={(e) => updateConfig({ durationInFrames: Number(e.target.value) })}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#6366F1' }}
                />
                <div style={{ display: 'flex', gap: 4 }}>
                  {[
                    { label: '3s', frames: 90 },
                    { label: '5s', frames: 150 },
                    { label: '7s', frames: 210 },
                    { label: '10s', frames: 300 },
                    { label: '12s', frames: 360 },
                  ].map((btn) => (
                    <button
                      key={btn.frames}
                      onClick={() => updateConfig({ durationInFrames: btn.frames })}
                      style={{
                        flex: 1,
                        padding: '5px 2px',
                        borderRadius: 4,
                        border:
                          cfg.durationInFrames === btn.frames
                            ? '1px solid #6366F1'
                            : '1px solid rgba(255,255,255,0.08)',
                        backgroundColor:
                          cfg.durationInFrames === btn.frames
                            ? 'rgba(99, 102, 241, 0.2)'
                            : 'rgba(255,255,255,0.03)',
                        color: cfg.durationInFrames === btn.frames ? '#A5B4FC' : '#FFFFFF',
                        fontSize: 10,
                        fontWeight: cfg.durationInFrames === btn.frames ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* KART 3: Süre & Hız Bağımsızlık Durum Özeti */}
              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px dashed rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>⏱️ Toplam Süre:</span>
                  <span style={{ color: '#A5B4FC', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                    {(cfg.durationInFrames / 30).toFixed(1)} sn ({cfg.durationInFrames} kare)
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10.5 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>⚡ Geçerli Hız:</span>
                  <span style={{ color: '#FCD34D', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                    {(cfg.playbackSpeed ?? 1.0).toFixed(2)}x
                  </span>
                </div>
                <div style={{ fontSize: 9.5, color: '#34D399', lineHeight: 1.35, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span>✓</span>
                  <span>Süre ve hız bağımsızdır: Hızı değiştirmek süreyi, süreyi değiştirmek hızı etkilemez.</span>
                </div>
              </div>

              {/* Satır Gecikmeleri (Stagger Timing) */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Satır Giriş Zamanlamaları
                </div>

                {/* 1. Satır Başlama */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                      1. Satır Girişi:
                    </span>
                    <strong style={{ fontSize: 10.5, color: '#A5B4FC', fontFamily: 'monospace' }}>
                      {(cfg.line1Delay / 30).toFixed(2)}s ({cfg.line1Delay}f)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={150}
                    step={2}
                    value={cfg.line1Delay}
                    onChange={(e) => updateConfig({ line1Delay: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                {/* 2. Satır Başlama */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                      2. Satır Girişi:
                    </span>
                    <strong style={{ fontSize: 10.5, color: cfg.accentColor, fontFamily: 'monospace' }}>
                      {(cfg.line2Delay / 30).toFixed(2)}s ({cfg.line2Delay}f)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={180}
                    step={2}
                    value={cfg.line2Delay}
                    onChange={(e) => updateConfig({ line2Delay: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                {/* 3. Satır Başlama */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                      3. Satır Girişi:
                    </span>
                    <strong style={{ fontSize: 10.5, color: cfg.taglineColor, fontFamily: 'monospace' }}>
                      {(cfg.line3Delay / 30).toFixed(2)}s ({cfg.line3Delay}f)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={210}
                    step={2}
                    value={cfg.line3Delay}
                    onChange={(e) => updateConfig({ line3Delay: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                {/* Hazır Presetler */}
                <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                  {[
                    { label: 'Hızlı', l1: 15, l2: 23, l3: 31 },
                    { label: 'Normal', l1: 20, l2: 32, l3: 44 },
                    { label: 'Kademeli', l1: 20, l2: 44, l3: 68 },
                    { label: 'Birlikte', l1: 20, l2: 20, l3: 20 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => updateConfig({ line1Delay: p.l1, line2Delay: p.l2, line3Delay: p.l3 })}
                      style={{
                        flex: 1,
                        padding: '4px 2px',
                        borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: 10,
                        cursor: 'pointer',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* KART: KAYBOLMA & TERS ANİMASYON (Yazı ve Logonun Kaybolması) */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: cfg.exitAnimation !== 'none'
                    ? '1px solid rgba(16, 185, 129, 0.4)'
                    : '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  boxShadow: cfg.exitAnimation !== 'none'
                    ? '0 0 16px rgba(16, 185, 129, 0.08)'
                    : undefined,
                }}
              >
                {/* Kart Başlığı ve Durum Rozeti */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: cfg.exitAnimation !== 'none' ? '#34D399' : '#E2E8F0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    <SvgIcons.EyeOff size={13} color={cfg.exitAnimation !== 'none' ? '#10B981' : 'rgba(255,255,255,0.7)'} />
                    <span>Kaybolma & Ters Animasyon</span>
                  </div>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: 4,
                      backgroundColor: cfg.exitAnimation !== 'none'
                        ? 'rgba(16, 185, 129, 0.18)'
                        : 'rgba(255,255,255,0.05)',
                      color: cfg.exitAnimation !== 'none' ? '#34D399' : 'rgba(255,255,255,0.4)',
                      border: cfg.exitAnimation !== 'none'
                        ? '1px solid rgba(16, 185, 129, 0.4)'
                        : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {cfg.exitAnimation !== 'none' ? 'AKTİF' : 'KAPALI'}
                  </span>
                </div>

                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                  Giriş animasyonu tamamlandıktan sonra veya video bitmeden önce metinlerin veya logonun ters hareketle kaybolmasını sağlar.
                </div>

                {/* 1. Hedef Seçimi (Target: Tümü, Sadece Yazı, Sadece Logo) */}
                <div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: 5 }}>
                    Kaybolacak Hedef:
                  </div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {[
                      { value: 'both' as const, label: 'Tümü (Logo + Yazı)', icon: '✨' },
                      { value: 'text-only' as const, label: 'Yalnızca Yazı', icon: '📝' },
                      { value: 'logo-only' as const, label: 'Yalnızca Logo', icon: '🏛️' },
                    ].map((t) => {
                      const isActive = cfg.exitTarget === t.value;
                      return (
                        <button
                          key={t.value}
                          onClick={() => updateConfig({ exitTarget: t.value })}
                          style={{
                            flex: 1,
                            padding: '6px 4px',
                            borderRadius: 6,
                            border: isActive ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.08)',
                            backgroundColor: isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
                            color: isActive ? '#34D399' : 'rgba(255,255,255,0.75)',
                            fontSize: 10.5,
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span style={{ fontSize: 13 }}>{t.icon}</span>
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Kaybolma Efekti (Dropdown) */}
                <div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: 4 }}>
                    Kaybolma / Ters Animasyon Tipi:
                  </div>
                  <select
                    value={cfg.exitAnimation}
                    onChange={(e) => updateConfig({ exitAnimation: e.target.value as ExitAnimationType })}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 6,
                      border: cfg.exitAnimation !== 'none' ? '1px solid #10B981' : '1px solid rgba(255,255,255,0.15)',
                      backgroundColor: '#161A24',
                      color: '#FFFFFF',
                      fontSize: 11.5,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {EXIT_ANIMATION_CHOICES.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.icon} {choice.label}
                      </option>
                    ))}
                  </select>
                  <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>
                    {EXIT_ANIMATION_CHOICES.find((c) => c.value === cfg.exitAnimation)?.desc}
                  </div>
                </div>

                {/* 3. Zamanlama Modu (Timing Mode) */}
                <div>
                  <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginBottom: 5 }}>
                    Kaybolma Başlangıç Mantığı:
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {[
                      { value: 'before-end' as const, label: 'Video Bitmeden Önce', desc: 'Sonundan X kare önce' },
                      { value: 'after-appear' as const, label: 'Girişten Hemen Sonra', desc: 'Açıldıktan X kare sonra' },
                      { value: 'custom' as const, label: 'Özel Kare Seçimi', desc: 'Tam belirtilen karede' },
                    ].map((mode) => {
                      const isActive = cfg.exitTimingMode === mode.value;
                      return (
                        <button
                          key={mode.value}
                          onClick={() => updateConfig({ exitTimingMode: mode.value })}
                          title={mode.desc}
                          style={{
                            flex: 1,
                            padding: '6px 4px',
                            borderRadius: 6,
                            border: isActive ? '1px solid #6366F1' : '1px solid rgba(255,255,255,0.08)',
                            backgroundColor: isActive ? 'rgba(99, 102, 241, 0.22)' : 'rgba(255,255,255,0.03)',
                            color: isActive ? '#A5B4FC' : 'rgba(255,255,255,0.7)',
                            fontSize: 10,
                            fontWeight: isActive ? 700 : 500,
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Geçiş Süresi (exitDurationFrames) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                      Geçiş / Kaybolma Süresi:
                    </span>
                    <strong style={{ fontSize: 10.5, color: '#34D399', fontFamily: 'monospace' }}>
                      {(cfg.exitDurationFrames / 30).toFixed(2)}s ({cfg.exitDurationFrames}f)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={60}
                    step={1}
                    value={cfg.exitDurationFrames}
                    onChange={(e) => updateConfig({ exitDurationFrames: Number(e.target.value) })}
                    style={{ width: '100%', cursor: 'pointer', accentColor: '#10B981' }}
                  />
                </div>

                {/* 5. Gecikme / Bekleme Süresi (exitDelayFrames) veya Özel Kare */}
                {cfg.exitTimingMode !== 'custom' ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                        {cfg.exitTimingMode === 'before-end' ? 'Bitişten Önceki Boşluk (Hold):' : 'Ekranda Kalma Süresi (Hold):'}
                      </span>
                      <strong style={{ fontSize: 10.5, color: '#A5B4FC', fontFamily: 'monospace' }}>
                        {(cfg.exitDelayFrames / 30).toFixed(2)}s ({cfg.exitDelayFrames}f)
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={120}
                      step={2}
                      value={cfg.exitDelayFrames}
                      onChange={(e) => updateConfig({ exitDelayFrames: Number(e.target.value) })}
                      style={{ width: '100%', cursor: 'pointer', accentColor: '#6366F1' }}
                    />
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                        Kaybolma Başlangıç Karesi:
                      </span>
                      <strong style={{ fontSize: 10.5, color: '#FCD34D', fontFamily: 'monospace' }}>
                        {cfg.exitStartFrame ?? Math.max(0, cfg.durationInFrames - cfg.exitDurationFrames - 15)}f
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={Math.max(10, cfg.durationInFrames - cfg.exitDurationFrames)}
                      step={1}
                      value={cfg.exitStartFrame ?? Math.max(0, cfg.durationInFrames - cfg.exitDurationFrames - 15)}
                      onChange={(e) => updateConfig({ exitStartFrame: Number(e.target.value) })}
                      style={{ width: '100%', cursor: 'pointer', accentColor: '#F59E0B' }}
                    />
                  </div>
                )}

                {/* Hazır Kaybolma Preset Butonları */}
                <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
                  {[
                    { label: 'Fade Out', anim: 'fade-out' as const, dur: 25 },
                    { label: 'Ters Yay', anim: 'reverse-spring' as const, dur: 30 },
                    { label: 'Süzülme', anim: 'slide-down' as const, dur: 25 },
                    { label: 'Bulanık', anim: 'blur-dissolve' as const, dur: 28 },
                    { label: 'İptal', anim: 'none' as const, dur: 25 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => updateConfig({ exitAnimation: preset.anim, exitDurationFrames: preset.dur })}
                      style={{
                        flex: 1,
                        padding: '5px 2px',
                        borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.08)',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        color: preset.anim === 'none' ? 'rgba(255,255,255,0.5)' : '#34D399',
                        fontSize: 9.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.12s ease',
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SEKME 3: DIŞA AKTAR */}
          {inspectorTab === 'export' && (
            <>
              {/* Şeffaflık Seçeneği Kartı */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: cfg.transparentBg ? 'rgba(16, 185, 129, 0.1)' : '#0F121A',
                  border: cfg.transparentBg ? '1px solid rgba(16, 185, 129, 0.35)' : '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#FFFFFF' }}>
                    Alpha Kanal (Şeffaf Arka Plan)
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                    {cfg.transparentBg
                      ? 'Arka plan saydam. WebM ve ProRes MOV destekler.'
                      : 'Siyah stüdyo arka planı aktif.'}
                  </div>
                </div>
                <button
                  onClick={() => updateConfig({ transparentBg: !cfg.transparentBg })}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    border: 'none',
                    backgroundColor: cfg.transparentBg ? '#10B981' : 'rgba(255,255,255,0.1)',
                    color: cfg.transparentBg ? '#07080C' : '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cfg.transparentBg ? '✓ AÇIK' : 'KAPALI'}
                </button>
              </div>

              {/* Dışa Aktarma Format Butonları */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#E2E8F0', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Video Render Seçenekleri
                </div>

                {/* WebM (Şeffaf Destekli) */}
                <button
                  disabled={renderStatus === 'rendering'}
                  onClick={() => handleRenderVideo('webm')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#10B981',
                    color: '#07080C',
                    cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                    opacity: renderStatus === 'rendering' ? 0.6 : 1,
                    boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}>
                    <SvgIcons.Download size={16} color="#07080C" />
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                        {cfg.transparentBg ? 'Şeffaf WebM İndir' : 'WebM Video İndir'}
                      </div>
                      <div style={{ fontSize: 9.5, opacity: 0.8 }}>
                        {cfg.transparentBg ? 'Alpha destekli hafif video (Web/OBS)' : 'Hızlı modern web formatı'}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.7 }}>.webm</span>
                </button>

                {/* MP4 Full HD */}
                <button
                  disabled={renderStatus === 'rendering'}
                  onClick={() => handleRenderVideo('mp4')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    backgroundColor: 'rgba(99, 102, 241, 0.14)',
                    color: '#FFFFFF',
                    cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                    opacity: renderStatus === 'rendering' ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}>
                    <SvgIcons.Film size={16} color="#818CF8" />
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                        {cfg.transparentBg ? 'Full HD MP4 İndir (Opak Siyah)' : 'Full HD MP4 İndir'}
                      </div>
                      <div style={{ fontSize: 9.5, color: cfg.transparentBg ? '#FCD34D' : 'rgba(255,255,255,0.5)' }}>
                        {cfg.transparentBg ? '⚠️ MP4 formatı şeffaflığı desteklemez (Şeffaf için WebM veya MOV seçiniz)' : 'H.264 evrensel uyumluluk (YouTube, Instagram, Sunum)'}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#818CF8' }}>.mp4</span>
                </button>

                {/* ProRes 4444 */}
                <button
                  disabled={renderStatus === 'rendering'}
                  onClick={() => handleRenderVideo('mov')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: cfg.transparentBg ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: cfg.transparentBg ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255,255,255,0.03)',
                    color: '#FFFFFF',
                    cursor: renderStatus === 'rendering' ? 'not-allowed' : 'pointer',
                    opacity: renderStatus === 'rendering' ? 0.6 : 1,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, textAlign: 'left' }}>
                    <SvgIcons.Sparkles size={16} color="#FBBF24" />
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 700 }}>
                        {cfg.transparentBg ? 'Şeffaf Apple ProRes 4444 (.mov)' : 'Apple ProRes 4444 (.mov)'}
                      </div>
                      <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.45)' }}>
                        {cfg.transparentBg ? 'Kayıpsız kurgu kalitesi + Alpha şeffaflık (Premiere, AE, DaVinci)' : 'Kayıpsız kurgu kalitesi (Premiere, After Effects, DaVinci)'}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#FBBF24' }}>.mov</span>
                </button>
              </div>

              {/* Video Parametre Özeti */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 10,
                  backgroundColor: '#0F121A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  fontSize: 11,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>
                  DIŞA AKTARMA BİLGİSİ
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Çözünürlük:</span>
                  <span style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>1920 × 1080 (FHD)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Kare Hızı:</span>
                  <span style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>30 FPS</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Animasyon Süresi:</span>
                  <span style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>
                    {(cfg.durationInFrames / 30).toFixed(1)} sn ({cfg.durationInFrames} frames)
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Animasyon Hızı:</span>
                  <span style={{ color: '#FCD34D', fontFamily: 'monospace', fontWeight: 600 }}>
                    {(cfg.playbackSpeed ?? 1.0).toFixed(2)}x (Bağımsız)
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Arka Plan:</span>
                  <span style={{ color: cfg.transparentBg ? '#34D399' : '#FFFFFF', fontWeight: cfg.transparentBg ? 700 : 400 }}>
                    {cfg.transparentBg ? '🟢 %100 Transparan (Alpha Kanalı)' : 'Siyah Opak'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.5)' }}>
                  <span>Ters Animasyon / Kaybolma:</span>
                  <span style={{ color: cfg.exitAnimation !== 'none' ? '#34D399' : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    {cfg.exitAnimation !== 'none'
                      ? `${EXIT_ANIMATION_CHOICES.find(c => c.value === cfg.exitAnimation)?.label ?? cfg.exitAnimation} (${cfg.exitTarget === 'both' ? 'Tümü' : cfg.exitTarget === 'text-only' ? 'Yazı' : 'Logo'})`
                      : 'Yok (Sabit Kalır)'}
                  </span>
                </div>
              </div>

              {/* Canlı Render Durumu & İlerleme Çubuğu */}
              {renderStatus === 'rendering' && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    padding: '10px 12px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(99, 102, 241, 0.35)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11.5, color: '#E2E8F0', fontWeight: 600 }}>{renderMessage || 'İşleniyor...'}</span>
                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 13, color: '#10B981' }}>%{renderProgress}</span>
                  </div>
                  <div style={{ width: '100%', height: 6, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.max(2, Math.min(100, renderProgress))}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366F1, #10B981)',
                        transition: 'width 0.25s ease-out',
                      }}
                    />
                  </div>
                </div>
              )}

              {renderStatus === 'success' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: 11.5,
                    padding: '8px 12px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#34D399',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontWeight: 600,
                  }}
                >
                  <span>✓ {renderMessage}</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#10B981' }}>%100</span>
                </div>
              )}

              {renderStatus === 'error' && (
                <div
                  style={{
                    fontSize: 11.5,
                    padding: '8px 12px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: '#F87171',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    fontWeight: 600,
                  }}
                >
                  ⚠ {renderMessage}
                </div>
              )}
            </>
          )}
        </div>
      </aside>
      </div>
    </div>
  );
};
