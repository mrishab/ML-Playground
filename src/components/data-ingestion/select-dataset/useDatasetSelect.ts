import { useMemo } from "react";
import { DATASETS, type Dataset } from "./datasetsData";
import type { DatasetOption } from "./datasetTypes";
import { getCustomOptions, getStandardOptions } from "./datasetOptions";
import { useDatasetSelectStores } from "./useDatasetSelectStores";
import { useDatasetSelectionHandler } from "./useDatasetSelectionHandler";
import { useSavedDatasetsStore } from "@/stores/savedDatasets";

export { DATASETS, type Dataset, type DatasetOption };

export function useDatasetSelect() {
  const stores = useDatasetSelectStores();
  const savedDatasets = useSavedDatasetsStore((s) => s.datasets);
  const deleteSaved = useSavedDatasetsStore((s) => s.deleteDataset);
  const hasDownstreamResults = stores.hasDownstreamResults;

  const customOptions = useMemo(
    () => getCustomOptions(stores.customDatasets, savedDatasets),
    [stores.customDatasets, savedDatasets],
  );
  const standardOptions = useMemo(() => getStandardOptions(), []);
  const allDatasets = useMemo(
    () => [...customOptions, ...standardOptions],
    [customOptions, standardOptions],
  );

  const onSelect = useDatasetSelectionHandler({
    selectedDataset: stores.selectedDataset,
    hasDownstreamResults,
    setPendingDataset: stores.setPendingDataset,
    setSelectedDataset: stores.setSelectedDataset,
  });

  const handleDelete = (name: string) => {
    stores.removeCustomDataset(name);
    const saved = savedDatasets.find((d) => d.name === name);
    if (saved) deleteSaved(saved.id);
  };

  return {
    datasets: allDatasets,
    customDatasets: customOptions,
    standardDatasets: standardOptions,
    selectedDataset: stores.selectedDataset,
    pendingDataset: stores.pendingDataset,
    hasDownstreamResults,
    onSelect,
    onDeleteCustom: handleDelete,
  };
}
