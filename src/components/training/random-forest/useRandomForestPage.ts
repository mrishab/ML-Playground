import { useCallback, useState } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { handleEnsembleResult } from "@/components/training/shared/saveEnsembleModel";
import { trainRandomForest } from "@/lib/random-forest/trainRandomForest";
import { useRandomForestStore } from "./useRandomForestStore";

export function useRandomForestPage() {
  const data = useTrainingData();
  const store = useRandomForestStore();
  const [importances, setImportances] = useState<{ feature: string; score: number }[]>([]);

  const runTraining = useCallback(async () => {
    const { canTrain, xTrain, xTest, yTrain, yTest, targetColumn } = data;
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      store.setError("Missing required data. Please select features and split data first.");
      return;
    }
    store.setTrainingState("training");
    store.setError(null);
    store.setClassificationMetrics(null);
    store.setRegressionMetrics(null);

    const isReg = data.problemType === "regression";
    const onStep = createTelemetryUpdater(
      isReg ? "regression" : "classification",
      isReg ? "Mean Squared Error" : "Ensemble Error",
      isReg ? "MSE" : "Error",
      store.setTelemetry,
      isReg ? "R² Fit (%)" : "Accuracy (%)",
      "%",
    );

    try {
      const res = await trainRandomForest(
        xTrain, yTrain, xTest, yTest, targetColumn,
        isReg ? "regression" : "classification",
        { nEstimators: store.nEstimators, maxDepth: store.maxDepth },
        onStep,
      );
      setImportances(res.featureImportance);
      handleEnsembleResult("random-forest", "Random Forest", {
        nEstimators: store.nEstimators,
        maxDepth: store.maxDepth,
      }, res, store);
      store.setTrainingState("complete");
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Training failed");
      store.setTrainingState("error");
    }
  }, [data, store]);

  return { ...data, ...store, importances, runTraining };
}
