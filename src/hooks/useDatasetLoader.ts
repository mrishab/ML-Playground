import { useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import { DataFrame } from "danfojs";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { DATASETS } from "@/components/data-ingestion/select-dataset/useDatasetSelect";
import type { RawCSVRow } from "@/types/dataset";

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
        const url = `${import.meta.env.BASE_URL}datasets/${dataset.file}`;
        const response = await axios.get<string>(url);
        const result = Papa.parse<RawCSVRow>(response.data, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header.trim(),
        });

        if (result.errors.length > 0) {
          throw new Error(result.errors[0].message);
        }

        setDf(new DataFrame(result.data));
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
