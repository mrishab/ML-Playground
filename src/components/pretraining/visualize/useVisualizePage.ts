import { useMemo, useCallback } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";
import {
  extractFeatureSeries,
  type FeatureDataResult,
} from "./featureSeriesExtractor";

export type { FeatureDataResult };

export function useVisualizePage() {
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);
  const problemType = useMLConfigStore((state) => state.problemType);

  const featureNames = useMemo(() => {
    if (!xTrain) return [];
    return xTrain.columns as string[];
  }, [xTrain]);

  const getFeatureData = useCallback(
    (featureName: string): FeatureDataResult => {
      return extractFeatureSeries(xTrain, yTrain, targetColumn, featureName);
    },
    [xTrain, yTrain, targetColumn],
  );

  return {
    featureNames,
    targetColumn,
    isSplit,
    problemType,
    getFeatureData,
  };
}
