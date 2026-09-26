import type { StateCreator } from "zustand";
import type { TrainingResultsStore } from "./types";
import {
  initialLinearRegression,
  initialClassification,
  initialKNN,
  initialTrainingResultsState,
} from "./initialStates";

export const createTrainingResultsActions: StateCreator<
  TrainingResultsStore,
  [],
  [],
  Omit<TrainingResultsStore, keyof typeof initialTrainingResultsState>
> = (set) => ({
  setLinearRegressionState: (trainingState) =>
    set((s) => ({
      linearRegression: { ...s.linearRegression, trainingState },
    })),
  setLinearRegressionMetrics: (metrics) =>
    set((s) => ({ linearRegression: { ...s.linearRegression, metrics } })),
  setLinearRegressionError: (error) =>
    set((s) => ({ linearRegression: { ...s.linearRegression, error } })),
  resetLinearRegression: () =>
    set({ linearRegression: { ...initialLinearRegression } }),

  setKNNState: (trainingState) =>
    set((s) => ({ knn: { ...s.knn, trainingState } })),
  setKNNMetrics: (metrics) => set((s) => ({ knn: { ...s.knn, metrics } })),
  setKNNError: (error) => set((s) => ({ knn: { ...s.knn, error } })),
  setKNNK: (k) => set((s) => ({ knn: { ...s.knn, k } })),
  resetKNN: () => set({ knn: { ...initialKNN } }),

  setLDAState: (trainingState) =>
    set((s) => ({ lda: { ...s.lda, trainingState } })),
  setLDAMetrics: (metrics) => set((s) => ({ lda: { ...s.lda, metrics } })),
  setLDAError: (error) => set((s) => ({ lda: { ...s.lda, error } })),
  resetLDA: () => set({ lda: { ...initialClassification } }),

  setLogisticRegressionState: (trainingState) =>
    set((s) => ({
      logisticRegression: { ...s.logisticRegression, trainingState },
    })),
  setLogisticRegressionMetrics: (metrics) =>
    set((s) => ({ logisticRegression: { ...s.logisticRegression, metrics } })),
  setLogisticRegressionError: (error) =>
    set((s) => ({ logisticRegression: { ...s.logisticRegression, error } })),
  resetLogisticRegression: () =>
    set({ logisticRegression: { ...initialClassification } }),

  resetAll: () => set({ ...initialTrainingResultsState }),
});
