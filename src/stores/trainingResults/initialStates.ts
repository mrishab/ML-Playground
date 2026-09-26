import type {
  BaseModelState,
  LinearRegressionState,
  ClassificationModelState,
  KNNState,
  TrainingResultsState,
} from "./types";

const initialBase: BaseModelState = {
  trainingState: "idle",
  error: null,
};

export const initialLinearRegression: LinearRegressionState = {
  ...initialBase,
  metrics: null,
};

export const initialClassification: ClassificationModelState = {
  ...initialBase,
  metrics: null,
};

export const DEFAULT_K = 5;

export const initialKNN: KNNState = {
  ...initialClassification,
  k: DEFAULT_K,
};

export const initialTrainingResultsState: TrainingResultsState = {
  linearRegression: initialLinearRegression,
  knn: initialKNN,
  lda: { ...initialClassification },
  logisticRegression: { ...initialClassification },
};
