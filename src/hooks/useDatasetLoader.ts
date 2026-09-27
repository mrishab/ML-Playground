import { useEffect } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { loadStandardDataset } from "./loadStandardDataset";

export function useDatasetLoader() {
  const { selectedDataset, customDatasets, setDf, setLoading, setError } =
    useDatasetStore();
  const resetMLConfig = useMLConfigStore((state) => state.reset);
  const setProblemType = useMLConfigStore((state) => state.setProblemType);
  const setTargetColumn = useMLConfigStore((state) => state.setTargetColumn);
  const resetTrainingResults = useTrainingResultsStore(
    (state) => state.resetAll,
  );

  useEffect(() => {
    const resetAll = () => {
      resetMLConfig();
      resetTrainingResults();
    };

    if (!selectedDataset) {
      setDf(null);
      resetAll();
      return;
    }

    const custom = customDatasets.find((d) => d.name === selectedDataset);
    if (custom) {
      setError(null);
      setLoading(false);
      setDf(custom.df);
      resetAll();
      if (custom.problemType) setProblemType(custom.problemType);
      if (custom.targetColumn) setTargetColumn(custom.targetColumn);
      return;
    }

    loadStandardDataset({
      datasetName: selectedDataset,
      setLoading,
      setError,
      setDf,
      onReset: resetAll,
    });
  }, [
    selectedDataset,
    customDatasets,
    setDf,
    setLoading,
    setError,
    resetMLConfig,
    resetTrainingResults,
    setProblemType,
    setTargetColumn,
  ]);
}
