import { useCallback } from "react";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { trainLogisticRegression } from "./trainLogisticRegression";

export function useLogisticRegressionPage() {
  const data = useTrainingData();
  const trainingState = useTrainingResultsStore(
    (s) => s.logisticRegression.trainingState,
  );
  const metrics = useTrainingResultsStore((s) => s.logisticRegression.metrics);
  const error = useTrainingResultsStore((s) => s.logisticRegression.error);

  const setTrainingState = useTrainingResultsStore(
    (s) => s.setLogisticRegressionState,
  );
  const setMetrics = useTrainingResultsStore(
    (s) => s.setLogisticRegressionMetrics,
  );
  const setError = useTrainingResultsStore((s) => s.setLogisticRegressionError);
  const reset = useTrainingResultsStore((s) => s.resetLogisticRegression);

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
      const results = await trainLogisticRegression(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
      );
      setMetrics(results);
      setTrainingState("complete");
    } catch (err) {
      console.error("[LogisticRegression] Training failed:", err);
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
