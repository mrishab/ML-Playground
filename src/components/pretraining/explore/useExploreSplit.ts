import { useCallback, useMemo } from "react";
import { usePipelineStore } from "@/stores/pipeline";
import { executeDataSplit } from "./splitLogic";
import type { ExploreSplitHookParams } from "./exploreSplitTypes";

export function useExploreSplit(p: ExploreSplitHookParams) {
  const canSplit = useMemo(() => {
    return Boolean(
      p.df &&
        p.targetColumn !== "" &&
        p.selectedFeatures.length > 0 &&
        !p.selectedFeatures.some((f) => f.column === p.targetColumn),
    );
  }, [p.df, p.targetColumn, p.selectedFeatures]);

  const performSplit = useCallback(() => {
    if (!p.df || !canSplit) return;
    p.resetTrainingResults();
    const splitResult = executeDataSplit({
      df: p.df,
      shuffle: p.shuffle,
      testSplitPercent: p.testSplitPercent,
      selectedFeatures: p.selectedFeatures,
      targetColumn: p.targetColumn,
    });
    p.setSplitData(splitResult);
    usePipelineStore.getState().recordSplit({
      datasetName: p.selectedDataset,
      problemType: p.problemType,
      targetColumn: p.targetColumn,
      selectedFeatures: p.selectedFeatures,
      testSplitPercent: p.testSplitPercent,
      shuffle: p.shuffle,
    });
  }, [p, canSplit]);

  const splitStats = useMemo(() => {
    if (!p.isSplit || !p.xTrain || !p.xTest) return null;
    return {
      trainRows: p.xTrain.shape[0],
      testRows: p.xTest.shape[0],
      featureCount: p.xTrain.shape[1],
      featureNames: p.xTrain.columns as string[],
    };
  }, [p.isSplit, p.xTrain, p.xTest]);

  return { canSplit, performSplit, splitStats };
}
