import type { DataFrame } from "danfojs";
import type { SavedDataset } from "@/types/savedDataset";
import { createDataFrameFromSaved } from "@/lib/datasets/dataFrameFromSaved";

interface LoadSavedParams {
  saved: SavedDataset;
  setDf: (df: DataFrame | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onReset: () => void;
}

export function loadSavedDataset({
  saved,
  setDf,
  setLoading,
  setError,
  onReset,
}: LoadSavedParams) {
  setError(null);
  setLoading(false);
  const df = createDataFrameFromSaved(saved);
  setDf(df);
  onReset();
}
