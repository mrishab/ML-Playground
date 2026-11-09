import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { TrainingState } from "@/types/training";
import type { LossTelemetry } from "@/types/loss";
import type { KMeansMetrics } from "@/types/kmeans";
import type { IsolationForestMetrics } from "@/types/isolationForest";

export type TrainingResultsActions = {
  setLinearRegressionState: (state: TrainingState) => void;
  setLinearRegressionMetrics: (metrics: RegressionMetrics | null) => void;
  setLinearRegressionError: (error: string | null) => void;
  setLinearRegressionTelemetry: (telemetry: LossTelemetry | null) => void;
  resetLinearRegression: () => void;

  setKNNState: (state: TrainingState) => void;
  setKNNMetrics: (metrics: ClassificationMetrics | null) => void;
  setKNNError: (error: string | null) => void;
  setKNNK: (k: number) => void;
  setKNNTelemetry: (telemetry: LossTelemetry | null) => void;
  resetKNN: () => void;

  setLDAState: (state: TrainingState) => void;
  setLDAMetrics: (metrics: ClassificationMetrics | null) => void;
  setLDAError: (error: string | null) => void;
  setLDATelemetry: (telemetry: LossTelemetry | null) => void;
  resetLDA: () => void;

  setLogisticRegressionState: (state: TrainingState) => void;
  setLogisticRegressionMetrics: (metrics: ClassificationMetrics | null) => void;
  setLogisticRegressionError: (error: string | null) => void;
  setLogisticRegressionTelemetry: (telemetry: LossTelemetry | null) => void;
  resetLogisticRegression: () => void;

  setKMeansState: (state: TrainingState) => void;
  setKMeansMetrics: (metrics: KMeansMetrics | null) => void;
  setKMeansError: (error: string | null) => void;
  setKMeansK: (k: number) => void;
  setKMeansTelemetry: (telemetry: LossTelemetry | null) => void;
  resetKMeans: () => void;

  setRandomForestState: (state: TrainingState) => void;
  setRandomForestClassificationMetrics: (
    metrics: ClassificationMetrics | null,
  ) => void;
  setRandomForestRegressionMetrics: (metrics: RegressionMetrics | null) => void;
  setRandomForestError: (error: string | null) => void;
  setRandomForestTelemetry: (telemetry: LossTelemetry | null) => void;
  setRandomForestParams: (params: {
    nEstimators?: number;
    maxDepth?: number;
  }) => void;
  resetRandomForest: () => void;

  setXGBoostState: (state: TrainingState) => void;
  setXGBoostClassificationMetrics: (
    metrics: ClassificationMetrics | null,
  ) => void;
  setXGBoostRegressionMetrics: (metrics: RegressionMetrics | null) => void;
  setXGBoostError: (error: string | null) => void;
  setXGBoostTelemetry: (telemetry: LossTelemetry | null) => void;
  setXGBoostParams: (params: {
    nEstimators?: number;
    maxDepth?: number;
  }) => void;
  resetXGBoost: () => void;

  setIsolationForestState: (state: TrainingState) => void;
  setIsolationForestMetrics: (metrics: IsolationForestMetrics | null) => void;
  setIsolationForestError: (error: string | null) => void;
  setIsolationForestTelemetry: (telemetry: LossTelemetry | null) => void;
  setIsolationForestParams: (params: {
    contamination?: number;
    nEstimators?: number;
  }) => void;
  resetIsolationForest: () => void;

  resetAll: () => void;
};
