import { BarChart3 } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { FeatureTabs } from "./FeatureTabs";
import { useVisualizePage } from "./useVisualizePage";
import { useVisualizeTabs } from "./useVisualizeTabs";

export function VisualizePage() {
  const v = useVisualizePage();
  const { steps, defaultTrainRoute } = usePipelineSteps();
  const tabs = useVisualizeTabs(v);
  const step3 = steps[2];

  if (!v.isSplit) {
    return (
      <PageLayout
        icon={BarChart3}
        title="Feature Analysis"
        subtitle="Scatter plots, correlations, and density heatmaps"
      >
        <PrerequisiteGate step={step3} />
      </PageLayout>
    );
  }

  const count = v.featureNames.length;

  return (
    <PageLayout
      icon={BarChart3}
      title="Feature Analysis"
      subtitle={`${count} feature${count > 1 ? "s" : ""} vs ${v.targetColumn} (${v.problemType ?? "regression"})`}
      primaryAction={{
        label: "Proceed to Model Training",
        linkTo: defaultTrainRoute,
      }}
    >
      <FeatureTabs tabs={tabs} />
    </PageLayout>
  );
}
