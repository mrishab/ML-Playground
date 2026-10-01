import { useState, useMemo } from "react";
import type { ImputationStrategy, MissingSummary } from "@/types/dataCleanup";

export function useImputeForm(
  missingSummary: MissingSummary,
  columns: string[],
  onImpute: (col: string, strat: ImputationStrategy, constVal?: unknown) => void,
) {
  const missingCols = useMemo(() => {
    return missingSummary.byColumn.filter((c) => c.missing > 0);
  }, [missingSummary]);

  const defaultCol = missingCols[0]?.column || columns[0] || "";
  const [selectedCol, setSelectedCol] = useState<string>(defaultCol);
  const [strategy, setStrategy] = useState<ImputationStrategy>("mean");
  const [constantVal, setConstantVal] = useState<string>("");

  const currentMissing = missingSummary.byColumn.find((c) => c.column === selectedCol)?.missing ?? 0;

  const handleSubmit = () => {
    if (!selectedCol) return;
    onImpute(selectedCol, strategy, strategy === "constant" ? constantVal : undefined);
  };

  return {
    missingCols,
    selectedCol,
    setSelectedCol,
    strategy,
    setStrategy,
    constantVal,
    setConstantVal,
    currentMissing,
    handleSubmit,
  };
}
