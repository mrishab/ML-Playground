import { useCallback } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useCleanupState } from "./useCleanupState";
import { useCleanupDataExtract } from "./useCleanupDataExtract";
import { useApplyTransformation } from "./useApplyTransformation";
import { useNullActions } from "./useNullActions";
import { useRowActions } from "./useRowActions";
import { useColumnActions } from "./useColumnActions";

export function useDataCleanup() {
  const df = useDatasetStore((s) => s.df);
  const { originalDf, undoStack, setUndoStack, history, setHistory } = useCleanupState(df);
  const dataExtract = useCleanupDataExtract(df);
  const { applyTransformation, setDf } = useApplyTransformation(df);

  const onApply = useCallback((newVals: unknown[][], newCols: string[], desc: string) => {
    applyTransformation({
      newValues: newVals,
      newColumns: newCols,
      description: desc,
      undoStack,
      setUndoStack,
      setHistory,
    });
  }, [applyTransformation, undoStack, setUndoStack, setHistory]);

  const nullActions = useNullActions({ columns: dataExtract.columns, values: dataExtract.values, onApply });
  const rowActions = useRowActions({ columns: dataExtract.columns, values: dataExtract.values, onApply });
  const colActions = useColumnActions({ columns: dataExtract.columns, values: dataExtract.values, onApply });

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack((s) => s.slice(0, -1));
    setHistory((h) => h.slice(1));
    setDf(prev);
  }, [undoStack, setUndoStack, setHistory, setDf]);

  const handleReset = useCallback(() => {
    if (!originalDf) return;
    setUndoStack([]);
    setHistory([]);
    setDf(originalDf);
  }, [originalDf, setUndoStack, setHistory, setDf]);

  return {
    ...dataExtract,
    ...nullActions,
    ...rowActions,
    ...colActions,
    history,
    canUndo: undoStack.length > 0,
    handleUndo,
    handleReset,
  };
}
