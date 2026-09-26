import type { LastSplitConfig } from "./types";
import type { ProblemType, SelectedFeature } from "@/stores/mlConfig";

interface CurrentExploreSettings {
  datasetName: string;
  problemType: ProblemType;
  targetColumn: string;
  selectedFeatures: SelectedFeature[];
  testSplitPercent: number;
  shuffle: boolean;
}

export function areExploreSettingsDirty(
  lastSplitConfig: LastSplitConfig | null,
  current: CurrentExploreSettings,
): boolean {
  if (!lastSplitConfig) return false;
  if (lastSplitConfig.datasetName !== current.datasetName) return true;
  if (lastSplitConfig.problemType !== current.problemType) return true;
  if (lastSplitConfig.targetColumn !== current.targetColumn) return true;
  if (lastSplitConfig.testSplitPercent !== current.testSplitPercent)
    return true;
  if (lastSplitConfig.shuffle !== current.shuffle) return true;

  if (
    lastSplitConfig.selectedFeatures.length !== current.selectedFeatures.length
  ) {
    return true;
  }

  for (let i = 0; i < lastSplitConfig.selectedFeatures.length; i++) {
    const f1 = lastSplitConfig.selectedFeatures[i];
    const f2 = current.selectedFeatures[i];
    if (!f2) return true;
    if (f1.column !== f2.column || f1.transformation !== f2.transformation)
      return true;
    if (f1.polynomialDegree !== f2.polynomialDegree) return true;
    if (f1.interactionWith !== f2.interactionWith) return true;
  }

  return false;
}
