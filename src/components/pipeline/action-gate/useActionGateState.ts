import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import type { ActionGateProps } from "./types";

export function useActionGateState({
  primaryAction,
  customChecklist,
}: ActionGateProps) {
  const navigate = useNavigate();
  const pipeline = usePipelineSteps();
  const [showChecklistDetails, setShowChecklistDetails] = useState(false);

  const checklist =
    customChecklist ??
    pipeline.currentStep.requirements.map((r) => ({
      label: r.label,
      satisfied: r.satisfied,
      missingText: r.missingMessage,
    }));

  const satisfiedCount = checklist.filter((item) => item.satisfied).length;
  const totalCount = checklist.length;
  const allSatisfied = totalCount > 0 && satisfiedCount === totalCount;
  const missingItems = checklist.filter((item) => !item.satisfied);

  const totalSteps = pipeline.steps.length;
  const d1 = pipeline.hasDataset;
  const d2 = d1 && pipeline.isSplitReady;
  const d3 = d2 && pipeline.hasTrainedModel;
  const cId = pipeline.currentStepId;
  const completedSteps = [d1, d2, d3, d3 && cId >= 4, d3 && cId === 5].filter(
    Boolean,
  ).length;

  const handleNextClick = () => {
    if (primaryAction?.onClick) return primaryAction.onClick();
    if (primaryAction?.linkTo) return navigate(primaryAction.linkTo);
    if (pipeline.nextStepRoute && pipeline.canProceedToNext) {
      navigate(pipeline.nextStepRoute);
    }
  };

  return {
    ...pipeline,
    checklist,
    satisfiedCount,
    totalCount,
    allSatisfied,
    missingItems,
    totalSteps,
    completedSteps,
    showChecklistDetails,
    setShowChecklistDetails,
    handleNextClick,
  };
}
