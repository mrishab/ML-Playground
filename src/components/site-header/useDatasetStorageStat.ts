import { useSavedDatasetsStore } from "@/stores/savedDatasets";

export function useDatasetStorageStat() {
  const formattedSize = useSavedDatasetsStore((s) => s.formattedSize);
  const datasetCount = useSavedDatasetsStore((s) => s.datasets.length);

  return {
    formattedSize,
    datasetCount,
  };
}
