import { useCallback } from "react";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { trainLinearRegression } from "./trainLinearRegression";

export function useLinearRegressionPage() {
  const data = useTrainingData();
  const trainingState = useTrainingResultsStore(
    (s) => s.linearRegression.trainingState,
  );
  const metrics = useTrainingResultsStore((s) => s.linearRegression.metrics);
  const error = useTrainingResultsStore((s) => s.linearRegression.error);
  const setTrainingState = useTrainingResultsStore(
    (s) => s.setLinearRegressionState,
  );
  const setMetrics = useTrainingResultsStore(
    (s) => s.setLinearRegressionMetrics,
  );
  const setError = useTrainingResultsStore((s) => s.setLinearRegressionError);
  const reset = useTrainingResultsStore((s) => s.resetLinearRegression);

  const runTraining = useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing required data. Please configure and split data first.");
      return;
    }

    setTrainingState("training");
    setError(null);
    setMetrics(null);

    try {
      const calculatedMetrics = await trainLinearRegression(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
      );
      setMetrics(calculatedMetrics);
      setTrainingState("complete");
    } catch (err) {
      console.error("[LinearRegression] Training failed:", err);
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, setTrainingState, setError, setMetrics]);

  return {
    ...data,
    trainingState,
    metrics,
    error,
    runTraining,
    reset,
  };
}
