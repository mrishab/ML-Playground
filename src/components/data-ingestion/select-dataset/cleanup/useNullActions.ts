import { useCallback } from "react";
import type { ImputationStrategy, DropNullStrategy } from "@/types/dataCleanup";
import { imputeColumn } from "@/lib/data-cleanup/imputeOps";
import { dropNullRows, dropColumnsWithHighNulls } from "@/lib/data-cleanup/dropNullOps";

interface NullActionParams {
  columns: string[];
  values: unknown[][];
  onApply: (newVals: unknown[][], newCols: string[], desc: string) => void;
}

export function useNullActions({ columns, values, onApply }: NullActionParams) {
  const handleImpute = useCallback((col: string, strategy: ImputationStrategy, constVal?: unknown) => {
    const idx = columns.indexOf(col);
    if (idx === -1) return;
    const nextVals = imputeColumn(values, idx, strategy, constVal);
    onApply(nextVals, columns, `Imputed missing values in "${col}" using ${strategy}`);
  }, [columns, values, onApply]);

  const handleDropNullRows = useCallback((strategy: DropNullStrategy, targetCol?: string) => {
    const targetIdxs = targetCol ? [columns.indexOf(targetCol)].filter((i) => i >= 0) : undefined;
    const nextVals = dropNullRows(values, strategy, targetIdxs);
    const label = targetCol ? `where "${targetCol}" is missing` : strategy === "all" ? "where all cells are missing" : "with any missing cells";
    onApply(nextVals, columns, `Dropped rows ${label}`);
  }, [columns, values, onApply]);

  const handleDropColumnsByNulls = useCallback((thresholdPercent: number) => {
    const result = dropColumnsWithHighNulls(columns, values, thresholdPercent);
    const droppedCount = columns.length - result.columns.length;
    onApply(result.values, result.columns, `Dropped ${droppedCount} column(s) with >${thresholdPercent}% nulls`);
  }, [columns, values, onApply]);

  return { handleImpute, handleDropNullRows, handleDropColumnsByNulls };
}
