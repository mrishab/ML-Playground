import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { TrainingState } from "@/types/training";
import type { LossTelemetry } from "@/types/loss";
import type { KMeansState } from "@/types/kmeans";
import type { TrainingResultsActions } from "./actionTypes";

export type { TrainingResultsActions };

export type BaseModelState = {
  trainingState: TrainingState;
  error: string | null;
  lossTelemetry: LossTelemetry | null;
};

export type LinearRegressionState = BaseModelState & {
  metrics: RegressionMetrics | null;
};

export type ClassificationModelState = BaseModelState & {
  metrics: ClassificationMetrics | null;
};

export type KNNState = ClassificationModelState & {
  k: number;
};

export type TrainingResultsState = {
  linearRegression: LinearRegressionState;
  knn: KNNState;
  lda: ClassificationModelState;
  logisticRegression: ClassificationModelState;
  kmeans: KMeansState;
};

export type TrainingResultsStore = TrainingResultsState &
  TrainingResultsActions;
