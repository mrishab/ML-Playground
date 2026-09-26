import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineStore } from "@/stores/pipeline";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { useExploreColumns } from "./useExploreColumns";
import { useExplorePreview } from "./useExplorePreview";
import { useExploreConfigLoader } from "./useExploreConfigLoader";
import { useExploreSubhooks } from "./useExploreSubhooks";
import { getMLConfigFields } from "./getMLConfigFields";

export function useExplorePage() {
  const { df, selectedDataset, setDf } = useDatasetStore();
  const ml = useMLConfigStore();
  const resetTrainingResults = useTrainingResultsStore((s) => s.resetAll);
  const { isExploreDirty } = usePipelineSteps();
  const revertExploreChanges = usePipelineStore((s) => s.revertExploreChanges);

  const cols = useExploreColumns(df);
  const sub = useExploreSubhooks({
    df,
    numericColumns: cols.numericColumns,
    setDf,
    ml,
    selectedDataset,
    resetTrainingResults,
  });
  const preview = useExplorePreview(df, ml.selectedFeatures, ml.targetColumn);
  const config = useExploreConfigLoader(
    selectedDataset,
    ml.setProblemType,
    ml.setTargetColumn,
    ml.setFeatures,
  );

  return {
    df,
    selectedDataset,
    ...cols,
    ...sub,
    ...preview,
    ...config,
    ...getMLConfigFields(ml),
    isExploreDirty,
    revertExploreChanges,
  };
}
