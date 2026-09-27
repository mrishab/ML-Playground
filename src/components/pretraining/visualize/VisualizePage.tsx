import { BarChart3 } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { FeatureTabs } from "./FeatureTabs";
import { PretrainSubNav } from "../shared/PretrainSubNav";
import { useVisualizePage } from "./useVisualizePage";
import { useVisualizeTabs } from "./useVisualizeTabs";

export function VisualizePage() {
  const v = useVisualizePage();
  const { steps } = usePipelineSteps();
  const tabs = useVisualizeTabs(v);

  if (!v.isSplit) {
    return (
      <PageLayout
        icon={BarChart3}
        title="Feature Analysis"
        subtitle="Scatter plots, correlations, and density heatmaps"
        actions={<PretrainSubNav isSplit={false} />}
      >
        <PrerequisiteGate step={steps[1]} />
      </PageLayout>
    );
  }

  const count = v.featureNames.length;
  const nextLink =
    v.problemType === "regression" ? "/train/linear" : "/train/knn";

  return (
    <PageLayout
      icon={BarChart3}
      title="Feature Analysis"
      subtitle={`${count} feature${count > 1 ? "s" : ""} vs ${v.targetColumn} (${v.problemType ?? "regression"})`}
      actions={<PretrainSubNav isSplit={v.isSplit} />}
      primaryAction={{
        label: "Proceed to Model Training",
        linkTo: nextLink,
      }}
    >
      <FeatureTabs tabs={tabs} />
    </PageLayout>
  );
}
