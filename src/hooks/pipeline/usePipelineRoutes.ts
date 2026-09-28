import type { ProblemType } from "@/types/dataset";

export function usePipelineRoutes(problemType: ProblemType) {
  const defaultTrainRoute =
    problemType === "regression"
      ? "/train/linear"
      : problemType === "clustering"
        ? "/train/clustering"
        : "/train/knn";

  return { defaultTrainRoute };
}
