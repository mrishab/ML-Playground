import { useState } from "react";
import type { OutlierStrategy } from "@/types/dataCleanup";

export function useDuplicatesOutliersForm(
  numericColumns: string[],
  onRemoveDuplicates: () => void,
  onHandleOutliers: (col: string, strat: OutlierStrategy) => void,
) {
  const [selectedCol, setSelectedCol] = useState<string>(numericColumns[0] || "");
  const [strategy, setStrategy] = useState<OutlierStrategy>("clip");

  const handleOutlierSubmit = () => {
    if (!selectedCol) return;
    onHandleOutliers(selectedCol, strategy);
  };

  return {
    selectedCol,
    setSelectedCol,
    strategy,
    setStrategy,
    onRemoveDuplicates,
    handleOutlierSubmit,
  };
}
