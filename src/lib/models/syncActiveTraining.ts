import { useTrainingResultsStore } from "@/stores/trainingResults";
import { getSavedModels } from "./storage";
import { saveTrainedModel } from "./saveTrainedModel";

export function syncActiveTrainingIfUnsaved(): void {
  const res = useTrainingResultsStore.getState();
  const existing = getSavedModels();

  if (res.linearRegression.metrics && !existing.some((m) => m.algorithm === "linear")) {
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
  if (res.logisticRegression.metrics && !existing.some((m) => m.algorithm === "logistic")) {
    saveTrainedModel({
      algorithm: "logistic",
      algorithmName: "Logistic Regression",
      hyperparameters: { penalty: "L2", optimizer: "Adam", loss: "Softmax Cross-Entropy" },
      metrics: res.logisticRegression.metrics,
    });
  }
  if (res.kmeans.metrics && !existing.some((m) => m.algorithm === "clustering")) {
    saveTrainedModel({
      algorithm: "clustering",
      algorithmName: "K-Means Clustering",
      hyperparameters: { k: res.kmeans.k, maxIter: 25, initialization: "Random Partition" },
      metrics: res.kmeans.metrics,
      k: res.kmeans.k,
    });
  }
}
