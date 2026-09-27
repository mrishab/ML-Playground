import { DataFrame } from "danfojs";

export function createDataFrameFromParsed(
  rows: Record<string, unknown>[],
  headers: string[],
): DataFrame {
  const normalizedRows = rows.map((row) => {
    const item: Record<string, unknown> = {};
    for (const header of headers) {
      item[header] = row[header] ?? null;
    }
    return item;
  });

  return new DataFrame(normalizedRows);
}
