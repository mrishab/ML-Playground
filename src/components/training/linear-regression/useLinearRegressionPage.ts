import { useState, useCallback, useMemo } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";
import { initScikitjs, sk } from "@/lib/scikitjs";
import type { RegressionMetrics, TrainingState } from "@/types/regression";

function calculateMetrics(
  predictions: number[],
  actuals: number[],
): RegressionMetrics {
  const n = predictions.length;

  // Calculate mean of actuals
  const yMean = actuals.reduce((sum, y) => sum + y, 0) / n;

  // Calculate residuals and squared residuals
  const residuals = actuals.map((y, i) => y - predictions[i]);
  const squaredResiduals = residuals.map((r) => r * r);

  // RSS: Residual Sum of Squares = Σ(y_i - ŷ_i)²
  const rss = squaredResiduals.reduce((sum, sr) => sum + sr, 0);

  // TSS: Total Sum of Squares = Σ(y_i - ȳ)²
  const tss = actuals.reduce((sum, y) => sum + (y - yMean) ** 2, 0);

  // MSE: Mean Squared Error = RSS / n
  const mse = rss / n;

  // RSE: Residual Standard Error = √(RSS / (n - 2))
  // Note: n-2 for simple linear regression (2 parameters: intercept + slope)
  const rse = Math.sqrt(rss / (n - 2));

  // R²: Coefficient of Determination = 1 - (RSS / TSS)
  const rSquared = 1 - rss / tss;

  return {
    mse,
    rse,
    rSquared,
    residuals,
    squaredResiduals,
    rss,
    tss,
    yMean,
    n,
    predictions,
    actuals,
  };
}

export function useLinearRegressionPage() {
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const xTest = useMLConfigStore((state) => state.xTest);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const yTest = useMLConfigStore((state) => state.yTest);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);

  const [trainingState, setTrainingState] = useState<TrainingState>("idle");
  const [metrics, setMetrics] = useState<RegressionMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  const featureNames = useMemo(() => {
    if (!xTrain) return [];
    return xTrain.columns as string[];
  }, [xTrain]);

  const canTrain = useMemo(() => {
    return !!(isSplit && xTrain && xTest && yTrain && yTest && targetColumn);
  }, [isSplit, xTrain, xTest, yTrain, yTest, targetColumn]);

  const runTraining = useCallback(async () => {
    if (!canTrain || !xTrain || !xTest || !yTrain || !yTest || !targetColumn) {
      setError("Missing required data. Please configure and split data first.");
      return;
    }

    setTrainingState("training");
    setError(null);
    setMetrics(null);

    try {
      await initScikitjs();

      // Extract training data as 2D array
      const XTrainData = xTrain.values as number[][];
      const yTrainData = yTrain.column(targetColumn).values as number[];

      // Extract test data
      const XTestData = xTest.values as number[][];
      const yTestData = yTest.column(targetColumn).values as number[];

      // Create and train model
      const model = new sk.LinearRegression({ fitIntercept: true });
      await model.fit(XTrainData, yTrainData);

      // Make predictions on test set
      const predictionsResult = await model.predict(XTestData);
      const predictions = Array.isArray(predictionsResult)
        ? (predictionsResult as number[])
        : (predictionsResult.arraySync() as number[]);

      // Calculate metrics
      const calculatedMetrics = calculateMetrics(predictions, yTestData);
      setMetrics(calculatedMetrics);
      setTrainingState("complete");
    } catch (err) {
      console.error("[LinearRegression] Training failed:", err);
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [canTrain, xTrain, xTest, yTrain, yTest, targetColumn]);

  const reset = useCallback(() => {
    setTrainingState("idle");
    setMetrics(null);
    setError(null);
  }, []);

  return {
    // State
    trainingState,
    metrics,
    error,
    isSplit,
    canTrain,
    featureNames,
    targetColumn,

    // Actions
    runTraining,
    reset,
  };
}
