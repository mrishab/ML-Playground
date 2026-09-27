import { useEffect } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { loadStandardDataset } from "./loadStandardDataset";
import { loadCustomDataset } from "./loadCustomDataset";

export function useDatasetLoader() {
  const { selectedDataset, customDatasets } = useDatasetStore();

  useEffect(() => {
    const { setDf, setLoading, setError } = useDatasetStore.getState();
    const resetAll = () => {
      useMLConfigStore.getState().reset();
      useTrainingResultsStore.getState().resetAll();
    };

    if (!selectedDataset) {
      setDf(null);
      resetAll();
      return;
    }

    const custom = customDatasets.find((d) => d.name === selectedDataset);
    if (custom) {
      loadCustomDataset({
        custom,
        setDf,
        setLoading,
        setError,
        onReset: resetAll,
      });
      return;
    }

    loadStandardDataset({
      datasetName: selectedDataset,
      setLoading,
      setError,
      setDf,
      onReset: resetAll,
    });
  }, [selectedDataset, customDatasets]);
}
