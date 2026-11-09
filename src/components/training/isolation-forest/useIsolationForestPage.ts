import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { saveTrainedModel } from "@/lib/models/saveTrainedModel";
import { trainIsolationForest } from "@/lib/isolation-forest/trainIsolationForest";
import { useIsolationForestStore } from "./useIsolationForestStore";

export function useIsolationForestPage() {
  const data = useTrainingData();
  const store = useIsolationForestStore();
  const { setTrainingState, setError, setMetrics, setTelemetry } = store;
  const canTrain = Boolean(data.xTrain && data.xTrain.shape[0] > 0);

  const runTraining = useCallback(async () => {
    const { xTrain } = data;
    if (!xTrain || xTrain.shape[0] === 0) {
      setError("Missing feature data. Please select features and split data first.");
      return;
    }
    setTrainingState("training");
    setError(null);
    setMetrics(null);

    const onStep = createTelemetryUpdater(
      "anomaly", "Isolation Path Length Variance", "Var",
      setTelemetry, "Estimated Anomalies", "pts",
    );

    try {
      const res = await trainIsolationForest(
        xTrain,
        { nEstimators: store.nEstimators, maxSamples: 256, contamination: store.contamination },
        onStep,
      );
      setMetrics(res);
      saveTrainedModel({
        algorithm: "isolation-forest",
        algorithmName: "Isolation Forest",
        hyperparameters: {
          nEstimators: store.nEstimators,
          contamination: store.contamination,
          maxSamples: 256,
        },
        metrics: res,
      });
      setTrainingState("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, store.nEstimators, store.contamination, setTrainingState, setError, setMetrics, setTelemetry]);

  return { ...data, ...store, canTrain, runTraining };
}
