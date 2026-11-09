import type { TrainingResultsStore } from "@/stores/trainingResults";
import type { ProblemType } from "@/types/dataset";

export function getModelArtifactDesc(
  results: TrainingResultsStore,
  problemType: ProblemType,
): string | null {
  const {
    linearRegression,
    knn,
    lda,
    logisticRegression,
    randomForest,
    xgboost,
    isolationForest,
    kmeans,
  } = results;

  if (problemType === "regression") {
    if (linearRegression.metrics) {
      return `Linear (R²: ${linearRegression.metrics.rSquared.toFixed(2)})`;
    }
    if (randomForest.regressionMetrics) {
      return `RF (R²: ${randomForest.regressionMetrics.rSquared.toFixed(2)})`;
    }
    if (xgboost.regressionMetrics) {
      return `XGB (R²: ${xgboost.regressionMetrics.rSquared.toFixed(2)})`;
    }
  }

  if (randomForest.classificationMetrics) {
    return `RF (${(randomForest.classificationMetrics.accuracy * 100).toFixed(0)}%)`;
  }
  if (xgboost.classificationMetrics) {
    return `XGB (${(xgboost.classificationMetrics.accuracy * 100).toFixed(0)}%)`;
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
  if (isolationForest.metrics) {
    return `IsoForest (${isolationForest.metrics.anomalyCount} anomalies)`;
  }
  if (problemType === "clustering" && kmeans.metrics) {
    return `K-Means (k=${kmeans.metrics.k})`;
  }
  return null;
}
