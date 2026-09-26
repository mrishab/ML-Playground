import { useMemo } from "react";
import type { PipelineStepInfo, StepId } from "@/stores/pipeline";

interface PipelineNavParams {
  steps: PipelineStepInfo[];
  currentStepId: StepId;
  hasDataset: boolean;
  isSplitReady: boolean;
  hasTrainedModel: boolean;
}

export function usePipelineNav({
  steps,
  currentStepId,
  hasDataset,
  isSplitReady,
  hasTrainedModel,
}: PipelineNavParams) {
  const prevStepRoute =
    currentStepId === 1 ? null : (steps[currentStepId - 2]?.route ?? null);
  const prevStepLabel =
    currentStepId === 1 ? null : (steps[currentStepId - 2]?.shortTitle ?? null);

  const nextStepRoute =
    currentStepId === 5 ? null : (steps[currentStepId]?.route ?? null);
  const nextStepLabel =
    currentStepId === 5 ? null : (steps[currentStepId]?.shortTitle ?? null);

  const canProceedToNext = useMemo(() => {
    if (currentStepId === 1) return hasDataset;
    if (currentStepId === 2) return isSplitReady;
    if (currentStepId === 3 || currentStepId === 4) return hasTrainedModel;
    return false;
  }, [currentStepId, hasDataset, isSplitReady, hasTrainedModel]);

  return {
    prevStepRoute,
    prevStepLabel,
    nextStepRoute,
    nextStepLabel,
    canProceedToNext,
  };
}
