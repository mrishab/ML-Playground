import type { DatasetRowData } from "@/types/dataset";

export type ColumnType = "numeric" | "text" | "boolean";
export type ColumnTypeMap = Record<string, ColumnType>;

export function inferColumnTypes(
  rows: DatasetRowData[],
  headers: string[],
): ColumnTypeMap {
  const columnTypes: ColumnTypeMap = {};

  for (const header of headers) {
    let numericCount = 0;
    let booleanCount = 0;
    let validCount = 0;

    for (const row of rows) {
      const val = row[header];
      if (val === null || val === undefined || val === "") continue;
      validCount++;

      if (typeof val === "boolean") {
        booleanCount++;
      } else if (typeof val === "number" && !isNaN(val)) {
        numericCount++;
      }
    }

    if (validCount === 0) {
      columnTypes[header] = "text";
    } else if (booleanCount / validCount > 0.8) {
      columnTypes[header] = "boolean";
    } else if (numericCount / validCount > 0.8) {
      columnTypes[header] = "numeric";
    } else {
      columnTypes[header] = "text";
    }
  }

  return columnTypes;
}
