import type { StoreSet } from "./storeSetType";
import type { TrainingResultsActions } from "./actionTypes";
import { initialIsolationForest } from "./initialStates";

export type IsolationForestActions = Pick<
  TrainingResultsActions,
  | "setIsolationForestState"
  | "setIsolationForestMetrics"
  | "setIsolationForestError"
  | "setIsolationForestTelemetry"
  | "setIsolationForestParams"
  | "resetIsolationForest"
>;

export const createIsolationForestActions = (
  set: StoreSet,
): IsolationForestActions => ({
  setIsolationForestState: (trainingState) =>
    set((s) => ({
      isolationForest: { ...s.isolationForest, trainingState },
    })),
  setIsolationForestMetrics: (metrics) =>
    set((s) => ({
      isolationForest: { ...s.isolationForest, metrics },
    })),
  setIsolationForestError: (error) =>
    set((s) => ({
      isolationForest: { ...s.isolationForest, error },
    })),
  setIsolationForestTelemetry: (lossTelemetry) =>
    set((s) => ({
      isolationForest: { ...s.isolationForest, lossTelemetry },
    })),
  setIsolationForestParams: (params) =>
    set((s) => ({
      isolationForest: { ...s.isolationForest, ...params },
    })),
  resetIsolationForest: () => set({ isolationForest: initialIsolationForest }),
});
