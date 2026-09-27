import type { StoreSet } from "./storeSetType";
import type { ClassificationMetrics } from "@/types/classification";
import type { TrainingState } from "@/types/training";
import type { LossTelemetry } from "@/types/loss";
import { initialClassification, initialKNN } from "./initialStates";

export const createClassificationActions = (set: StoreSet) => ({
  setKNNState: (trainingState: TrainingState) =>
    set((s) => ({ knn: { ...s.knn, trainingState } })),
  setKNNMetrics: (metrics: ClassificationMetrics | null) =>
    set((s) => ({ knn: { ...s.knn, metrics } })),
  setKNNError: (error: string | null) =>
    set((s) => ({ knn: { ...s.knn, error } })),
  setKNNK: (k: number) => set((s) => ({ knn: { ...s.knn, k } })),
  setKNNTelemetry: (lossTelemetry: LossTelemetry | null) =>
    set((s) => ({ knn: { ...s.knn, lossTelemetry } })),
  resetKNN: () => set({ knn: { ...initialKNN } }),

  setLDAState: (trainingState: TrainingState) =>
    set((s) => ({ lda: { ...s.lda, trainingState } })),
  setLDAMetrics: (metrics: ClassificationMetrics | null) =>
    set((s) => ({ lda: { ...s.lda, metrics } })),
  setLDAError: (error: string | null) =>
    set((s) => ({ lda: { ...s.lda, error } })),
  setLDATelemetry: (lossTelemetry: LossTelemetry | null) =>
    set((s) => ({ lda: { ...s.lda, lossTelemetry } })),
  resetLDA: () => set({ lda: { ...initialClassification } }),

  setLogisticRegressionState: (trainingState: TrainingState) =>
    set((s) => ({
      logisticRegression: { ...s.logisticRegression, trainingState },
    })),
  setLogisticRegressionMetrics: (metrics: ClassificationMetrics | null) =>
    set((s) => ({ logisticRegression: { ...s.logisticRegression, metrics } })),
  setLogisticRegressionError: (error: string | null) =>
    set((s) => ({ logisticRegression: { ...s.logisticRegression, error } })),
  setLogisticRegressionTelemetry: (lossTelemetry: LossTelemetry | null) =>
    set((s) => ({
      logisticRegression: { ...s.logisticRegression, lossTelemetry },
    })),
  resetLogisticRegression: () =>
    set({ logisticRegression: { ...initialClassification } }),
});
