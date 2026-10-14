import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { ArchitecturalSceneProps } from '../types/schema';
import { CadBlueprintDraft } from './CadBlueprintDraft';
import { MonolithSunShadow } from './MonolithSunShadow';
import { LaserSectionCut } from './LaserSectionCut';
import { ModularKineticFacade } from './ModularKineticFacade';
import { ArchitecturalLowerThird } from './ArchitecturalLowerThird';
import { LiquidChromeSweep } from './LiquidChromeSweep';
import { KineticElasticSplit } from './KineticElasticSplit';
import { GlassPrismRefraction } from './GlassPrismRefraction';
import { MinimalStaggerMorph } from './MinimalStaggerMorph';
import { CleanVideoBadge } from './CleanVideoBadge';
import { NeonLaserContour } from './NeonLaserContour';
import { EditorialMaskCurtain } from './EditorialMaskCurtain';
import { SpotlightDarkroomReveal } from './SpotlightDarkroomReveal';
import { ElasticWaveDomino } from './ElasticWaveDomino';
import { GlitchSignalLock } from './GlitchSignalLock';
import { LiquidInkSpread } from './LiquidInkSpread';
import { EchoOutlineTunnel } from './EchoOutlineTunnel';
import { MagneticParticleSnap } from './MagneticParticleSnap';
import { SplitScreenShutter } from './SplitScreenShutter';
import { MinimalCornerWatermark } from './MinimalCornerWatermark';
import { SplitFlapHalfFold } from './SplitFlapHalfFold';
import { TopDownHeavyTopple } from './TopDownHeavyTopple';
import { HalfLogoCantileverDrop } from './HalfLogoCantileverDrop';
import { OrigamiAccordionUnfold } from './OrigamiAccordionUnfold';
import { SplitHorizonDualTip } from './SplitHorizonDualTip';

export const MasterShowcaseReel: React.FC<ArchitecturalSceneProps> = (props) => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={150}>
          <SplitFlapHalfFold {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <TopDownHeavyTopple {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <HalfLogoCantileverDrop {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <OrigamiAccordionUnfold {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <SplitHorizonDualTip {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <LiquidChromeSweep {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <KineticElasticSplit {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <GlassPrismRefraction {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <MinimalStaggerMorph {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <NeonLaserContour {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <EditorialMaskCurtain {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <SpotlightDarkroomReveal {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <ElasticWaveDomino {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <GlitchSignalLock {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <LiquidInkSpread {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <EchoOutlineTunnel {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <MagneticParticleSnap {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <SplitScreenShutter {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <CleanVideoBadge
            projectTitle={props.headline}
            architecturalPhase={props.subtitle}
            locationYear={props.projectCode}
            accentColor={props.accentColor}
            transparentBackground={false}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <MinimalCornerWatermark
            projectTitle={props.headline}
            architecturalPhase={props.subtitle}
            locationYear={props.projectCode}
            accentColor={props.accentColor}
            transparentBackground={false}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <CadBlueprintDraft {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <MonolithSunShadow {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <LaserSectionCut {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <ModularKineticFacade {...props} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <ArchitecturalLowerThird
            projectTitle={props.headline}
            architecturalPhase={props.subtitle}
            locationYear={props.projectCode}
            accentColor={props.accentColor}
            transparentBackground={false}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
