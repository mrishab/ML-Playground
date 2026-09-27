import type { DatasetRowData } from "@/types/dataset";

interface ProcessedRows {
  rows: DatasetRowData[];
  missingCount: number;
}

export function extractRows(
  data: unknown[],
  rawHeaders: string[],
  headers: string[],
): ProcessedRows {
  let missingCount = 0;
  const rows: DatasetRowData[] = [];

  for (const rawRow of data) {
    if (!rawRow || typeof rawRow !== "object") continue;

    let hasAnyValue = false;
    const cleanRow: DatasetRowData = {};

    headers.forEach((header, idx) => {
      const rawKey = rawHeaders[idx] ?? header;
      let val = (rawRow as DatasetRowData)[rawKey];
      if (val === undefined || val === "" || val === null) {
        val = null;
        missingCount++;
      } else {
        hasAnyValue = true;
      }
      cleanRow[header] = val;
    });

    if (hasAnyValue) {
      rows.push(cleanRow);
    }
  }

  return { rows, missingCount };
}
