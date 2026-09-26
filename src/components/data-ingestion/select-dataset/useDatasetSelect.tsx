import { useCallback } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineStore } from "@/stores/pipeline";

type Dataset = {
  name: string;
  file: string;
  problemType?: string;
};

export const DATASETS: Dataset[] = [
  { name: "Boston", file: "Boston.csv", problemType: "regression" },
  { name: "College", file: "College.csv", problemType: "classification" },
  { name: "Heart", file: "heart.csv", problemType: "classification" },
  { name: "Movies", file: "movies.csv", problemType: "regression" },
  { name: "MT Cars", file: "mtcars.csv", problemType: "regression" },
  { name: "S&P Market", file: "Smarket.csv", problemType: "classification" },
  {
    name: "Swiss Census",
    file: "swiss-census.csv",
    problemType: "regression",
  },
];

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

      // If downstream results exist, mark as pending to prevent accidental loss
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
