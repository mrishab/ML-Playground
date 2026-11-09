import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useIsolationForestStore() {
  const modelState = useTrainingResultsStore((s) => s.isolationForest);
  const setTrainingState = useTrainingResultsStore((s) => s.setIsolationForestState);
  const setMetrics = useTrainingResultsStore((s) => s.setIsolationForestMetrics);
  const setError = useTrainingResultsStore((s) => s.setIsolationForestError);
  const setTelemetry = useTrainingResultsStore((s) => s.setIsolationForestTelemetry);
  const setParams = useTrainingResultsStore((s) => s.setIsolationForestParams);
  const reset = useTrainingResultsStore((s) => s.resetIsolationForest);

  return {
    ...modelState,
    setTrainingState,
    setMetrics,
    setError,
    setTelemetry,
    setParams,
    reset,
  };
}
