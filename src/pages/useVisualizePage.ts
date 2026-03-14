import { useMemo, useCallback } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";

export function useVisualizePage() {
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);

  const featureNames = useMemo(() => {
    if (!xTrain) return [];
    return xTrain.columns as string[];
  }, [xTrain]);

  const getFeatureData = useCallback(
    (featureName: string): { x: number[]; y: number[] } => {
      if (!xTrain || !yTrain || !targetColumn) {
        return { x: [], y: [] };
      }
      const x = xTrain.column(featureName).values as number[];
      const y = yTrain.column(targetColumn).values as number[];
      return { x, y };
    },
    [xTrain, yTrain, targetColumn],
  );

  return {
    featureNames,
    targetColumn,
    isSplit,
    getFeatureData,
  };
}
