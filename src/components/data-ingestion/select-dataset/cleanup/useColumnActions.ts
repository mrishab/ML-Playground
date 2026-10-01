import { useCallback } from "react";
import { renameColumn, castColumnType, replaceValue } from "@/lib/data-cleanup/columnOps";
import { dropSpecificColumn } from "@/lib/data-cleanup/dropNullOps";

interface ColumnActionParams {
  columns: string[];
  values: unknown[][];
  onApply: (newVals: unknown[][], newCols: string[], desc: string) => void;
}

export function useColumnActions({ columns, values, onApply }: ColumnActionParams) {
  const handleRename = useCallback((oldName: string, newName: string) => {
    const nextCols = renameColumn(columns, oldName, newName);
    onApply(values, nextCols, `Renamed column "${oldName}" to "${newName}"`);
  }, [columns, values, onApply]);

  const handleDropCol = useCallback((col: string) => {
    const idx = columns.indexOf(col);
    if (idx === -1) return;
    const res = dropSpecificColumn(columns, values, idx);
    onApply(res.values, res.columns, `Dropped column "${col}"`);
  }, [columns, values, onApply]);

  const handleCast = useCallback((col: string, targetType: "numeric" | "string" | "boolean") => {
    const idx = columns.indexOf(col);
    if (idx === -1) return;
    const nextVals = castColumnType(values, idx, targetType);
    onApply(nextVals, columns, `Cast column "${col}" to ${targetType}`);
  }, [columns, values, onApply]);

  const handleReplaceValue = useCallback((col: string, findVal: string, replaceVal: string) => {
    const idx = columns.indexOf(col);
    if (idx === -1) return;
    const nextVals = replaceValue(values, idx, findVal, replaceVal);
    onApply(nextVals, columns, `Replaced "${findVal}" with "${replaceVal}" in "${col}"`);
  }, [columns, values, onApply]);

  return { handleRename, handleDropCol, handleCast, handleReplaceValue };
}
