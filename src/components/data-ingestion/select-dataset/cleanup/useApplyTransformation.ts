import { useCallback } from "react";
import { DataFrame } from "danfojs";
import { useDatasetStore } from "@/stores/dataset";
import type { CleanupHistoryEntry } from "@/types/dataCleanup";

interface TransformationParams {
  newValues: unknown[][];
  newColumns: string[];
  description: string;
  undoStack: DataFrame[];
  setUndoStack: React.Dispatch<React.SetStateAction<DataFrame[]>>;
  setHistory: React.Dispatch<React.SetStateAction<CleanupHistoryEntry[]>>;
}

export function useApplyTransformation(df: DataFrame | null) {
  const setDf = useDatasetStore((s) => s.setDf);

  const applyTransformation = useCallback(
    ({ newValues, newColumns, description, undoStack, setUndoStack, setHistory }: TransformationParams) => {
      if (!df) return;
      setUndoStack([...undoStack, df]);
      const nextDf = new DataFrame(newValues, { columns: newColumns });
      const entry: CleanupHistoryEntry = {
        id: `h_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        description,
        timestamp: Date.now(),
        rowsBefore: Array.isArray(df.values) ? df.values.length : 0,
        rowsAfter: newValues.length,
        colsBefore: df.columns.length,
        colsAfter: newColumns.length,
      };
      setHistory((prev) => [entry, ...prev]);
      setDf(nextDf);
    },
    [df, setDf],
  );

  return { applyTransformation, setDf };
}
