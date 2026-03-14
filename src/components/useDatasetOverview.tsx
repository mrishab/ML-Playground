import type { OverviewStats } from "@/types/dataset";
import { useDatasetStore } from "@/stores/dataset";

function computeOverviewStats(df: import("danfojs").DataFrame): OverviewStats {
  const [rows, columns] = df.shape as [number, number];
  let numericColumns = 0;
  let categoricalColumns = 0;

  for (const col of df.columns) {
    const dtype = df.column(col).dtype;
    if (dtype === "float32" || dtype === "int32") {
      numericColumns++;
    } else {
      categoricalColumns++;
    }
  }

  return { rows, columns, numericColumns, categoricalColumns };
}

export function useDatasetOverview() {
  const df = useDatasetStore((state) => state.df);

  if (!df) return null;

  return computeOverviewStats(df);
}
