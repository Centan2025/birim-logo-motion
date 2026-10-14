import React from 'react';
import { Composition } from 'remotion';
import { ArchitecturalSceneSchema, LowerThirdSchema } from './types/schema';
import { DirectionalLetterExpand } from './compositions/DirectionalLetterExpand';
import { CadBlueprintDraft } from './compositions/CadBlueprintDraft';
import { MonolithSunShadow } from './compositions/MonolithSunShadow';
import { LaserSectionCut } from './compositions/LaserSectionCut';
import { ModularKineticFacade } from './compositions/ModularKineticFacade';
import { ArchitecturalLowerThird } from './compositions/ArchitecturalLowerThird';
import { LiquidChromeSweep } from './compositions/LiquidChromeSweep';
import { KineticElasticSplit } from './compositions/KineticElasticSplit';
import { GlassPrismRefraction } from './compositions/GlassPrismRefraction';
import { MinimalStaggerMorph } from './compositions/MinimalStaggerMorph';
import { CleanVideoBadge } from './compositions/CleanVideoBadge';
import { NeonLaserContour } from './compositions/NeonLaserContour';
import { EditorialMaskCurtain } from './compositions/EditorialMaskCurtain';
import { SpotlightDarkroomReveal } from './compositions/SpotlightDarkroomReveal';
import { ElasticWaveDomino } from './compositions/ElasticWaveDomino';
import { GlitchSignalLock } from './compositions/GlitchSignalLock';
import { LiquidInkSpread } from './compositions/LiquidInkSpread';
import { EchoOutlineTunnel } from './compositions/EchoOutlineTunnel';
import { MagneticParticleSnap } from './compositions/MagneticParticleSnap';
import { SplitScreenShutter } from './compositions/SplitScreenShutter';
import { MinimalCornerWatermark } from './compositions/MinimalCornerWatermark';
import { SplitFlapHalfFold } from './compositions/SplitFlapHalfFold';
import { TopDownHeavyTopple } from './compositions/TopDownHeavyTopple';
import { HalfLogoCantileverDrop } from './compositions/HalfLogoCantileverDrop';
import { OrigamiAccordionUnfold } from './compositions/OrigamiAccordionUnfold';
import { SplitHorizonDualTip } from './compositions/SplitHorizonDualTip';
import { MasterShowcaseReel } from './compositions/MasterShowcaseReel';

const DEFAULT_ARCH_PROPS = {
  headline: 'MİMARİ TASARIM & YAPI',
  subtitle: 'ÇAĞDAŞ MEKÂN KURGUSU // İSTANBUL',
  projectCode: 'PRJ-2026 // PAFTA 01',
  scaleText: 'ÖLÇEK 1:50 // BİRİM: MM',
  accentColor: '#C89D66',
  primaryColor: '#F4F1EA',
  backgroundColor: '#0B0D10',
  fontFamily: "'Inter', sans-serif" as const,
  headlineSize: 19,
  subtitleSize: 12,
  letterSpacing: 0.4,
  textOffsetX: 0,
  textOffsetY: 0,
  textAlign: 'center' as const,
  textAnimation: 'char-wave' as const,
};

