import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { trainLinearRegression } from "./trainLinearRegression";
import { useLinearRegressionStore } from "./useLinearRegressionStore";

export function useLinearRegressionPage() {
  const data = useTrainingData();
  const store = useLinearRegressionStore();
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
      "regression",
      "Mean Squared Error (MSE)",
      "MSE",
      setTelemetry,
    );
    try {
      const results = await trainLinearRegression(
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
