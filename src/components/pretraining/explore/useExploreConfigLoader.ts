import { useCallback, useState } from "react";
import { DATASETS } from "@/components/data-ingestion/select-dataset/useDatasetSelect";
import { loadDatasetConfig } from "@/lib/datasetConfig";
import type { SelectedFeature } from "@/stores/mlConfig";
import type { ProblemType } from "@/types/dataset";

export function useExploreConfigLoader(
  selectedDataset: string,
  setProblemType: (p: ProblemType) => void,
  setTargetColumn: (c: string) => void,
  setFeatures: (f: SelectedFeature[]) => void,
) {
  const [isLoadingConfig, setIsLoadingConfig] = useState(false);

  const hasDefaultConfig = Boolean(
    DATASETS.find((d) => d.name === selectedDataset),
  );

  const loadDefaultConfig = useCallback(async () => {
    if (!selectedDataset) return;
    const dataset = DATASETS.find((d) => d.name === selectedDataset);
    if (!dataset) return;

    setIsLoadingConfig(true);
    try {
      const config = await loadDatasetConfig(dataset.file);
      if (config) {
        setProblemType(config.problemType);
        setTargetColumn(config.targetColumn);
        setFeatures(config.features);
      }
    } finally {
      setIsLoadingConfig(false);
    }
  }, [selectedDataset, setProblemType, setTargetColumn, setFeatures]);

  return { isLoadingConfig, loadDefaultConfig, hasDefaultConfig };
}
