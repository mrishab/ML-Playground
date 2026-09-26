import type { TrainingResultsStore } from "@/stores/trainingResults";
import type { ProblemType } from "@/types/dataset";

export function getModelArtifactDesc(
  results: TrainingResultsStore,
  problemType: ProblemType,
): string | null {
  const { linearRegression, knn, lda, logisticRegression } = results;
  if (problemType === "regression" && linearRegression.metrics) {
    return `Linear (R²: ${linearRegression.metrics.rSquared.toFixed(2)})`;
  }
  if (knn.metrics) {
    return `KNN (${(knn.metrics.accuracy * 100).toFixed(0)}%)`;
  }
  if (lda.metrics) {
    return `LDA (${(lda.metrics.accuracy * 100).toFixed(0)}%)`;
  }
  if (logisticRegression.metrics) {
    return `Logistic (${(logisticRegression.metrics.accuracy * 100).toFixed(0)}%)`;
  }
  return null;
}
