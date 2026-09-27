import { DATASETS } from "@/components/data-ingestion/select-dataset/useDatasetSelect";
import { fetchAndParseDataset } from "./fetchDataset";
import type { DataFrame } from "danfojs";

interface LoadStandardOptions {
  datasetName: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDf: (df: DataFrame | null) => void;
  onReset: () => void;
}

export async function loadStandardDataset({
  datasetName,
  setLoading,
  setError,
  setDf,
  onReset,
}: LoadStandardOptions) {
  const dataset = DATASETS.find((d) => d.name === datasetName);
  if (!dataset) return;

  setLoading(true);
  setError(null);
  onReset();

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
}
