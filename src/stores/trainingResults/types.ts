import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { TrainingState } from "@/types/training";

export type BaseModelState = {
  trainingState: TrainingState;
  error: string | null;
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
};

export type TrainingResultsActions = {
  setLinearRegressionState: (state: TrainingState) => void;
  setLinearRegressionMetrics: (metrics: RegressionMetrics | null) => void;
  setLinearRegressionError: (error: string | null) => void;
  resetLinearRegression: () => void;

  setKNNState: (state: TrainingState) => void;
  setKNNMetrics: (metrics: ClassificationMetrics | null) => void;
  setKNNError: (error: string | null) => void;
  setKNNK: (k: number) => void;
  resetKNN: () => void;

  setLDAState: (state: TrainingState) => void;
  setLDAMetrics: (metrics: ClassificationMetrics | null) => void;
  setLDAError: (error: string | null) => void;
  resetLDA: () => void;

  setLogisticRegressionState: (state: TrainingState) => void;
  setLogisticRegressionMetrics: (metrics: ClassificationMetrics | null) => void;
  setLogisticRegressionError: (error: string | null) => void;
  resetLogisticRegression: () => void;

  resetAll: () => void;
};

export type TrainingResultsStore = TrainingResultsState &
  TrainingResultsActions;
