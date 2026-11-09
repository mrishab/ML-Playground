import type { ProblemType, SelectedFeature } from "@/stores/mlConfig";
import type { RegressionMetrics } from "./regression";
import type { ClassificationMetrics } from "./classification";
import type { KMeansMetrics } from "./kmeans";
import type { IsolationForestMetrics } from "./isolationForest";
import type { LossPoint } from "./loss";

export type AlgorithmType =
  | "linear"
  | "knn"
  | "lda"
  | "logistic"
  | "clustering"
  | "random-forest"
  | "xgboost"
  | "isolation-forest";

export type HyperparameterValue = string | number | boolean;
export type ModelHyperparameters = Record<string, HyperparameterValue>;

export type FeatureStatSummary = {
  feature: string;
  mean: number;
  std: number;
  min: number;
  max: number;
  correlationWithTarget?: number;
  correlationStrength?: string;
};

export type ModelArtifactDetails = {
  formula?: string;
  intercept?: number | number[];
  coefficients?: { feature: string; weight: number }[];
  classes?: string[];
  k?: number;
  centroids?: number[][];
};

export type SavedModel = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  datasetName: string;
  problemType: ProblemType;
  algorithm: AlgorithmType;
  algorithmName: string;
  hyperparameters: ModelHyperparameters;
  splitConfig: {
    testSplitPercent: number;
    shuffle: boolean;
    trainSamples: number;
    testSamples: number;
    targetColumn: string;
    features: string[];
    selectedFeatures?: SelectedFeature[];
  };
  regressionMetrics?: RegressionMetrics;
  classificationMetrics?: ClassificationMetrics;
  kmeansMetrics?: KMeansMetrics;
  isolationForestMetrics?: IsolationForestMetrics;
  featureAnalysis?: FeatureStatSummary[];
  modelArtifacts?: ModelArtifactDetails;
  lossHistory?: LossPoint[];
  sizeBytes: number;
};

export type BuildModelOptions = {
  algorithm: AlgorithmType;
  algorithmName: string;
  hyperparameters: ModelHyperparameters;
  metrics:
    | RegressionMetrics
    | ClassificationMetrics
    | KMeansMetrics
    | IsolationForestMetrics;
  k?: number;
  customName?: string;
};
