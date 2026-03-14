import type { ColumnStats } from "@/types/dataset";
import { useDatasetStore } from "@/stores/dataset";
import { extractNumber } from "@/lib/number";
import { DataFrame } from "danfojs";

function computeColumnStats(df: DataFrame): ColumnStats[] {
  const [rowCount] = df.shape as [number, number];
  const columns: ColumnStats[] = [];

  for (const col of df.columns) {
    const series = df.column(col);
    const dtype = series.dtype;
    const count = extractNumber(series.count());
    const missing = rowCount - count;
    const unique = series.unique().shape[0];

    const stats: ColumnStats = {
      column: col,
      dtype,
      count,
      missing,
      unique,
    };

    if (dtype === "float32" || dtype === "int32") {
      stats.mean = extractNumber(series.mean());
      stats.std = extractNumber(series.std());
      stats.min = extractNumber(series.min());
      stats.max = extractNumber(series.max());
      stats.median = extractNumber(series.median());
    }

    columns.push(stats);
  }

  return columns;
}

export function useAnalyzeTable() {
  const df = useDatasetStore((state) => state.df);

  if (!df) return null;

  return computeColumnStats(df);
}
