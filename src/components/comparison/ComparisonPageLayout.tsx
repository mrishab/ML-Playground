import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { ComparisonTabs } from "@/components/comparison/ComparisonTabs";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { ComparisonStaleBanner } from "./comparison-layout/ComparisonStaleBanner";
import type { ComparisonPageLayoutProps } from "./comparison-layout/types";

export type { ComparisonPageLayoutProps };

export function ComparisonPageLayout<TMetrics>(
  props: ComparisonPageLayoutProps<TMetrics>,
) {
  const { steps, isDownstreamStale } = usePipelineSteps();
  const step4 = steps[3];

  if (!props.hasAnyTrained) {
    return (
      <PageLayout
        icon={props.icon}
        title={props.title}
        subtitle={props.subtitle}
      >
        <PrerequisiteGate step={step4} />
      </PageLayout>
    );
  }

  const primaryAction = props.nextStep
    ? { label: props.nextStep.linkText, linkTo: props.nextStep.linkTo }
    : { label: "Proceed to Final Validation", linkTo: "/validation" };

  return (
    <PageLayout
      icon={props.icon}
      title={props.title}
      subtitle={props.subtitle}
      primaryAction={primaryAction}
    >
      <ComparisonStaleBanner
        isStale={isDownstreamStale}
        hasAnyTrained={props.hasAnyTrained}
        noModelsLinkTo={props.noModelsLinkTo}
      />
      <ComparisonTabs
        algorithms={props.algorithms}
        defaultValue={props.defaultValue}
        tabs={props.tabs}
      />
    </PageLayout>
  );
}
