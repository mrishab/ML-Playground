import { useCallback } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { trainLDA } from "./trainLDA";
import { useLDAStore } from "./useLDAStore";

export function useLDAPage() {
  const data = useTrainingData();
  const store = useLDAStore();
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
      "Within/Between Scatter Ratio (Sw / Sb)",
      "Scatter Ratio",
      setTelemetry,
      "Fisher Discriminant Variance (%)",
      "%",
      25,
    );
    try {
      const results = await trainLDA(
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
