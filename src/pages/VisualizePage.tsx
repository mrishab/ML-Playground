import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";
import { NoDatasetAlert } from "@/components/NoDatasetAlert";
import { FeatureTabs } from "@/components/FeatureTabs";
import { ScatterPlot } from "@/components/ScatterPlot";
import { useFeatureTabs } from "@/components/useFeatureTabs";
import { useVisualizePage } from "./useVisualizePage";

export function VisualizePage() {
  const { featureNames, targetColumn, isSplit, getFeatureData } =
    useVisualizePage();

  const tabs = useFeatureTabs({
    features: featureNames,
    targetColumn,
    renderContent: (feature, target) => {
      const { x, y } = getFeatureData(feature);
      return (
        <Card>
          <CardContent className="pt-6">
            <ScatterPlot x={x} y={y} xLabel={feature} yLabel={target} />
          </CardContent>
        </Card>
      );
    },
  });

  // No split data available
  if (!isSplit) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <PageHeader
          icon={BarChart3}
          title="Visualize"
          subtitle="Create scatter plots of features vs target variable"
        />
        <NoDatasetAlert
          title="No split data available"
          description="Please configure and split your data in the Explore page first."
          showLink={false}
        />
      </div>
    );
  }

  // No features selected
  if (featureNames.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <PageHeader
          icon={BarChart3}
          title="Visualize"
          subtitle="Create scatter plots of features vs target variable"
        />
        <NoDatasetAlert
          title="No features available"
          description="No feature columns found in the split data."
          showLink={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <PageHeader
        icon={BarChart3}
        title="Visualize"
        subtitle={`Scatter plots of ${featureNames.length} feature${featureNames.length > 1 ? "s" : ""} vs ${targetColumn}`}
      />
      <FeatureTabs tabs={tabs} />
    </div>
  );
}
