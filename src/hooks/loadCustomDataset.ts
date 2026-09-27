import type { DataFrame } from "danfojs";
import type { CustomDataset } from "@/stores/dataset/types";
import { useMLConfigStore } from "@/stores/mlConfig";

interface LoadCustomDatasetParams {
  custom: CustomDataset;
  setDf: (df: DataFrame | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  onReset: () => void;
}

export function loadCustomDataset({
  custom,
  setDf,
  setLoading,
  setError,
  onReset,
}: LoadCustomDatasetParams) {
  setError(null);
  setLoading(false);
  setDf(custom.df);
  onReset();
  const { setProblemType, setTargetColumn } = useMLConfigStore.getState();
  if (custom.problemType) setProblemType(custom.problemType);
  if (custom.targetColumn) setTargetColumn(custom.targetColumn);
}