const DEFAULT_MODERN_PROPS = {
  headline: 'YENİLİKÇİ TASARIM & ÜRETİM',
  subtitle: 'MODERN ÇÖZÜMLER // İSTANBUL',
  projectCode: '2026 // EDITION',
  scaleText: 'BİRİM STUDIO',
  accentColor: '#E07A5F',
  primaryColor: '#F4F1EA',
  backgroundColor: '#07080C',
  fontFamily: "'Inter', sans-serif" as const,
  headlineSize: 19,
  subtitleSize: 12,
  letterSpacing: 0.4,
  textOffsetX: 0,
  textOffsetY: 0,
  textAlign: 'center' as const,
  textAnimation: 'char-wave' as const,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="26-Directional-Letter-Expand"
        component={DirectionalLetterExpand}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />

      {/* 01–05: Mimari Yaklaşımlı Öneriler */}
      <Composition
        id="01-CAD-Blueprint-Draft"
        component={CadBlueprintDraft}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_ARCH_PROPS}
      />
      <Composition
        id="02-Monolith-Sun-Shadow"
        component={MonolithSunShadow}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_ARCH_PROPS}
      />
      <Composition
        id="03-Laser-Section-Cut"
        component={LaserSectionCut}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_ARCH_PROPS}
      />
      <Composition
        id="04-Modular-Kinetic-Facade"
        component={ModularKineticFacade}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_ARCH_PROPS}
      />
      <Composition
        id="05-Architectural-Lower-Third"
        component={ArchitecturalLowerThird}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={LowerThirdSchema}
        defaultProps={{
          projectTitle: 'KUZEY KAMPÜSÜ KÜLTÜR MERKEZİ',
          architecturalPhase: 'UYGULAMA PROJESİ // KESİT A-A',
          locationYear: 'İSTANBUL — 2026',
          accentColor: '#C89D66',
          transparentBackground: false,
          fontFamily: "'Inter', sans-serif" as const,
          headlineSize: 22,
          subtitleSize: 12,
          letterSpacing: 0.18,
          textOffsetX: 0,
          textOffsetY: 0,
          textAnimation: 'char-wave' as const,
        }}
      />

      {/* 06–20: Modern, Sade & İlgi Çekici Alternatifler */}
      <Composition
        id="06-Liquid-Chrome-Sweep"
        component={LiquidChromeSweep}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="07-Kinetic-Elastic-Split"
        component={KineticElasticSplit}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="08-Glass-Prism-Refraction"
        component={GlassPrismRefraction}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="09-Minimal-Stagger-Morph"
        component={MinimalStaggerMorph}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="10-Clean-Video-Badge"
        component={CleanVideoBadge}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={LowerThirdSchema}
        defaultProps={{
          projectTitle: 'YENİ NESİL TASARIM DENEYİMİ',
          architecturalPhase: 'TANITIM FİLMİ // 2026',
          locationYear: 'BİRİM STUDIO',
          accentColor: '#E07A5F',
          transparentBackground: false,
          fontFamily: "'Inter', sans-serif" as const,
          headlineSize: 22,
          subtitleSize: 12,
          letterSpacing: 0.18,
          textOffsetX: 0,
          textOffsetY: 0,
          textAnimation: 'char-wave' as const,
        }}
      />
      <Composition
        id="11-Neon-Laser-Contour"
        component={NeonLaserContour}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="12-Editorial-Mask-Curtain"
        component={EditorialMaskCurtain}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="13-Spotlight-Darkroom-Reveal"
        component={SpotlightDarkroomReveal}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="14-Elastic-Wave-Domino"
        component={ElasticWaveDomino}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="15-Glitch-Signal-Lock"
        component={GlitchSignalLock}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="16-Liquid-Ink-Spread"
        component={LiquidInkSpread}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="17-Echo-Outline-Tunnel"
        component={EchoOutlineTunnel}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="18-Magnetic-Particle-Snap"
        component={MagneticParticleSnap}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="19-Split-Screen-Shutter"
        component={SplitScreenShutter}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="20-Minimal-Corner-Watermark"
        component={MinimalCornerWatermark}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={LowerThirdSchema}
        defaultProps={{
          projectTitle: 'MODERN MEKÂN & ÜRÜN HİKAYELERİ',
          architecturalPhase: 'BÖLÜM 01 // VİDEO SERİSİ',
          locationYear: 'BİRİM — 2026',
          accentColor: '#E07A5F',
          transparentBackground: false,
          fontFamily: "'Inter', sans-serif" as const,
          headlineSize: 22,
          subtitleSize: 12,
          letterSpacing: 0.18,
          textOffsetX: 0,
          textOffsetY: 0,
          textAnimation: 'char-wave' as const,
        }}
      />

      {/* 21–25: Yukarıdan Aşağı Devrilme & Yarısının Devrilmesi Serisi */}
      <Composition
        id="21-Split-Flap-Half-Fold"
        component={SplitFlapHalfFold}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="22-Top-Down-Heavy-Topple"
        component={TopDownHeavyTopple}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="23-Half-Logo-Cantilever-Drop"
        component={HalfLogoCantileverDrop}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="24-Origami-Accordion-Unfold"
        component={OrigamiAccordionUnfold}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
      <Composition
        id="25-Split-Horizon-Dual-Tip"
        component={SplitHorizonDualTip}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />

      {/* 27: Tüm 26 Önerinin Master Sunumu (130 sn) */}
      <Composition
        id="27-Master-Showcase-Reel"
        component={MasterShowcaseReel}
        durationInFrames={3900}
        fps={30}
        width={1920}
        height={1080}
        schema={ArchitecturalSceneSchema}
        defaultProps={DEFAULT_MODERN_PROPS}
      />
    </>
  );
};
