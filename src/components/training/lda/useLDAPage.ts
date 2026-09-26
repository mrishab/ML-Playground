import { useCallback } from "react";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { trainLDA } from "./trainLDA";

export function useLDAPage() {
  const data = useTrainingData();
  const trainingState = useTrainingResultsStore((s) => s.lda.trainingState);
  const metrics = useTrainingResultsStore((s) => s.lda.metrics);
  const error = useTrainingResultsStore((s) => s.lda.error);

  const setTrainingState = useTrainingResultsStore((s) => s.setLDAState);
  const setMetrics = useTrainingResultsStore((s) => s.setLDAMetrics);
  const setError = useTrainingResultsStore((s) => s.setLDAError);
  const reset = useTrainingResultsStore((s) => s.resetLDA);

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
      const results = trainLDA(xTrain, yTrain, xTest, yTest, targetColumn);
      setMetrics(results);
      setTrainingState("complete");
    } catch (err) {
      console.error("[LDA] Training failed:", err);
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
