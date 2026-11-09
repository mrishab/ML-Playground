import { useTrainingResultsStore } from "@/stores/trainingResults";

export function useRandomForestStore() {
  const modelState = useTrainingResultsStore((s) => s.randomForest);
  const setTrainingState = useTrainingResultsStore((s) => s.setRandomForestState);
  const setClassificationMetrics = useTrainingResultsStore(
    (s) => s.setRandomForestClassificationMetrics,
  );
  const setRegressionMetrics = useTrainingResultsStore(
    (s) => s.setRandomForestRegressionMetrics,
  );
  const setError = useTrainingResultsStore((s) => s.setRandomForestError);
  const setTelemetry = useTrainingResultsStore((s) => s.setRandomForestTelemetry);
  const setParams = useTrainingResultsStore((s) => s.setRandomForestParams);
  const reset = useTrainingResultsStore((s) => s.resetRandomForest);

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
