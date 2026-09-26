import { useMemo } from "react";
import type { DataFrame } from "danfojs";

export function useExploreColumns(df: DataFrame | null) {
  const columns = useMemo(() => {
    if (!df) return [];
    return (df.columns as string[]).filter((col) => col !== "");
  }, [df]);

  const numericColumns = useMemo(() => {
    if (!df) return [];
    return columns.filter((col) => {
      const dtype = df.column(col).dtype;
      return dtype === "float32" || dtype === "int32";
    });
  }, [df, columns]);

  return {
    columns,
    numericColumns,
    availableInteractionColumns: numericColumns,
  };
}
