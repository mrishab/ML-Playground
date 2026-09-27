import { useMemo } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { computeColumnStats } from "./computeColumnStats";
import { createAnalyzeColumns } from "./createAnalyzeColumns";

export { computeColumnStats, createAnalyzeColumns };

export function useAnalyzeTable() {
  const df = useDatasetStore((state) => state.df);
  const data = useMemo(() => (df ? computeColumnStats(df) : []), [df]);
  const columns = useMemo(() => createAnalyzeColumns(), []);

  if (!df) return null;

  return { data, columns };
}
