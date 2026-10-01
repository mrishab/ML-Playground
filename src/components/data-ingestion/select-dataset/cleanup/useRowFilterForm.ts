import { useState, useMemo } from "react";
import type { FilterOperator, RowFilter } from "@/types/dataCleanup";
import { evaluateFilterMatch } from "@/lib/data-cleanup/filterOps";

export function useRowFilterForm(
  columns: string[],
  values: unknown[][],
  onFilter: (filter: RowFilter, keep: boolean) => void,
) {
  const [column, setColumn] = useState<string>(columns[0] || "");
  const [operator, setOperator] = useState<FilterOperator>("contains");
  const [value, setValue] = useState<string>("");

  const filterConfig: RowFilter = useMemo(
    () => ({ column, operator, value }),
    [column, operator, value],
  );

  const matchCount = useMemo(() => {
    const colIdx = columns.indexOf(column);
    if (colIdx === -1) return 0;
    return values.filter((row) => evaluateFilterMatch(row[colIdx], filterConfig)).length;
  }, [columns, values, column, filterConfig]);

  const handleKeep = () => onFilter(filterConfig, true);
  const handleDrop = () => onFilter(filterConfig, false);

  return { column, setColumn, operator, setOperator, value, setValue, matchCount, handleKeep, handleDrop };
}
