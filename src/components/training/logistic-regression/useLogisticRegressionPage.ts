import { useCallback, useMemo } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { initScikitjs, sk } from "@/lib/scikitjs";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";

export function useLogisticRegressionPage() {
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const xTest = useMLConfigStore((state) => state.xTest);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const yTest = useMLConfigStore((state) => state.yTest);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);

  const trainingState = useTrainingResultsStore(
    (s) => s.logisticRegression.trainingState,
  );
  const metrics = useTrainingResultsStore((s) => s.logisticRegression.metrics);
  const error = useTrainingResultsStore((s) => s.logisticRegression.error);

  const setTrainingState = useTrainingResultsStore(
    (s) => s.setLogisticRegressionState,
  );
  const setMetrics = useTrainingResultsStore(
    (s) => s.setLogisticRegressionMetrics,
  );
  const setError = useTrainingResultsStore((s) => s.setLogisticRegressionError);
  const resetStore = useTrainingResultsStore((s) => s.resetLogisticRegression);

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

      const XTrainData = xTrain.values as number[][];
      const yTrainData = yTrain.column(targetColumn).values as (
        | string
        | number
      )[];
      const XTestData = xTest.values as number[][];
      const yTestData = yTest.column(targetColumn).values as (
        | string
        | number
      )[];

      const yTrainStr = yTrainData.map(String);
      const yTestStr = yTestData.map(String);

      // Encode string labels as integers for TensorFlow compatibility
      const uniqueLabels = Array.from(new Set(yTrainStr)).sort();
      const labelToIndex = new Map(uniqueLabels.map((l, i) => [l, i]));
      const yTrainEncoded = yTrainStr.map((l) => labelToIndex.get(l)!);

      // Create and train logistic regression model
      const model = new sk.LogisticRegression({ penalty: "l2" });
      await model.fit(XTrainData, yTrainEncoded);

      // Predict class labels
      const predictionsResult = await model.predict(XTestData);
      const predictedIndices: number[] = Array.isArray(predictionsResult)
        ? (predictionsResult as number[])
        : (predictionsResult.arraySync() as number[]);

      const predictions = predictedIndices.map(
        (idx) => uniqueLabels[Math.round(idx)],
      );

      // Attempt to get probability scores for ROC curves
      let classScores: Map<string, number[]> | undefined;
      try {
        const probaResult = await model.predictProba(XTestData);
        const probaArray: number[][] = Array.isArray(probaResult)
          ? (probaResult as number[][])
          : (probaResult.arraySync() as number[][]);

        if (
          probaArray.length > 0 &&
          probaArray[0].length === uniqueLabels.length
        ) {
          classScores = new Map<string, number[]>();
          for (let k = 0; k < uniqueLabels.length; k++) {
            classScores.set(
              uniqueLabels[k],
              probaArray.map((row) => row[k]),
            );
          }
        }
      } catch {
        // predictProba not available or failed; fall back to hard predictions
      }

      const calculatedMetrics = calculateClassificationMetrics(
        predictions,
        yTestStr,
        classScores,
      );

      setMetrics(calculatedMetrics);
      setTrainingState("complete");
    } catch (err) {
      console.error("[LogisticRegression] Training failed:", err);
      setError(err instanceof Error ? err.message : "Training failed");
      setTrainingState("error");
    }
  }, [
    canTrain,
    xTrain,
    xTest,
    yTrain,
    yTest,
    targetColumn,
    setTrainingState,
    setError,
    setMetrics,
  ]);

  const reset = useCallback(() => {
    resetStore();
  }, [resetStore]);

  return {
    trainingState,
    metrics,
    error,
    isSplit,
    canTrain,
    featureNames,
    targetColumn,
    runTraining,
    reset,
  };
}
