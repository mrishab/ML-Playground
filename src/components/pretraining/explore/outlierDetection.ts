import * as dfd from "danfojs";
import type { DataFrame } from "danfojs";
import { toFiniteNumbers, getQuantile } from "@/lib/stats";
import type { OutlierBoundsMap } from "@/types/dataset";

export function computeColumnOutliers(
  df: DataFrame,
  numericColumns: string[],
  multiplier: number,
) {
  return numericColumns
    .map((column) => {
      const values = toFiniteNumbers(df.column(column).values as unknown[]);
      if (values.length === 0) return null;
      const sorted = [...values].sort((a, b) => a - b);
      const q1 = getQuantile(sorted, 0.25);
      const q3 = getQuantile(sorted, 0.75);
      const iqr = q3 - q1;
      const lower = q1 - multiplier * iqr;
      const upper = q3 + multiplier * iqr;
      const outlierCount = values.filter((v) => v < lower || v > upper).length;
      return { column, values, outlierCount, lower, upper };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}

export function partitionOutlierRows(
  df: DataFrame,
  numericColumns: string[],
  bounds: OutlierBoundsMap,
) {
  const rowValues = df.values as unknown[][];
  const allColumns = df.columns as string[];
  const colIdx = new Map(allColumns.map((c, i) => [c, i] as const));

  const isOutlier = (row: unknown[]) =>
    numericColumns.some((col) => {
      const b = bounds[col];
      const idx = colIdx.get(col);
      if (!b || idx === undefined) return false;
      const val = row[idx];
      return (
        typeof val === "number" &&
        Number.isFinite(val) &&
        (val < b.lower || val > b.upper)
      );
    });

  const outlier: unknown[][] = [];
  const inlier: unknown[][] = [];
  for (const row of rowValues) {
    (isOutlier(row) ? outlier : inlier).push(row);
  }
  return { outlier, inlier };
}

export function filterOutlierDf(df: DataFrame, inlier: unknown[][]): DataFrame {
  return new dfd.DataFrame(inlier, { columns: df.columns as string[] });
}
