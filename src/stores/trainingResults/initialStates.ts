import type {
  BaseModelState,
  LinearRegressionState,
  ClassificationModelState,
  KNNState,
  EnsembleModelState,
  IsolationForestState,
  TrainingResultsState,
} from "./types";
import type { KMeansState } from "@/types/kmeans";

const initialBase: BaseModelState = {
  trainingState: "idle",
  error: null,
  lossTelemetry: null,
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
export const DEFAULT_KMEANS_K = 3;

export const initialKNN: KNNState = {
  ...initialClassification,
  k: DEFAULT_K,
};

export const initialKMeans: KMeansState = {
  ...initialBase,
  k: DEFAULT_KMEANS_K,
  metrics: null,
};

export const initialRandomForest: EnsembleModelState = {
  ...initialBase,
  classificationMetrics: null,
  regressionMetrics: null,
  nEstimators: 20,
  maxDepth: 6,
};

export const initialXGBoost: EnsembleModelState = {
  ...initialBase,
  classificationMetrics: null,
  regressionMetrics: null,
  nEstimators: 25,
  maxDepth: 4,
};

export const initialIsolationForest: IsolationForestState = {
  ...initialBase,
  metrics: null,
  contamination: 0.1,
  nEstimators: 50,
};

export const initialTrainingResultsState: TrainingResultsState = {
  linearRegression: initialLinearRegression,
  knn: initialKNN,
  lda: { ...initialClassification },
  logisticRegression: { ...initialClassification },
  kmeans: initialKMeans,
  randomForest: initialRandomForest,
  xgboost: initialXGBoost,
  isolationForest: initialIsolationForest,
};
