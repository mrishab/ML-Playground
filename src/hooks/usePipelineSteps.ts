import { useStepId } from "@/hooks/pipeline/useStepId";
import { usePipelinePrereqs } from "@/hooks/pipeline/usePipelinePrereqs";
import { usePipelineNav } from "@/hooks/pipeline/usePipelineNav";
import { useStepList } from "@/hooks/pipeline/useStepList";

export function usePipelineSteps() {
  const currentStepId = useStepId();
  const p = usePipelinePrereqs();

  const steps = useStepList(
    {
      hasDataset: p.hasDataset,
      selectedDataset: p.selectedDataset,
      df: p.df,
      isSplitReady: p.isSplitReady,
      xTrain: p.ml.xTrain,
      xTest: p.ml.xTest,
      targetColumn: p.ml.targetColumn,
      selectedFeatures: p.ml.selectedFeatures,
      hasTrainedModel: p.hasTrainedModel,
      modelDesc: p.modelDesc,
      isExploreDirty: p.dirty.isExploreDirty,
      isDatasetDirty: p.dirty.isDatasetDirty,
      isDownstreamStale: p.dirty.isDownstreamStale,
      defaultTrainRoute: p.routes.defaultTrainRoute,
      defaultCompareRoute: p.routes.defaultCompareRoute,
    },
    currentStepId,
  );

  const currentStep = steps.find((s) => s.id === currentStepId) ?? steps[0];
  const nav = usePipelineNav({
    steps,
    currentStepId,
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
    hasTrainedModel: p.hasTrainedModel,
  });

  return {
    steps,
    currentStep,
    currentStepId,
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
    hasTrainedModel: p.hasTrainedModel,
    ...p.dirty,
    ...nav,
    ...p.routes,
  };
}
