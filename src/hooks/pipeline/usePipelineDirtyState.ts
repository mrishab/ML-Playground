import { useMemo } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { usePipelineStore, areExploreSettingsDirty } from "@/stores/pipeline";

export function usePipelineDirtyState(isSplitReady: boolean) {
  const selectedDataset = useDatasetStore((s) => s.selectedDataset);
  const {
    targetColumn,
    selectedFeatures,
    testSplitPercent,
    shuffle,
    problemType,
  } = useMLConfigStore();
  const { pendingDataset, lastSplitConfig } = usePipelineStore();

  const isExploreDirty = useMemo(() => {
    if (!isSplitReady || !lastSplitConfig) return false;
    return areExploreSettingsDirty(lastSplitConfig, {
      datasetName: selectedDataset,
      problemType,
      targetColumn,
      selectedFeatures,
      testSplitPercent,
      shuffle,
    });
  }, [
    isSplitReady,
    lastSplitConfig,
    selectedDataset,
    problemType,
    targetColumn,
    selectedFeatures,
    testSplitPercent,
    shuffle,
  ]);

  const isDatasetDirty =
    pendingDataset !== null && pendingDataset !== selectedDataset;
  const isDownstreamStale = isExploreDirty || isDatasetDirty;

  return { isExploreDirty, isDatasetDirty, isDownstreamStale, pendingDataset };
}
