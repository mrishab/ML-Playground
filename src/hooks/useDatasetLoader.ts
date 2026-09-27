import { useEffect } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { DATASETS } from "@/components/data-ingestion/select-dataset/useDatasetSelect";
import { fetchAndParseDataset } from "./fetchDataset";

export function useDatasetLoader() {
  const { selectedDataset, customDatasets, setDf, setLoading, setError } =
    useDatasetStore();
  const resetMLConfig = useMLConfigStore((state) => state.reset);
  const setProblemType = useMLConfigStore((state) => state.setProblemType);
  const setTargetColumn = useMLConfigStore((state) => state.setTargetColumn);
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

    // Check if it's an uploaded custom dataset
    const custom = customDatasets.find((d) => d.name === selectedDataset);
    if (custom) {
      setError(null);
      setLoading(false);
      setDf(custom.df);
      resetMLConfig();
      resetTrainingResults();
      if (custom.problemType) {
        setProblemType(custom.problemType);
      }
      if (custom.targetColumn) {
        setTargetColumn(custom.targetColumn);
      }
      return;
    }

    // Otherwise check built-in standard datasets
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
    setProblemType,
    setTargetColumn,
    selectedDataset,
    customDatasets,
    setDf,
    setLoading,
    setError,
  ]);
}
