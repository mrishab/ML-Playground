import type { PipelineStepInfo, StepId } from "@/stores/pipeline";
import { buildStep1 } from "./step1Builder";
import { buildStep2 } from "./step2Builder";
import type { PipelineStepListParams } from "./stepListTypes";

export function buildEarlySteps(
  p: PipelineStepListParams,
  id: StepId,
): [PipelineStepInfo, PipelineStepInfo] {
  const s1 = buildStep1({
    isActive: id === 1,
    hasDataset: p.hasDataset,
    isDatasetDirty: p.isDatasetDirty,
    selectedDataset: p.selectedDataset,
    df: p.df,
  });
  const s2 = buildStep2({
    isActive: id === 2,
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
    isExploreDirty: p.isExploreDirty,
    isDatasetDirty: p.isDatasetDirty,
    xTrain: p.xTrain,
    xTest: p.xTest,
    targetColumn: p.targetColumn,
    selectedFeatures: p.selectedFeatures,
  });
  return [s1, s2];
}
