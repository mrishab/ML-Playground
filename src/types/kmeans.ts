import type { BaseModelState } from "@/stores/trainingResults/types";

export type KMeansMetrics = {
  k: number;
  inertia: number;
  iterations: number;
  converged: boolean;
  clusterSizes: number[];
  centroids: number[][];
  labels: number[];
  featureNames: string[];
};

export type KMeansState = BaseModelState & {
  k: number;
  metrics: KMeansMetrics | null;
};
