import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSavedDatasetsStore } from "@/stores/savedDatasets";
import { filterDatasets } from "./filterDatasets";
import { useDatasetItemDialogs } from "./useDatasetItemDialogs";
import { loadSavedDatasetIntoPipeline } from "@/lib/datasets/loadIntoPipeline";
import type { SavedDataset } from "@/types/savedDataset";

export function useDatasetsPage() {
  const store = useSavedDatasetsStore();
  const dialogs = useDatasetItemDialogs();
  const navigate = useNavigate();

  const filtered = useMemo(
    () =>
      filterDatasets(
        store.datasets,
        store.searchQuery,
        store.filterSource,
        store.sortBy,
      ),
    [store.datasets, store.searchQuery, store.filterSource, store.sortBy],
  );

  const handleLoadInPipeline = (dataset: SavedDataset) => {
    loadSavedDatasetIntoPipeline(dataset);
    navigate("/data/select");
  };

  return {
    ...store,
    dialogs,
    filteredDatasets: filtered,
    handleLoadInPipeline,
  };
}
