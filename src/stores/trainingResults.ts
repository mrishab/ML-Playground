import { create } from "zustand";
import type { RegressionMetrics } from "@/types/regression";
import type { ClassificationMetrics } from "@/types/classification";
import type { TrainingState } from "@/types/training";

// ─── Per-model state shapes ────────────────────────────────────────

type BaseModelState = {
  trainingState: TrainingState;
  error: string | null;
};

type LinearRegressionState = BaseModelState & {
  metrics: RegressionMetrics | null;
};

type ClassificationModelState = BaseModelState & {
  metrics: ClassificationMetrics | null;
};

type KNNState = ClassificationModelState & {
  k: number;
};

// ─── Store shape ───────────────────────────────────────────────────

type TrainingResultsState = {
  linearRegression: LinearRegressionState;
  knn: KNNState;
  lda: ClassificationModelState;
  logisticRegression: ClassificationModelState;
};

type TrainingResultsActions = {
  // Linear Regression
  setLinearRegressionState: (state: TrainingState) => void;
  setLinearRegressionMetrics: (metrics: RegressionMetrics | null) => void;
  setLinearRegressionError: (error: string | null) => void;
  resetLinearRegression: () => void;

  // KNN
  setKNNState: (state: TrainingState) => void;
  setKNNMetrics: (metrics: ClassificationMetrics | null) => void;
  setKNNError: (error: string | null) => void;
  setKNNK: (k: number) => void;
  resetKNN: () => void;

  // LDA
  setLDAState: (state: TrainingState) => void;
  setLDAMetrics: (metrics: ClassificationMetrics | null) => void;
  setLDAError: (error: string | null) => void;
  resetLDA: () => void;

  // Logistic Regression
  setLogisticRegressionState: (state: TrainingState) => void;
  setLogisticRegressionMetrics: (metrics: ClassificationMetrics | null) => void;
  setLogisticRegressionError: (error: string | null) => void;
  resetLogisticRegression: () => void;

  // Global
  resetAll: () => void;
};

// ─── Initial states ────────────────────────────────────────────────

const initialBase: BaseModelState = {
  trainingState: "idle",
  error: null,
};

const initialLinearRegression: LinearRegressionState = {
  ...initialBase,
  metrics: null,
};

const initialClassification: ClassificationModelState = {
  ...initialBase,
  metrics: null,
};

const DEFAULT_K = 5;

const initialKNN: KNNState = {
  ...initialClassification,
  k: DEFAULT_K,
};

const initialState: TrainingResultsState = {
  linearRegression: initialLinearRegression,
  knn: initialKNN,
  lda: { ...initialClassification },
  logisticRegression: { ...initialClassification },
};

// ─── Store ─────────────────────────────────────────────────────────

export const useTrainingResultsStore = create<
  TrainingResultsState & TrainingResultsActions
>()((set) => ({
  ...initialState,

  // ── Linear Regression ──────────────────────────────────────────
  setLinearRegressionState: (trainingState) =>
    set((s) => ({
      linearRegression: { ...s.linearRegression, trainingState },
    })),
  setLinearRegressionMetrics: (metrics) =>
    set((s) => ({
      linearRegression: { ...s.linearRegression, metrics },
    })),
  setLinearRegressionError: (error) =>
    set((s) => ({
      linearRegression: { ...s.linearRegression, error },
    })),
  resetLinearRegression: () =>
    set({ linearRegression: { ...initialLinearRegression } }),

  // ── KNN ────────────────────────────────────────────────────────
  setKNNState: (trainingState) =>
    set((s) => ({ knn: { ...s.knn, trainingState } })),
  setKNNMetrics: (metrics) => set((s) => ({ knn: { ...s.knn, metrics } })),
  setKNNError: (error) => set((s) => ({ knn: { ...s.knn, error } })),
  setKNNK: (k) => set((s) => ({ knn: { ...s.knn, k } })),
  resetKNN: () => set({ knn: { ...initialKNN } }),

  // ── LDA ────────────────────────────────────────────────────────
  setLDAState: (trainingState) =>
    set((s) => ({ lda: { ...s.lda, trainingState } })),
  setLDAMetrics: (metrics) => set((s) => ({ lda: { ...s.lda, metrics } })),
  setLDAError: (error) => set((s) => ({ lda: { ...s.lda, error } })),
  resetLDA: () => set({ lda: { ...initialClassification } }),

  // ── Logistic Regression ────────────────────────────────────────
  setLogisticRegressionState: (trainingState) =>
    set((s) => ({
      logisticRegression: { ...s.logisticRegression, trainingState },
    })),
  setLogisticRegressionMetrics: (metrics) =>
    set((s) => ({
      logisticRegression: { ...s.logisticRegression, metrics },
    })),
  setLogisticRegressionError: (error) =>
    set((s) => ({
      logisticRegression: { ...s.logisticRegression, error },
    })),
  resetLogisticRegression: () =>
    set({ logisticRegression: { ...initialClassification } }),

  // ── Global ─────────────────────────────────────────────────────
  resetAll: () => set({ ...initialState }),
}));
