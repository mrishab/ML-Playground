import { useCallback, useMemo } from "react";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { initScikitjs, sk } from "@/lib/scikitjs";
import { calculateClassificationMetrics } from "@/lib/classificationMetrics";

const MIN_K = 1;
const MAX_K = 50;

export function useKNNPage() {
  const xTrain = useMLConfigStore((state) => state.xTrain);
  const xTest = useMLConfigStore((state) => state.xTest);
  const yTrain = useMLConfigStore((state) => state.yTrain);
  const yTest = useMLConfigStore((state) => state.yTest);
  const targetColumn = useMLConfigStore((state) => state.targetColumn);
  const isSplit = useMLConfigStore((state) => state.isSplit);

  const trainingState = useTrainingResultsStore((s) => s.knn.trainingState);
  const metrics = useTrainingResultsStore((s) => s.knn.metrics);
  const error = useTrainingResultsStore((s) => s.knn.error);
  const k = useTrainingResultsStore((s) => s.knn.k);

  const setTrainingState = useTrainingResultsStore((s) => s.setKNNState);
  const setMetrics = useTrainingResultsStore((s) => s.setKNNMetrics);
  const setError = useTrainingResultsStore((s) => s.setKNNError);
  const setKStore = useTrainingResultsStore((s) => s.setKNNK);
  const resetStore = useTrainingResultsStore((s) => s.resetKNN);

  const featureNames = useMemo(() => {
    if (!xTrain) return [];
    return xTrain.columns as string[];
  }, [xTrain]);

  const canTrain = useMemo(() => {
    return !!(isSplit && xTrain && xTest && yTrain && yTest && targetColumn);
  }, [isSplit, xTrain, xTest, yTrain, yTest, targetColumn]);

  /** Clamp k to valid range based on training set size */
  const effectiveMaxK = useMemo(() => {
    if (!xTrain) return MAX_K;
    const trainSize = xTrain.shape[0];
    return Math.min(MAX_K, trainSize);
  }, [xTrain]);

  const handleSetK = useCallback(
    (value: number) => {
      const clamped = Math.max(MIN_K, Math.min(effectiveMaxK, value));
      setKStore(clamped);
    },
    [effectiveMaxK, setKStore],
  );

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

      // Extract data as arrays
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

      // Convert labels to strings for classification metrics
      const yTrainStr = yTrainData.map(String);
      const yTestStr = yTestData.map(String);

      // Encode string labels as integers for TensorFlow compatibility.
      // scikitjs passes labels through tf.gather() which requires numeric tensors.
      const uniqueLabels = Array.from(new Set(yTrainStr)).sort();
      const labelToIndex = new Map(uniqueLabels.map((l, i) => [l, i]));
      const yTrainEncoded = yTrainStr.map((l) => labelToIndex.get(l)!);

      // Create and train KNN classifier
      const model = new sk.KNeighborsClassifier({ nNeighbors: k });
      await model.fit(XTrainData, yTrainEncoded);

      // Make predictions (returns encoded indices)
      const predictionsResult = await model.predict(XTestData);
      const predictedIndices: number[] = Array.isArray(predictionsResult)
        ? (predictionsResult as number[])
        : (predictionsResult.arraySync() as number[]);

      // Decode integer predictions back to original string labels
      const predictions = predictedIndices.map(
        (idx) => uniqueLabels[Math.round(idx)],
      );

      // Calculate classification metrics
      const calculatedMetrics = calculateClassificationMetrics(
        predictions,
        yTestStr,
      );

      setMetrics(calculatedMetrics);
      setTrainingState("complete");
    } catch (err) {
      console.error("[KNN] Training failed:", err);
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
    k,
    setTrainingState,
    setError,
    setMetrics,
  ]);

  const reset = useCallback(() => {
    resetStore();
  }, [resetStore]);

  return {
    // State
    trainingState,
    metrics,
    error,
    isSplit,
    canTrain,
    featureNames,
    targetColumn,

    // KNN-specific
    k,
    setK: handleSetK,
    effectiveMaxK,

    // Actions
    runTraining,
    reset,
  };
}
