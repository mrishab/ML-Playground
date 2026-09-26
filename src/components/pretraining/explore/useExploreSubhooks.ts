import type { DataFrame } from "danfojs";
import type { MLConfigStore } from "@/stores/mlConfig/types";
import { useExploreOutliers } from "./useExploreOutliers";
import { useExploreSplit } from "./useExploreSplit";

type SubhooksParams = {
  df: DataFrame | null;
  numericColumns: string[];
  setDf: (df: DataFrame | null) => void;
  ml: MLConfigStore;
  selectedDataset: string;
  resetTrainingResults: () => void;
};

export function useExploreSubhooks({
  df,
  numericColumns,
  setDf,
  ml,
  selectedDataset,
  resetTrainingResults,
}: SubhooksParams) {
  const outliers = useExploreOutliers({
    df,
    numericColumns,
    setDf,
    clearSplitData: ml.clearSplitData,
    resetTrainingResults,
  });
  const split = useExploreSplit({
    df,
    shuffle: ml.shuffle,
    testSplitPercent: ml.testSplitPercent,
    selectedFeatures: ml.selectedFeatures,
    targetColumn: ml.targetColumn,
    problemType: ml.problemType,
    selectedDataset,
    resetTrainingResults,
    setSplitData: ml.setSplitData,
    isSplit: ml.isSplit,
    xTrain: ml.xTrain,
    xTest: ml.xTest,
  });
  return { ...outliers, ...split };
}
