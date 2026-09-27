import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore, type PipelineStepInfo } from "@/stores/pipeline";

export function usePipelineStepper() {
  const navigate = useNavigate();
  const { steps, currentStepId } = usePipelineSteps();
  const { openLockedModal } = usePipelineStore();
  const activeStepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeStepRef.current) {
      activeStepRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentStepId]);

  const handleStepClick = (step: PipelineStepInfo) => {
    if (step.status === "locked") {
      openLockedModal(step);
      return;
    }
    navigate(step.route);
  };

  return { steps, currentStepId, activeStepRef, handleStepClick };
}
