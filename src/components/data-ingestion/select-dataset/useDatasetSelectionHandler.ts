import { useCallback } from "react";

interface SelectionHandlerParams {
  selectedDataset: string | null;
  hasDownstreamResults: boolean;
  setPendingDataset: (name: string | null) => void;
  setSelectedDataset: (name: string) => void;
}

export function useDatasetSelectionHandler({
  selectedDataset,
  hasDownstreamResults,
  setPendingDataset,
  setSelectedDataset,
}: SelectionHandlerParams) {
  return useCallback(
    (datasetName: string) => {
      if (datasetName === selectedDataset) {
        setPendingDataset(null);
        return;
      }
      if (hasDownstreamResults && selectedDataset) {
        setPendingDataset(datasetName);
      } else {
        setSelectedDataset(datasetName);
      }
    },
    [
      selectedDataset,
      hasDownstreamResults,
      setPendingDataset,
      setSelectedDataset,
    ],
  );
}
