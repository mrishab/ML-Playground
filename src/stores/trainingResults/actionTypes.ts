import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { TrainingState } from "@/types/training";
import type { LossTelemetry } from "@/types/loss";
import type { KMeansMetrics } from "@/types/kmeans";

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

  resetAll: () => void;
};
