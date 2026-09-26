import { useMemo } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";

export function useTrainingData() {
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const xTest = useMLConfigStore((state) => state.xTest);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const yTest = useMLConfigStore((state) => state.yTest);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);

  const featureNames = useMemo(() => {
    if (!xTrain) return [];
    return xTrain.columns as string[];
  }, [xTrain]);

  const canTrain = useMemo(() => {
    return Boolean(
      isSplit && xTrain && xTest && yTrain && yTest && targetColumn,
    );
  }, [isSplit, xTrain, xTest, yTrain, yTest, targetColumn]);

  return {
    xTrain,
    xTest,
    yTrain,
    yTest,
    targetColumn,
    isSplit,
    featureNames,
    canTrain,
  };
}
