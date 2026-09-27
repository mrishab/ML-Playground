import { useMemo } from "react";
import type { EvaluatedModel } from "./types";
import type { TrainingResultsStore } from "@/stores/trainingResults";
import { buildClassificationModels } from "./classificationModelsBuilder";

export function useEvaluatedModels(
  problemType: string,
  results: TrainingResultsStore,
): EvaluatedModel[] {
  const { linearRegression, kmeans } = results;

  return useMemo(() => {
    if (problemType === "regression") {
      if (!linearRegression.metrics) return [];
      return [
        {
          name: "Linear Regression",
          type: "OLS",
          primaryMetric: `R²: ${linearRegression.metrics.rSquared.toFixed(3)}`,
          secondaryMetric: `MSE: ${linearRegression.metrics.mse.toFixed(4)}`,
          rawScore: linearRegression.metrics.rSquared,
          metrics: linearRegression.metrics,
        },
      ];
    }

    if (problemType === "classification") {
      return buildClassificationModels(results);
    }

    if (problemType === "clustering" && kmeans.metrics) {
      return [
        {
          name: "K-Means Clustering",
          type: `K = ${kmeans.metrics.k}`,
          primaryMetric: `Inertia: ${kmeans.metrics.inertia.toLocaleString()}`,
          secondaryMetric: `Clusters: ${kmeans.metrics.k}`,
          rawScore: -kmeans.metrics.inertia,
          metrics: kmeans.metrics,
        },
      ];
    }

    return [];
  }, [problemType, linearRegression.metrics, kmeans.metrics, results]);
}
