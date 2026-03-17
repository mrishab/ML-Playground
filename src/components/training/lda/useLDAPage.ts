import { useState, useCallback, useMemo } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";
import { fitLDA, predictLDA, predictProbaLDA } from "@/lib/lda";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";
import type { ClassificationMetrics } from "@/types/classification";
import type { TrainingState } from "@/types/classification";

export function useLDAPage() {
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const xTest = useMLConfigStore((state) => state.xTest);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const yTest = useMLConfigStore((state) => state.yTest);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);

  const [trainingState, setTrainingState] = useState<TrainingState>("idle");
  const [metrics, setMetrics] = useState<ClassificationMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const featureNames = useMemo(() => {
    if (!xTrain) return [];
    return xTrain.columns as string[];
  }, [xTrain]);

  const canTrain = useMemo(() => {
    return !!(isSplit && xTrain && xTest && yTrain && yTest && targetColumn);
  }, [isSplit, xTrain, xTest, yTrain, yTest, targetColumn]);

  const runTraining = useCallback(async () => {
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing required data. Please configure and split data first.");
      return;
    }

    setTrainingState("training");
    setError(null);
    setMetrics(null);

    try {
      // Extract data as arrays
      const XTrainData = xTrain.values as number[][];
      const yTrainData = yTrain.column(targetColumn).values as (
        | string
        | number
      )[];
      const XTestData = xTest.values as number[][];
      const yTestData = yTest.column(targetColumn).values as (
        | string
        | number
      )[];

      const yTrainStr = yTrainData.map(String);
      const yTestStr = yTestData.map(String);

      // Fit LDA model
      const model = fitLDA(XTrainData, yTrainStr);

      // Predict on test set
      const predictions = predictLDA(model, XTestData);

      // Compute posterior probabilities for ROC curves
      const classScores = predictProbaLDA(model, XTestData);

      // Calculate classification metrics (with probability scores for ROC)
      const calculatedMetrics = calculateClassificationMetrics(
        predictions,
        yTestStr,
        classScores,
      );

      setMetrics(calculatedMetrics);
      setTrainingState("complete");
    } catch (err) {
      console.error("[LDA] Training failed:", err);
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [canTrain, xTrain, xTest, yTrain, yTest, targetColumn]);

  const reset = useCallback(() => {
    setTrainingState("idle");
    setMetrics(null);
    setError(null);
  }, []);

  return {
    // State
    trainingState,
    metrics,
    error,
    isSplit,
    canTrain,
    featureNames,
    targetColumn,

    // Actions
    runTraining,
    reset,
  };
}
