import { PageLayout } from "./PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { TrainingStaleBanner } from "./training-layout/TrainingStaleBanner";
import { TrainingConfigGrid } from "./training-layout/TrainingConfigGrid";
import { TrainingIdleCard } from "./training-layout/TrainingIdleCard";
import { TrainingErrorCard } from "./training-layout/TrainingErrorCard";
import { deriveTrainingAction } from "./training-layout/action";
import type { TrainingPageLayoutProps } from "./training-layout/types";

export type { TrainingPageLayoutProps };

export function TrainingPageLayout(props: TrainingPageLayoutProps) {
  const { steps, isDownstreamStale } = usePipelineSteps();
  const step3 = steps[2];

  if (!props.isSplit) {
    return (
      <PageLayout
        icon={props.icon}
        title={props.title}
        subtitle={props.subtitle}
      >
        <PrerequisiteGate step={step3} />
      </PageLayout>
    );
  }

  const primaryAction = deriveTrainingAction(
    props.metrics,
    props.trainingState,
    props.canTrain,
    props.nextStepProps,
    props.onRun,
  );

  return (
    <PageLayout
      icon={props.icon}
      title={props.title}
      subtitle={props.subtitle}
      primaryAction={primaryAction}
    >
      <TrainingStaleBanner
        isStale={isDownstreamStale}
        hasMetrics={Boolean(props.metrics)}
        onRun={props.onRun}
      />
      <TrainingErrorCard error={props.error} />
      <TrainingConfigGrid {...props} />
      {props.metrics ? props.detailsComponent : null}
      {props.footerExtras}
      {props.trainingState === "idle" && !props.metrics && <TrainingIdleCard />}
    </PageLayout>
  );
}
