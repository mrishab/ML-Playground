import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useLDAStore() {
  const modelState = useTrainingResultsStore((s) => s.lda);
  const setTrainingState = useTrainingResultsStore((s) => s.setLDAState);
  const setMetrics = useTrainingResultsStore((s) => s.setLDAMetrics);
  const setError = useTrainingResultsStore((s) => s.setLDAError);
  const setTelemetry = useTrainingResultsStore((s) => s.setLDATelemetry);
  const reset = useTrainingResultsStore((s) => s.resetLDA);

  return {
    ...modelState,
    setTrainingState,
    setMetrics,
    setError,
    setTelemetry,
    reset,
  };
}
