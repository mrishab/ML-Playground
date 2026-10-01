import { useCallback } from "react";
import type { OutlierStrategy, RowFilter } from "@/types/dataCleanup";
import { dropDuplicateRows } from "@/lib/data-cleanup/duplicateOps";
import { handleOutliers } from "@/lib/data-cleanup/outlierOps";
import { applyRowFilter } from "@/lib/data-cleanup/filterOps";

interface RowActionParams {
  columns: string[];
  values: unknown[][];
  onApply: (newVals: unknown[][], newCols: string[], desc: string) => void;
}

export function useRowActions({ columns, values, onApply }: RowActionParams) {
  const handleRemoveDuplicates = useCallback(() => {
    const nextVals = dropDuplicateRows(values);
    const removed = values.length - nextVals.length;
    onApply(nextVals, columns, `Removed ${removed} duplicate row(s)`);
  }, [columns, values, onApply]);

  const handleOutlierAction = useCallback((col: string, strat: OutlierStrategy) => {
    const idx = columns.indexOf(col);
    if (idx === -1) return;
    const nextVals = handleOutliers(values, idx, strat);
    onApply(nextVals, columns, `${strat === "clip" ? "Clipped" : "Dropped"} outliers in "${col}"`);
  }, [columns, values, onApply]);

  const handleFilter = useCallback((filter: RowFilter, keep: boolean) => {
    const nextVals = applyRowFilter(columns, values, filter, keep);
    const affected = values.length - nextVals.length;
    onApply(
      nextVals,
      columns,
      `${keep ? "Filtered to" : "Dropped"} rows where ${filter.column} ${filter.operator} "${filter.value}" (-${affected} rows)`,
    );
  }, [columns, values, onApply]);

  return { handleRemoveDuplicates, handleOutlierAction, handleFilter };
}
