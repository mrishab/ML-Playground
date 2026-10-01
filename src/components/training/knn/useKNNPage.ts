import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainKNN } from "./trainKNN";
import { useKNNK } from "./useKNNK";
import { useKNNStore } from "./useKNNStore";

export function useKNNPage() {
  const data = useTrainingData();
  const store = useKNNStore();
  const { k, setTrainingState, setError, setMetrics, setTelemetry } = store;
  const { effectiveMaxK } = useKNNK(data.xTrain);

  const runTraining = useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing required data. Please configure and split data first.");
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);
    const onStep = createTelemetryUpdater(
      "classification",
      "Neighborhood Distance Loss",
      "Distance Loss",
      setTelemetry,
      "Misclassification Rate (%)",
      "%",
      25,
    );
    try {
      const results = await trainKNN(xTrain, yTrain, xTest, yTest, targetColumn, k, onStep);
      setMetrics(results);
      setTrainingState("complete");
      saveTrainedModel({
        algorithm: "knn",
        algorithmName: "K-Nearest Neighbors",
        hyperparameters: { k, distanceMetric: "Euclidean" },
        metrics: results,
        k,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, k, setTrainingState, setError, setMetrics, setTelemetry]);

  return { ...data, ...store, effectiveMaxK, runTraining };
}
