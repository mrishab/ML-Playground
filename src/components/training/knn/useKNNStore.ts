import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useKNNStore() {
  const modelState = useTrainingResultsStore((s) => s.knn);
  const setTrainingState = useTrainingResultsStore((s) => s.setKNNState);
  const setMetrics = useTrainingResultsStore((s) => s.setKNNMetrics);
  const setError = useTrainingResultsStore((s) => s.setKNNError);
  const setK = useTrainingResultsStore((s) => s.setKNNK);
  const setTelemetry = useTrainingResultsStore((s) => s.setKNNTelemetry);
  const reset = useTrainingResultsStore((s) => s.resetKNN);

  return {
    ...modelState,
    setTrainingState,
    setMetrics,
    setError,
    setK,
    setTelemetry,
    reset,
  };
}
