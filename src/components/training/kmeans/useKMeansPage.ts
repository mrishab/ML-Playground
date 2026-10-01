import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createKMeansTelemetry } from "./kmeansTelemetry";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainKMeans } from "./trainKMeans";
import { useKMeansStore } from "./useKMeansStore";

export function useKMeansPage() {
  const data = useTrainingData();
  const store = useKMeansStore();
  const { k, setTrainingState, setError, setMetrics, setTelemetry } = store;

  const runTraining = useCallback(async () => {
    if (!data.xTrain) {
      setError("Please select and split dataset features before clustering.");
      return;
    }
    const rawData = data.xTrain.values as number[][];
    if (rawData.length < k) {
      setError(`Fewer samples (${rawData.length}) than clusters k (${k}).`);
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);
    const onStep = createKMeansTelemetry(setTelemetry);
    try {
      const results = await trainKMeans(rawData, data.featureNames, k, 25, onStep);
      setMetrics(results);
      setTrainingState("complete");
      saveTrainedModel({
        algorithm: "clustering",
        algorithmName: "K-Means Clustering",
        hyperparameters: { k, maxIter: 25, initialization: "Random Partition" },
        metrics: results,
        k,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Clustering failed");
      setTrainingState("error");
    }
  }, [data.xTrain, data.featureNames, k, setTrainingState, setError, setMetrics, setTelemetry]);

  return { ...data, ...store, runTraining };
}
