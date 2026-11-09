import { useTrainingResultsStore } from "@/stores/trainingResults";
import { useMLConfigStore } from "@/stores/mlConfig";
import { getSavedModels } from "./storage";
import { saveTrainedModel } from "./saveTrainedModel";

export function syncActiveTrainingIfUnsaved(): void {
  const res = useTrainingResultsStore.getState();
  const ml = useMLConfigStore.getState();
  const existing = getSavedModels();

  if (
    res.linearRegression.metrics &&
    !existing.some((m) => m.algorithm === "linear")
  ) {
    saveTrainedModel({
      algorithm: "linear",
      algorithmName: "Linear Regression (OLS)",
      hyperparameters: { fitIntercept: true },
      metrics: res.linearRegression.metrics,
    });
  }
  if (res.knn.metrics && !existing.some((m) => m.algorithm === "knn")) {
    saveTrainedModel({
      algorithm: "knn",
      algorithmName: "K-Nearest Neighbors",
      hyperparameters: { k: res.knn.k, distanceMetric: "Euclidean" },
      metrics: res.knn.metrics,
      k: res.knn.k,
    });
  }
  if (res.lda.metrics && !existing.some((m) => m.algorithm === "lda")) {
    saveTrainedModel({
      algorithm: "lda",
      algorithmName: "Linear Discriminant Analysis",
      hyperparameters: { covariance: "Pooled (shared)", priors: "Empirical" },
      metrics: res.lda.metrics,
    });
  }
  if (
    res.logisticRegression.metrics &&
    !existing.some((m) => m.algorithm === "logistic")
  ) {
    saveTrainedModel({
      algorithm: "logistic",
      algorithmName: "Logistic Regression",
      hyperparameters: {
        penalty: "L2",
        optimizer: "Adam",
        loss: "Softmax Cross-Entropy",
      },
      metrics: res.logisticRegression.metrics,
    });
  }
  if (
    res.kmeans.metrics &&
    !existing.some((m) => m.algorithm === "clustering")
  ) {
    saveTrainedModel({
      algorithm: "clustering",
      algorithmName: "K-Means Clustering",
      hyperparameters: {
        k: res.kmeans.k,
        maxIter: 25,
        initialization: "Random Partition",
      },
      metrics: res.kmeans.metrics,
      k: res.kmeans.k,
    });
  }
  const rfMetrics =
    ml.problemType === "regression"
      ? res.randomForest.regressionMetrics
      : res.randomForest.classificationMetrics || res.randomForest.regressionMetrics;
  if (rfMetrics && !existing.some((m) => m.algorithm === "random-forest")) {
    saveTrainedModel({
      algorithm: "random-forest",
      algorithmName: ml.problemType === "regression" ? "Random Forest (Regressor)" : "Random Forest (Classifier)",
      hyperparameters: {
        nEstimators: res.randomForest.nEstimators,
        maxDepth: res.randomForest.maxDepth,
        task: ml.problemType === "regression" ? "Regression" : "Classification",
      },
      metrics: rfMetrics,
    });
  }
  const xgbMetrics =
    ml.problemType === "regression"
      ? res.xgboost.regressionMetrics
      : res.xgboost.classificationMetrics || res.xgboost.regressionMetrics;
  if (xgbMetrics && !existing.some((m) => m.algorithm === "xgboost")) {
    saveTrainedModel({
      algorithm: "xgboost",
      algorithmName: ml.problemType === "regression" ? "XGBoost (Regressor)" : "XGBoost (Classifier)",
      hyperparameters: {
        nEstimators: res.xgboost.nEstimators,
        maxDepth: res.xgboost.maxDepth,
        task: ml.problemType === "regression" ? "Regression" : "Classification",
      },
      metrics: xgbMetrics,
    });
  }
  if (
    res.isolationForest.metrics &&
    !existing.some((m) => m.algorithm === "isolation-forest")
  ) {
    saveTrainedModel({
      algorithm: "isolation-forest",
      algorithmName: "Isolation Forest",
      hyperparameters: {
        nEstimators: res.isolationForest.nEstimators,
        contamination: res.isolationForest.contamination,
      },
      metrics: res.isolationForest.metrics,
    });
  }
}
