import { useCallback } from "react";
import type { ProblemType } from "@/stores/mlConfig";
import type { ParsedCSVResult } from "@/lib/csvUpload";
import { executeCSVImport } from "./saveCustomDataset";
import { useCSVImportStores } from "./useCSVImportStores";

interface ImportActionParams {
  parsed: ParsedCSVResult | null;
  datasetName: string;
  targetColumn: string;
  problemType: ProblemType;
  onClose: () => void;
  onSuccess?: (datasetName: string) => void;
  setError: (err: string | null) => void;
}

export function useCSVImportAction(params: ImportActionParams) {
  const stores = useCSVImportStores();
  const {
    parsed,
    datasetName,
    targetColumn,
    problemType,
    onClose,
    onSuccess,
    setError,
  } = params;

  return useCallback(() => {
    if (!parsed) return;
    const name = datasetName.trim();
    if (!name) return setError("Please provide a name for this dataset.");
    if (!targetColumn)
      return setError("Please select a target column for this dataset.");
    try {
      executeCSVImport({ name, problemType, targetColumn, parsed }, stores);
      onClose();
      onSuccess?.(name);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create DataFrame.",
      );
    }
  }, [
    parsed,
    datasetName,
    targetColumn,
    problemType,
    stores,
    onClose,
    onSuccess,
    setError,
  ]);
}
