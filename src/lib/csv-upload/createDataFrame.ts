import { DataFrame } from "danfojs";
import type { DatasetRowData } from "@/types/dataset";

export function createDataFrameFromParsed(
  rows: DatasetRowData[],
  headers: string[],
): DataFrame {
  const normalizedRows = rows.map((row) => {
    const item: DatasetRowData = {};
    for (const header of headers) {
      item[header] = row[header] ?? null;
    }
    return item;
  });

  return new DataFrame(normalizedRows);
}
