import { useCallback, useMemo } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineStore } from "@/stores/pipeline";
import { DATASETS, type Dataset } from "./datasetsData";

export { DATASETS, type Dataset };

export type DatasetOption = {
  name: string;
  file?: string;
  problemType?: string;
  isCustom?: boolean;
  rowCount?: number;
  columnCount?: number;
  fileSize?: number;
};

export function useDatasetSelect() {
  const selectedDataset = useDatasetStore((state) => state.selectedDataset);
  const setSelectedDataset = useDatasetStore(
    (state) => state.setSelectedDataset,
  );
  const customDatasets = useDatasetStore((state) => state.customDatasets);
  const removeCustomDataset = useDatasetStore(
    (state) => state.removeCustomDataset,
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

  const customOptions: DatasetOption[] = useMemo(
    () =>
      customDatasets.map((cd) => ({
        name: cd.name,
        problemType: cd.problemType,
        isCustom: true,
        rowCount: cd.rowCount,
        columnCount: cd.columnCount,
        fileSize: cd.fileSize,
      })),
    [customDatasets],
  );

  const standardOptions: DatasetOption[] = useMemo(
    () =>
      DATASETS.map((d) => ({
        name: d.name,
        file: d.file,
        problemType: d.problemType,
        isCustom: false,
      })),
    [],
  );

  const allDatasets = useMemo(
    () => [...customOptions, ...standardOptions],
    [customOptions, standardOptions],
  );

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

  const handleDeleteCustom = useCallback(
    (datasetName: string) => {
      removeCustomDataset(datasetName);
    },
    [removeCustomDataset],
  );

  return {
    datasets: allDatasets,
    customDatasets: customOptions,
    standardDatasets: standardOptions,
    selectedDataset,
    pendingDataset,
    hasDownstreamResults,
    onSelect: handleSelect,
    onDeleteCustom: handleDeleteCustom,
  };
}
