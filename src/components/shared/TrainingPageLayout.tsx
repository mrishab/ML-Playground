import { PageLayout } from "./PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { TrainingStaleBanner } from "./training-layout/TrainingStaleBanner";
import { TrainingConfigGrid } from "./training-layout/TrainingConfigGrid";
import { TrainingIdleCard } from "./training-layout/TrainingIdleCard";
import { TrainingErrorCard } from "./training-layout/TrainingErrorCard";
import { deriveTrainingAction } from "./training-layout/action";
import { TrainingLossCard } from "@/components/training/loss-plot/TrainingLossCard";
import type { TrainingPageLayoutProps } from "./training-layout/types";

export type { TrainingPageLayoutProps };

export function TrainingPageLayout(props: TrainingPageLayoutProps) {
  const { steps, isDownstreamStale } = usePipelineSteps();
  if (!props.isSplit) {
    return (
      <PageLayout
        icon={props.icon}
        title={props.title}
        subtitle={props.subtitle}
      >
        <PrerequisiteGate step={steps[2]} />
      </PageLayout>
    );
  }
  const action = deriveTrainingAction(
    props.metrics,
    props.trainingState,
    props.canTrain,
    props.nextStepProps,
    props.onRun,
  );
  const showLiveLoss =
    props.trainingState === "training" && props.lossTelemetry;

  return (
    <PageLayout
      icon={props.icon}
      title={props.title}
      subtitle={props.subtitle}
      primaryAction={action}
    >
      <TrainingStaleBanner
        isStale={isDownstreamStale}
        hasMetrics={Boolean(props.metrics)}
        onRun={props.onRun}
      />
      <TrainingErrorCard error={props.error} />
      <TrainingConfigGrid {...props} />
      {showLiveLoss && <TrainingLossCard telemetry={props.lossTelemetry} />}
      {props.metrics ? props.detailsComponent : null}
      {props.footerExtras}
      {props.trainingState === "idle" && !props.metrics && <TrainingIdleCard />}
    </PageLayout>
  );
}
