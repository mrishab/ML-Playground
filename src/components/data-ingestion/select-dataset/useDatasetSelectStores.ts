import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineStore } from "@/stores/pipeline";

export function useDatasetSelectStores() {
  const selectedDataset = useDatasetStore((s) => s.selectedDataset);
  const setSelectedDataset = useDatasetStore((s) => s.setSelectedDataset);
  const customDatasets = useDatasetStore((s) => s.customDatasets);
  const removeCustomDataset = useDatasetStore((s) => s.removeCustomDataset);
  const isSplit = useMLConfigStore((s) => s.isSplit);
  const hasModelResults = useTrainingResultsStore(
    (s) =>
      s.linearRegression.metrics !== null ||
      s.knn.metrics !== null ||
      s.lda.metrics !== null ||
      s.logisticRegression.metrics !== null,
  );
  const { pendingDataset, setPendingDataset } = usePipelineStore();

  return {
    selectedDataset,
    setSelectedDataset,
    customDatasets,
    removeCustomDataset,
    isSplit,
    hasDownstreamResults: isSplit || hasModelResults,
    pendingDataset,
    setPendingDataset,
  };
}
