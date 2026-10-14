import React, { useState } from 'react';
import { Player } from '@remotion/player';
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
import { ArchitecturalSceneProps, LowerThirdProps } from '../types/schema';

type Category = 'all' | 'fold' | 'modern' | 'arch' | 'overlay';

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
    id: '26-Master-Showcase-Reel',
    title: '26 // TÜM ÖNERİLER MASTER SUNUM (125 SN)',
    desc: '25 sahnenin tamamını kesintisiz peş peşe oynatan master katalog',
    category: 'all',
    durationInFrames: 3750,
    archComponent: MasterShowcaseReel,
  },
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'Tümü (26)' },
  { id: 'fold', label: '3B Devrilme & Katlanma (5)' },
  { id: 'modern', label: 'Modern & Sade (13)' },
  { id: 'arch', label: 'Mimari Yaklaşım (4)' },
  { id: 'overlay', label: 'Video Alt Bant & Filigran (3)' },
];

export const ShowcaseApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedId, setSelectedId] = useState<string>('21-Split-Flap-Half-Fold');

  const [headline, setHeadline] = useState('YENİLİKÇİ TASARIM & ÜRETİM');
  const [subtitle, setSubtitle] = useState('MODERN ÇÖZÜMLER // İSTANBUL');
  const [projectCode, setProjectCode] = useState('BİRİM — 2026');
  const [accentColor, setAccentColor] = useState('#E07A5F');

  const filteredScenes =
    selectedCategory === 'all'
      ? SCENES
      : SCENES.filter((s) => s.category === selectedCategory);

  const activeScene =
    SCENES.find((s) => s.id === selectedId) ?? SCENES[0];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '370px 1fr',
        minHeight: '100vh',
        backgroundColor: '#08090C',
        color: '#F4F1EA',
      }}
    >
      {/* Left Sidebar: Scene Selector */}
      <aside
        style={{
          borderRight: '1px solid rgba(255,255,255,0.09)',
          backgroundColor: '#0C0E13',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        <div
          style={{
            padding: '22px 20px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.2em',
              color: accentColor,
              marginBottom: 4,
            }}
          >
            BİRİM LOGO // DXF MOTION SUITE
          </div>
          <h1
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            Video &amp; Logo Sunum Stüdyosu
          </h1>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              marginTop: 14,
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 8,
                    border: active
                      ? `1px solid ${accentColor}`
                      : '1px solid rgba(255,255,255,0.1)',
                    backgroundColor: active
                      ? `${accentColor}22`
                      : 'rgba(255,255,255,0.03)',
                    color: active ? '#FFFFFF' : 'rgba(255,255,255,0.65)',
                    fontSize: 11,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Scene List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {filteredScenes.map((scene) => {
            const isSelected = scene.id === activeScene.id;
            return (
              <button
                key={scene.id}
                onClick={() => setSelectedId(scene.id)}
                style={{
                  textAlign: 'left',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: isSelected
                    ? `1px solid ${accentColor}`
                    : '1px solid rgba(255,255,255,0.06)',
                  backgroundColor: isSelected
                    ? 'rgba(224, 122, 95, 0.14)'
                    : 'rgba(255,255,255,0.02)',
                  color: '#F4F1EA',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: isSelected ? '#FFFFFF' : '#E5E7EB',
                    marginBottom: 4,
                  }}
                >
                  {scene.title}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: 'rgba(255,255,255,0.52)',
                    lineHeight: 1.4,
                  }}
                >
                  {scene.desc}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content: Interactive Remotion Player + Live Text Customizer */}
      <main
        style={{
          padding: '28px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          maxWidth: 1400,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Top Scene Info Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600 }}>
              {activeScene.title}
            </h2>
            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 4,
              }}
            >
              {activeScene.desc}
            </p>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              padding: '6px 14px',
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            1920×1080 // 30 FPS // {(activeScene.durationInFrames / 30).toFixed(0)} SN
          </div>
        </div>

        {/* Remotion Player Container */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.14)',
            boxShadow: '0 30px 90px rgba(0,0,0,0.65)',
            backgroundColor: '#050507',
          }}
        >
          {activeScene.isOverlay && activeScene.overlayComponent ? (
            <Player
              key={activeScene.id}
              component={activeScene.overlayComponent}
              inputProps={{
                projectTitle: headline,
                architecturalPhase: subtitle,
                locationYear: projectCode,
                accentColor,
                transparentBackground: false,
              }}
              durationInFrames={activeScene.durationInFrames}
              fps={30}
              compositionWidth={1920}
              compositionHeight={1080}
              style={{ width: '100%', height: '100%' }}
              controls
              autoPlay
              loop
            />
          ) : (
            activeScene.archComponent && (
              <Player
                key={activeScene.id}
                component={activeScene.archComponent}
                inputProps={{
                  headline,
                  subtitle,
                  projectCode,
                  scaleText: 'ÖLÇEK 1:50 // BİRİM: MM',
                  accentColor,
                  primaryColor: '#F4F1EA',
                  backgroundColor: '#0B0D10',
                }}
                durationInFrames={activeScene.durationInFrames}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{ width: '100%', height: '100%' }}
                controls
                autoPlay
                loop
              />
            )
          )}
        </div>

        {/* Live Text & Accent Color Controls */}
        <div
          style={{
            padding: '20px 24px',
            borderRadius: 16,
            backgroundColor: '#0C0E13',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          <div>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Ana Başlık (Headline)
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#14171F',
                color: '#FFFFFF',
                fontSize: 13,
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Alt Başlık (Subtitle)
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#14171F',
                color: '#FFFFFF',
                fontSize: 13,
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Künye / Yıl Kodu
            </label>
            <input
              type="text"
              value={projectCode}
              onChange={(e) => setProjectCode(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#14171F',
                color: '#FFFFFF',
                fontSize: 13,
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: 11,
                color: 'rgba(255,255,255,0.55)',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Vurgu Rengi (Accent)
            </label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                style={{
                  width: 40,
                  height: 36,
                  border: 'none',
                  borderRadius: 6,
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                }}
              />
              {['#E07A5F', '#C89D66', '#38BDF8', '#10B981', '#A855F7'].map(
                (preset) => (
                  <button
                    key={preset}
                    onClick={() => setAccentColor(preset)}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      backgroundColor: preset,
                      border:
                        accentColor === preset
                          ? '2px solid #FFFFFF'
                          : '1px solid rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                    }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
