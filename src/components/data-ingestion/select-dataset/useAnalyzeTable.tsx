import { useDatasetStore } from "@/stores/dataset";
import { computeColumnStats } from "./computeColumnStats";
import { createAnalyzeColumns } from "./createAnalyzeColumns";

export { computeColumnStats, createAnalyzeColumns };

export function useAnalyzeTable() {
  const df = useDatasetStore((state) => state.df);

  if (!df) return null;

  return {
    data: computeColumnStats(df),
    columns: createAnalyzeColumns(),
  };
}
