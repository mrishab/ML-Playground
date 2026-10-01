import { useMemo } from "react";
import type { DataFrame } from "danfojs";
import { computeMissingSummary } from "@/lib/data-cleanup/missingCheck";
import { countDuplicateRows } from "@/lib/data-cleanup/duplicateOps";

export function useCleanupDataExtract(df: DataFrame | null) {
  const columns = useMemo<string[]>(() => {
    if (!df) return [];
    return (df.columns as unknown[]).map((c) => String(c ?? ""));
  }, [df]);

  const values = useMemo<unknown[][]>(() => {
    if (!df || !Array.isArray(df.values)) return [];
    return df.values as unknown[][];
  }, [df]);

  const missingSummary = useMemo(
    () => computeMissingSummary(columns, values),
    [columns, values],
  );

  const duplicateCount = useMemo(
    () => countDuplicateRows(values),
    [values],
  );

  const numericColumns = useMemo(() => {
    return columns.filter((col, idx) => {
      let numericHits = 0;
      let sampleHits = 0;
      for (let r = 0; r < Math.min(values.length, 30); r++) {
        const val = values[r]?.[idx];
        if (val !== null && val !== undefined && val !== "") {
          sampleHits++;
          if (typeof val === "number" || !isNaN(Number(val))) numericHits++;
        }
      }
      return sampleHits > 0 && numericHits / sampleHits >= 0.8;
    });
  }, [columns, values]);

  return {
    columns,
    values,
    rowCount: values.length,
    colCount: columns.length,
    missingSummary,
    duplicateCount,
    numericColumns,
  };
}
