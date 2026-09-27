import { useFeatureTabs, type FeatureTabItem } from "./useFeatureTabs";
import { FeatureAnalysisTab } from "./FeatureAnalysisTab";
import { OverviewTab } from "./overview/OverviewTab";
import type { FeatureDataResult } from "./useVisualizePage";

interface Props {
  featureNames: string[];
  targetColumn: string;
  problemType: string;
  getFeatureData: (f: string) => FeatureDataResult;
}

export function useVisualizeTabs(v: Props): FeatureTabItem[] {
  return useFeatureTabs({
    features: v.featureNames,
    targetColumn: v.targetColumn,
    overviewContent: (
      <OverviewTab
        featureNames={v.featureNames}
        targetColumn={v.targetColumn}
        getFeatureData={v.getFeatureData}
      />
    ),
    renderContent: (f) => {
      const d = v.getFeatureData(f);
      return (
        <FeatureAnalysisTab
          x={d.x}
          y={d.rawY.length > 0 ? d.rawY : d.y}
          featureName={f}
          targetColumn={v.targetColumn}
          problemType={v.problemType}
        />
      );
    },
  });
}
