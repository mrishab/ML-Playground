import type { ProblemType } from "@/types/dataset";

export function usePipelineRoutes(problemType: ProblemType) {
  const defaultTrainRoute =
    problemType === "regression"
      ? "/train/linear"
      : problemType === "clustering"
        ? "/train/clustering"
        : "/train/knn";

  const defaultCompareRoute =
    problemType === "regression"
      ? "/comparison/regression"
      : problemType === "clustering"
        ? "/comparison/clustering"
        : "/comparison/classification";

  return { defaultTrainRoute, defaultCompareRoute };
}
