import { useMemo } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { usePipelineStore, areExploreSettingsDirty } from "@/stores/pipeline";

export function usePipelineDirtyState(isSplitReady: boolean) {
  const selectedDataset = useDatasetStore((s) => s.selectedDataset);
  const targetColumn = useMLConfigStore((s) => s.targetColumn);
  const selectedFeatures = useMLConfigStore((s) => s.selectedFeatures);
  const testSplitPercent = useMLConfigStore((s) => s.testSplitPercent);
  const shuffle = useMLConfigStore((s) => s.shuffle);
  const problemType = useMLConfigStore((s) => s.problemType);
  const pendingDataset = usePipelineStore((s) => s.pendingDataset);
  const lastSplitConfig = usePipelineStore((s) => s.lastSplitConfig);

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
