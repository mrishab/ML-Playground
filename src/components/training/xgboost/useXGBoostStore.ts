import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useXGBoostStore() {
  const modelState = useTrainingResultsStore((s) => s.xgboost);
  const setTrainingState = useTrainingResultsStore((s) => s.setXGBoostState);
  const setClassificationMetrics = useTrainingResultsStore(
    (s) => s.setXGBoostClassificationMetrics,
  );
  const setRegressionMetrics = useTrainingResultsStore(
    (s) => s.setXGBoostRegressionMetrics,
  );
  const setError = useTrainingResultsStore((s) => s.setXGBoostError);
  const setTelemetry = useTrainingResultsStore((s) => s.setXGBoostTelemetry);
  const setParams = useTrainingResultsStore((s) => s.setXGBoostParams);
  const reset = useTrainingResultsStore((s) => s.resetXGBoost);

  return {
    ...modelState,
    setTrainingState,
    setClassificationMetrics,
    setRegressionMetrics,
    setError,
    setTelemetry,
    setParams,
    reset,
  };
}
