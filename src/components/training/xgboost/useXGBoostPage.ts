import { useCallback, useState } from "react";
import { useTrainingData } from "@/components/training/shared/useTrainingData";
import { createTelemetryUpdater } from "@/components/training/shared/createTelemetryUpdater";
import { handleEnsembleResult } from "@/components/training/shared/saveEnsembleModel";
import { trainXGBoost } from "@/lib/xgboost/trainXGBoost";
import { useXGBoostStore } from "./useXGBoostStore";

export function useXGBoostPage() {
  const data = useTrainingData();
  const store = useXGBoostStore();
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
      isReg ? "Residual MSE" : "Boosting Log-Loss",
      isReg ? "MSE" : "Log-Loss",
      store.setTelemetry,
      isReg ? "R² Fit (%)" : "Accuracy (%)",
      "%",
    );

    try {
      const res = await trainXGBoost(
        xTrain, yTrain, xTest, yTest, targetColumn,
        isReg ? "regression" : "classification",
        { nEstimators: store.nEstimators, maxDepth: store.maxDepth, learningRate: 0.1 },
        onStep,
      );
      setImportances(res.featureImportance);
      handleEnsembleResult("xgboost", "XGBoost", {
        nEstimators: store.nEstimators,
        maxDepth: store.maxDepth,
        learningRate: 0.1,
      }, res, store);
      store.setTrainingState("complete");
    } catch (err) {
      store.setError(err instanceof Error ? err.message : "Training failed");
      store.setTrainingState("error");
    }
  }, [data, store]);

  return { ...data, ...store, importances, runTraining };
}
