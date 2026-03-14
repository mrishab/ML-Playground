import { useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import { DataFrame } from "danfojs";
import { useDatasetStore } from "@/stores/dataset";
import { DATASETS } from "@/components/useDatasetSelect";

type CSVRow = Record<string, string>;

export function useDatasetLoader() {
  const { selectedDataset, setDf, setLoading, setError } = useDatasetStore();

  useEffect(() => {
    if (!selectedDataset) {
      setDf(null);
      return;
    }

    const dataset = DATASETS.find((d) => d.name === selectedDataset);
    if (!dataset) return;

    const loadDataset = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<string>(`/datasets/${dataset.file}`);
        const result = Papa.parse<CSVRow>(response.data, {
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
  }, [selectedDataset, setDf, setLoading, setError]);
}
