import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useLinearRegressionStore() {
  const modelState = useTrainingResultsStore((s) => s.linearRegression);
  const setTrainingState = useTrainingResultsStore(
    (s) => s.setLinearRegressionState,
  );
  const setMetrics = useTrainingResultsStore(
    (s) => s.setLinearRegressionMetrics,
  );
  const setError = useTrainingResultsStore((s) => s.setLinearRegressionError);
  const setTelemetry = useTrainingResultsStore(
    (s) => s.setLinearRegressionTelemetry,
  );
  const reset = useTrainingResultsStore((s) => s.resetLinearRegression);

  return {
    ...modelState,
    setTrainingState,
    setMetrics,
    setError,
    setTelemetry,
    reset,
  };
}
