import { useState } from "react";
import type { DropNullStrategy } from "@/types/dataCleanup";

export function useDropNullForm(
  columns: string[],
  onDropRows: (strat: DropNullStrategy, targetCol?: string) => void,
  onDropCols: (threshold: number) => void,
) {
  const [rowStrategy, setRowStrategy] = useState<DropNullStrategy>("any");
  const [selectedCol, setSelectedCol] = useState<string>(columns[0] || "");
  const [threshold, setThreshold] = useState<number>(50);

  const handleDropRowsSubmit = () => {
    onDropRows(rowStrategy, rowStrategy === "selected" ? selectedCol : undefined);
  };

  const handleDropColsSubmit = () => {
    onDropCols(threshold);
  };

  return {
    rowStrategy,
    setRowStrategy,
    selectedCol,
    setSelectedCol,
    threshold,
    setThreshold,
    handleDropRowsSubmit,
    handleDropColsSubmit,
  };
}
