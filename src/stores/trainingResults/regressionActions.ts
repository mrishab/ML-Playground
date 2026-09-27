import type { StoreSet } from "./storeSetType";
import { initialLinearRegression } from "./initialStates";

export const createRegressionActions = (set: StoreSet) => ({
  setLinearRegressionState: (
    trainingState: import("@/types/training").TrainingState,
  ) =>
    set((s) => ({
      linearRegression: { ...s.linearRegression, trainingState },
    })),
  setLinearRegressionMetrics: (
    metrics: import("@/types/regression").RegressionMetrics | null,
  ) => set((s) => ({ linearRegression: { ...s.linearRegression, metrics } })),
  setLinearRegressionError: (error: string | null) =>
    set((s) => ({ linearRegression: { ...s.linearRegression, error } })),
  setLinearRegressionTelemetry: (
    lossTelemetry: import("@/types/loss").LossTelemetry | null,
  ) =>
    set((s) => ({
      linearRegression: { ...s.linearRegression, lossTelemetry },
    })),
  resetLinearRegression: () =>
    set({ linearRegression: { ...initialLinearRegression } }),
});
