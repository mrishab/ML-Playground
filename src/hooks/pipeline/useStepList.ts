import { useMemo } from "react";
import type { PipelineStepInfo, StepId } from "@/stores/pipeline";
import { buildEarlySteps } from "./buildEarlySteps";
import { buildLateSteps } from "./buildLateSteps";
import type { PipelineStepListParams } from "./stepListTypes";

export function useStepList(
  p: PipelineStepListParams,
  currentStepId: StepId,
): PipelineStepInfo[] {
  return useMemo(() => {
    const [s1, s2] = buildEarlySteps(p, currentStepId);
    const [s3, s4, s5] = buildLateSteps(p, currentStepId);
    return [s1, s2, s3, s4, s5];
  }, [p, currentStepId]);
}
