import { useState, useEffect } from "react";
import type { DataFrame } from "danfojs";
import type { CleanupHistoryEntry } from "@/types/dataCleanup";

export function useCleanupState(df: DataFrame | null) {
  const [originalDf, setOriginalDf] = useState<DataFrame | null>(df);
  const [undoStack, setUndoStack] = useState<DataFrame[]>([]);
  const [history, setHistory] = useState<CleanupHistoryEntry[]>([]);

  useEffect(() => {
    if (!originalDf && df) {
      setOriginalDf(df);
    }
  }, [df, originalDf]);

  return {
    originalDf,
    setOriginalDf,
    undoStack,
    setUndoStack,
    history,
    setHistory,
  };
}
