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

  const handleNextClick = () => {
    if (primaryAction?.onClick) primaryAction.onClick();
    else if (primaryAction?.linkTo) navigate(primaryAction.linkTo);
    else if (pipeline.nextStepRoute && pipeline.canProceedToNext) {
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
    showChecklistDetails,
    setShowChecklistDetails,
    handleNextClick,
  };
}
