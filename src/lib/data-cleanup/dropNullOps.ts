import type { DropNullStrategy } from "@/types/dataCleanup";
import { isMissingValue } from "./missingCheck";

export function dropNullRows(
  values: unknown[][],
  strategy: DropNullStrategy,
  targetColIndices?: number[],
): unknown[][] {
  return values.filter((row) => {
    if (strategy === "all") {
      return !row.every(isMissingValue);
    }
    if (strategy === "selected" && targetColIndices && targetColIndices.length > 0) {
      return !targetColIndices.some((idx) => isMissingValue(row[idx]));
    }
    // "any"
    return !row.some(isMissingValue);
  });
}

export function dropColumnsWithHighNulls(
  columns: string[],
  values: unknown[][],
  thresholdPercent: number,
): { columns: string[]; values: unknown[][] } {
  if (values.length === 0) return { columns, values };

  const keepIndices: number[] = [];
  const keepColumns: string[] = [];

  for (let c = 0; c < columns.length; c++) {
    let missingCount = 0;
    for (let r = 0; r < values.length; r++) {
      if (isMissingValue(values[r]?.[c])) missingCount++;
    }
    const pct = (missingCount / values.length) * 100;
    if (pct < thresholdPercent) {
      keepIndices.push(c);
      keepColumns.push(columns[c]);
    }
  }

  const newValues = values.map((row) => keepIndices.map((i) => row[i]));
  return { columns: keepColumns, values: newValues };
}

export function dropSpecificColumn(
  columns: string[],
  values: unknown[][],
  colIndex: number,
): { columns: string[]; values: unknown[][] } {
  if (colIndex < 0 || colIndex >= columns.length) return { columns, values };
  const newColumns = columns.filter((_, i) => i !== colIndex);
  const newValues = values.map((row) => row.filter((_, i) => i !== colIndex));
  return { columns: newColumns, values: newValues };
}
