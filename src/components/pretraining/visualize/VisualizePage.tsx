import { BarChart3 } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { FeatureTabs } from "./FeatureTabs";
import { ScatterPlot } from "./ScatterPlot";
import { useVisualizePage } from "./useVisualizePage";
import { useFeatureTabs } from "./useFeatureTabs";

export function VisualizePage() {
  const v = useVisualizePage();
  const tabs = useFeatureTabs({
    features: v.featureNames,
    targetColumn: v.targetColumn,
    renderContent: (f) => (
      <ScatterPlot
        {...v.getFeatureData(f)}
        xLabel={f}
        yLabel={v.targetColumn}
      />
    ),
  });

  const { steps } = usePipelineSteps();
  if (!v.isSplit) {
    return (
      <PageLayout
        icon={BarChart3}
        title="Visualize"
        subtitle="Scatter plots and feature correlations"
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
      title="Visualize"
      subtitle={`${count} feature${count > 1 ? "s" : ""} vs ${v.targetColumn}`}
      nextStep={{
        message: "Ready to train.",
        linkTo: nextLink,
        linkText: "Train Models",
      }}
    >
      <FeatureTabs tabs={tabs} />
    </PageLayout>
  );
}
