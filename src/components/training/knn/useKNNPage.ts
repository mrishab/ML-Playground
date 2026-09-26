import { useCallback } from "react";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { trainKNN } from "./trainKNN";
import { useKNNK } from "./useKNNK";

export function useKNNPage() {
  const data = useTrainingData();
  const { k, setK, effectiveMaxK } = useKNNK(data.xTrain);
  const trainingState = useTrainingResultsStore((s) => s.knn.trainingState);
  const metrics = useTrainingResultsStore((s) => s.knn.metrics);
  const error = useTrainingResultsStore((s) => s.knn.error);
  const setTrainingState = useTrainingResultsStore((s) => s.setKNNState);
  const setMetrics = useTrainingResultsStore((s) => s.setKNNMetrics);
  const setError = useTrainingResultsStore((s) => s.setKNNError);
  const reset = useTrainingResultsStore((s) => s.resetKNN);

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
      const results = await trainKNN(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
        k,
      );
      setMetrics(results);
      setTrainingState("complete");
    } catch (err) {
      console.error("[KNN] Training failed:", err);
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, k, setTrainingState, setError, setMetrics]);

  return {
    ...data,
    trainingState,
    metrics,
    error,
    k,
    setK,
    effectiveMaxK,
    runTraining,
    reset,
  };
}
