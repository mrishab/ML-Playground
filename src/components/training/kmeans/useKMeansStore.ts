import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useKMeansStore() {
  const modelState = useTrainingResultsStore((s) => s.kmeans);
  const setTrainingState = useTrainingResultsStore((s) => s.setKMeansState);
  const setMetrics = useTrainingResultsStore((s) => s.setKMeansMetrics);
  const setError = useTrainingResultsStore((s) => s.setKMeansError);
  const setK = useTrainingResultsStore((s) => s.setKMeansK);
  const setTelemetry = useTrainingResultsStore((s) => s.setKMeansTelemetry);
  const reset = useTrainingResultsStore((s) => s.resetKMeans);

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
