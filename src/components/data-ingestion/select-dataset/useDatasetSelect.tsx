import { useCallback } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineStore } from "@/stores/pipeline";
import { DATASETS, type Dataset } from "./datasetsData";

export { DATASETS, type Dataset };

export function useDatasetSelect() {
  const selectedDataset = useDatasetStore((state) => state.selectedDataset);
  const setSelectedDataset = useDatasetStore(
    (state) => state.setSelectedDataset,
  );
  const isSplit = useMLConfigStore((state) => state.isSplit);
  const { linearRegression, knn, lda, logisticRegression } =
    useTrainingResultsStore();

  const { pendingDataset, setPendingDataset } = usePipelineStore();

  const hasDownstreamResults =
    isSplit ||
    linearRegression.metrics !== null ||
    knn.metrics !== null ||
    lda.metrics !== null ||
    logisticRegression.metrics !== null;

  const handleSelect = useCallback(
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

  return {
    datasets: DATASETS,
    selectedDataset,
    pendingDataset,
    hasDownstreamResults,
    onSelect: handleSelect,
  };
}
