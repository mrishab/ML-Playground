import { type LucideIcon } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { StaleWarningBanner } from "@/components/pipeline/StaleWarningBanner";
import {
  ComparisonTabs,
  type ComparisonAlgorithm,
} from "@/components/comparison/ComparisonTabs";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore } from "@/stores/pipeline";

type ComparisonPageLayoutProps<TMetrics> = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  hasAnyTrained: boolean;
  algorithms: ComparisonAlgorithm<TMetrics>[];
  tabs: {
    value: string;
    label: string;
    renderContent: (metrics: TMetrics) => React.ReactNode;
  }[];
  defaultValue: string;
  noModelsLinkTo: string;
  nextStep?: {
    message: string;
    linkTo: string;
    linkText: string;
  };
};

export function ComparisonPageLayout<TMetrics>({
  title,
  subtitle,
  icon,
  hasAnyTrained,
  algorithms,
  tabs,
  defaultValue,
  noModelsLinkTo,
  nextStep,
}: ComparisonPageLayoutProps<TMetrics>) {
  const { steps, isDownstreamStale } = usePipelineSteps();
  const revertExploreChanges = usePipelineStore(
    (state) => state.revertExploreChanges,
  );
  const step4 = steps[3];

  if (!hasAnyTrained) {
    return (
      <PageLayout icon={icon} title={title} subtitle={subtitle}>
        <PrerequisiteGate step={step4} />
      </PageLayout>
    );
  }

  const primaryAction = nextStep
    ? {
        label: nextStep.linkText,
        linkTo: nextStep.linkTo,
      }
    : {
        label: "Proceed to Final Validation",
        linkTo: "/validation",
      };

  return (
    <PageLayout
      icon={icon}
      title={title}
      subtitle={subtitle}
      primaryAction={primaryAction}
    >
      {/* Downstream Stale State Banner */}
      {isDownstreamStale && hasAnyTrained && (
        <StaleWarningBanner
          title="Comparison Results May Be Outdated"
          message="Upstream split parameters were modified after models were trained. Comparison tables reflect previous data splits. Re-split or re-train models to update."
          onRevert={revertExploreChanges}
          revertLabel="Revert Split Changes"
          onRecompute={() => {
            window.location.href = noModelsLinkTo;
          }}
          recomputeLabel="Go to Training Stage"
        />
      )}

      <ComparisonTabs
        algorithms={algorithms}
        defaultValue={defaultValue}
        tabs={tabs}
      />
    </PageLayout>
  );
}
