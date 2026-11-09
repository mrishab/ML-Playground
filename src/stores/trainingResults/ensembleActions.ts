import type { StoreSet } from "./storeSetType";
import type { TrainingResultsActions } from "./actionTypes";
import { initialRandomForest, initialXGBoost } from "./initialStates";

export type EnsembleActions = Pick<
  TrainingResultsActions,
  | "setRandomForestState"
  | "setRandomForestClassificationMetrics"
  | "setRandomForestRegressionMetrics"
  | "setRandomForestError"
  | "setRandomForestTelemetry"
  | "setRandomForestParams"
  | "resetRandomForest"
  | "setXGBoostState"
  | "setXGBoostClassificationMetrics"
  | "setXGBoostRegressionMetrics"
  | "setXGBoostError"
  | "setXGBoostTelemetry"
  | "setXGBoostParams"
  | "resetXGBoost"
>;

export const createEnsembleActions = (set: StoreSet): EnsembleActions => ({
  setRandomForestState: (trainingState) =>
    set((s) => ({ randomForest: { ...s.randomForest, trainingState } })),
  setRandomForestClassificationMetrics: (classificationMetrics) =>
    set((s) => ({
      randomForest: { ...s.randomForest, classificationMetrics },
    })),
  setRandomForestRegressionMetrics: (regressionMetrics) =>
    set((s) => ({ randomForest: { ...s.randomForest, regressionMetrics } })),
  setRandomForestError: (error) =>
    set((s) => ({ randomForest: { ...s.randomForest, error } })),
  setRandomForestTelemetry: (lossTelemetry) =>
    set((s) => ({ randomForest: { ...s.randomForest, lossTelemetry } })),
  setRandomForestParams: (params) =>
    set((s) => ({ randomForest: { ...s.randomForest, ...params } })),
  resetRandomForest: () => set({ randomForest: initialRandomForest }),

  setXGBoostState: (trainingState) =>
    set((s) => ({ xgboost: { ...s.xgboost, trainingState } })),
  setXGBoostClassificationMetrics: (classificationMetrics) =>
    set((s) => ({ xgboost: { ...s.xgboost, classificationMetrics } })),
  setXGBoostRegressionMetrics: (regressionMetrics) =>
    set((s) => ({ xgboost: { ...s.xgboost, regressionMetrics } })),
  setXGBoostError: (error) =>
    set((s) => ({ xgboost: { ...s.xgboost, error } })),
  setXGBoostTelemetry: (lossTelemetry) =>
    set((s) => ({ xgboost: { ...s.xgboost, lossTelemetry } })),
  setXGBoostParams: (params) =>
    set((s) => ({ xgboost: { ...s.xgboost, ...params } })),
  resetXGBoost: () => set({ xgboost: initialXGBoost }),
});
