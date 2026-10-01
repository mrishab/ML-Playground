import type { MissingSummary } from "@/types/dataCleanup";
import type { ColumnDtypeMap } from "@/types/savedDataset";

export function isMissingValue(val: unknown): boolean {
  if (val === null || val === undefined) return true;
  if (typeof val === "number" && isNaN(val)) return true;
  if (typeof val === "string") {
    const trimmed = val.trim().toLowerCase();
    return (
      trimmed === "" ||
      trimmed === "na" ||
      trimmed === "n/a" ||
      trimmed === "nan" ||
      trimmed === "null" ||
      trimmed === "?" ||
      trimmed === "none"
    );
  }
  return false;
}

export function computeMissingSummary(
  columns: string[],
  values: unknown[][],
  dtypes: ColumnDtypeMap = {},
): MissingSummary {
  const rowCount = values.length;
  const totalCells = rowCount * columns.length;
  let totalMissing = 0;

  const byColumn = columns.map((col, colIdx) => {
    let colMissing = 0;
    for (let r = 0; r < rowCount; r++) {
      if (isMissingValue(values[r]?.[colIdx])) {
        colMissing++;
      }
    }
    totalMissing += colMissing;
    return {
      column: col,
      missing: colMissing,
      percent: rowCount > 0 ? (colMissing / rowCount) * 100 : 0,
      dtype: dtypes[col] || "unknown",
    };
  });

  const columnsWithMissing = byColumn.filter((c) => c.missing > 0).length;
  const missingPercent = totalCells > 0 ? (totalMissing / totalCells) * 100 : 0;

  return {
    totalCells,
    totalMissing,
    missingPercent,
    columnsWithMissing,
    byColumn,
  };
}
