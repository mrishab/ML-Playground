import { BarChart3 } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { PrerequisiteGate } from "@/components/pipeline/PrerequisiteGate";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { FeatureTabs } from "./FeatureTabs";
import { ScatterPlot } from "./ScatterPlot";
import { useVisualizePage } from "./useVisualizePage";
import { useFeatureTabs } from "./useFeatureTabs";

export function VisualizePage() {
  const { featureNames, targetColumn, isSplit, problemType, getFeatureData } =
    useVisualizePage();

  const tabs = useFeatureTabs({
    features: featureNames,
    targetColumn,
    renderContent: (feature) => {
      const data = getFeatureData(feature);
      return (
        <ScatterPlot
          x={data.x}
          y={data.y}
          xLabel={feature}
          yLabel={targetColumn}
        />
      );
    },
  });

  const { steps } = usePipelineSteps();
  const step2 = steps[1];

  if (!isSplit) {
    return (
      <PageLayout
        icon={BarChart3}
        title="Visualize"
        subtitle="Explore your data through visualizations"
      >
        <PrerequisiteGate step={step2} />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      icon={BarChart3}
      title="Visualize"
      subtitle={`Feature correlations and scatter plots for ${featureNames.length} feature${featureNames.length > 1 ? "s" : ""} vs ${targetColumn}`}
      nextStep={{
        message: "Ready to train. Choose a model.",
        linkTo: problemType === "regression" ? "/train/linear" : "/train/knn",
        linkText: "Go to Training",
      }}
    >
      <FeatureTabs tabs={tabs} />
    </PageLayout>
  );
}
