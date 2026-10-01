import type { PipelineStepInfo, StepId } from "@/stores/pipeline";
import { buildStep3 } from "./step3Builder";
import { buildStep4 } from "./step4Builder";
import { buildStep5 } from "./step5Builder";
import type { PipelineStepListParams } from "./stepListTypes";

export function buildLateSteps(
  p: PipelineStepListParams,
  id: StepId,
): [PipelineStepInfo, PipelineStepInfo, PipelineStepInfo] {
  const s3 = buildStep3({
    isActive: id === 3,
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
    isExploreDirty: p.isExploreDirty,
    isDatasetDirty: p.isDatasetDirty,
  });
  const s4 = buildStep4({
    isActive: id === 4,
    hasDataset: p.hasDataset,
    isSplitReady: p.isSplitReady,
    hasTrainedModel: p.hasTrainedModel,
    isDownstreamStale: p.isDownstreamStale,
    defaultTrainRoute: p.defaultTrainRoute,
    modelArtifactDesc: p.modelDesc,
  });
  const s5 = buildStep5({
    isActive: id === 5,
    hasTrainedModel: p.hasTrainedModel,
    hasSavedModels: Boolean(p.hasSavedModels),
    savedModelsCount: p.savedModelsCount ?? 0,
    defaultTrainRoute: p.defaultTrainRoute,
  });
  return [s3, s4, s5];
}
