import { useEffect } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { DATASETS } from "@/components/data-ingestion/select-dataset/useDatasetSelect";
import { fetchAndParseDataset } from "./fetchDataset";

export function useDatasetLoader() {
  const { selectedDataset, setDf, setLoading, setError } = useDatasetStore();
  const resetMLConfig = useMLConfigStore((state) => state.reset);
  const resetTrainingResults = useTrainingResultsStore(
    (state) => state.resetAll,
  );

  useEffect(() => {
    if (!selectedDataset) {
      setDf(null);
      resetMLConfig();
      resetTrainingResults();
      return;
    }

    const dataset = DATASETS.find((d) => d.name === selectedDataset);
    if (!dataset) return;

    const loadDataset = async () => {
      setLoading(true);
      setError(null);
      resetMLConfig();
      resetTrainingResults();

      try {
        const df = await fetchAndParseDataset(dataset.file);
        setDf(df);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load dataset";
        setError(message);
        setDf(null);
      } finally {
        setLoading(false);
      }
    };

    loadDataset();
  }, [
    resetMLConfig,
    resetTrainingResults,
    selectedDataset,
    setDf,
    setLoading,
    setError,
  ]);
}
