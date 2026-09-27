import { useMemo } from "react";
import { DATASETS, type Dataset } from "./datasetsData";
import type { DatasetOption } from "./datasetTypes";
import {
  getCustomOptions,
  getStandardOptions,
  checkHasDownstreamResults,
} from "./datasetOptions";
import { useDatasetSelectStores } from "./useDatasetSelectStores";
import { useDatasetSelectionHandler } from "./useDatasetSelectionHandler";

export { DATASETS, type Dataset, type DatasetOption };

export function useDatasetSelect() {
  const stores = useDatasetSelectStores();
  const hasDownstreamResults = checkHasDownstreamResults(
    stores.isSplit,
    stores.results,
  );

  const customOptions = useMemo(
    () => getCustomOptions(stores.customDatasets),
    [stores.customDatasets],
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

  return {
    datasets: allDatasets,
    customDatasets: customOptions,
    standardDatasets: standardOptions,
    selectedDataset: stores.selectedDataset,
    pendingDataset: stores.pendingDataset,
    hasDownstreamResults,
    onSelect,
    onDeleteCustom: stores.removeCustomDataset,
  };
}
