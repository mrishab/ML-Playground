import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { trainLogisticRegression } from "./trainLogisticRegression";
import { useLogisticRegressionStore } from "./useLogisticRegressionStore";

export function useLogisticRegressionPage() {
  const data = useTrainingData();
  const store = useLogisticRegressionStore();
  const { setTrainingState, setError, setMetrics, setTelemetry } = store;

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
      "Cross-Entropy Loss (Log-Loss)",
      "Log-Loss",
      setTelemetry,
      "Accuracy (%)",
      "%",
    );
    try {
      const results = await trainLogisticRegression(
        xTrain,
        yTrain,
        xTest,
        yTest,
        targetColumn,
        onStep,
      );
      setMetrics(results);
      setTrainingState("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [data, setTrainingState, setError, setMetrics, setTelemetry]);

  return { ...data, ...store, runTraining };
}
