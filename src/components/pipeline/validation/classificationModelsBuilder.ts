import type { EvaluatedModel } from "./types";
import type { TrainingResultsStore } from "@/stores/trainingResults";

export function buildClassificationModels(
  results: TrainingResultsStore,
): EvaluatedModel[] {
  const { knn, lda, logisticRegression } = results;
  const list: EvaluatedModel[] = [];

  if (knn.metrics) {
    list.push({
      name: "K-Nearest Neighbors",
      type: `k=${knn.k}`,
      primaryMetric: `Accuracy: ${(knn.metrics.accuracy * 100).toFixed(1)}%`,
      secondaryMetric: `F1: ${knn.metrics.macroF1.toFixed(3)}`,
      rawScore: knn.metrics.accuracy,
      metrics: knn.metrics,
    });
  }
  if (lda.metrics) {
    list.push({
      name: "Linear Discriminant Analysis",
      type: "Linear",
      primaryMetric: `Accuracy: ${(lda.metrics.accuracy * 100).toFixed(1)}%`,
      secondaryMetric: `F1: ${lda.metrics.macroF1.toFixed(3)}`,
      rawScore: lda.metrics.accuracy,
      metrics: lda.metrics,
    });
  }
  if (logisticRegression.metrics) {
    list.push({
      name: "Logistic Regression",
      type: "Sigmoid",
      primaryMetric: `Accuracy: ${(logisticRegression.metrics.accuracy * 100).toFixed(1)}%`,
      secondaryMetric: `F1: ${logisticRegression.metrics.macroF1.toFixed(3)}`,
      rawScore: logisticRegression.metrics.accuracy,
      metrics: logisticRegression.metrics,
    });
  }
  return list.sort((a, b) => b.rawScore - a.rawScore);
}
