import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useLogisticRegressionStore() {
  const modelState = useTrainingResultsStore((s) => s.logisticRegression);
  const setTrainingState = useTrainingResultsStore(
    (s) => s.setLogisticRegressionState,
  );
  const setMetrics = useTrainingResultsStore(
    (s) => s.setLogisticRegressionMetrics,
  );
  const setError = useTrainingResultsStore((s) => s.setLogisticRegressionError);
  const setTelemetry = useTrainingResultsStore(
    (s) => s.setLogisticRegressionTelemetry,
  );
  const reset = useTrainingResultsStore((s) => s.resetLogisticRegression);

  return {
    ...modelState,
    setTrainingState,
    setMetrics,
    setError,
    setTelemetry,
    reset,
  };
}
