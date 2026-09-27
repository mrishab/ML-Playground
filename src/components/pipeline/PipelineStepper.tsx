import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Database } from "lucide-react";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore, type PipelineStepInfo } from "@/stores/pipeline";
import { STEP_ICONS } from "./stepper/constants";
import { PipelineStepButton } from "./stepper/PipelineStepButton";

export function PipelineStepper() {
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

  return (
    <nav
      aria-label="ML Pipeline Progress"
      className="w-full border-b bg-muted/20 px-2 py-2 backdrop-blur-sm transition-colors duration-200 sm:px-4 sm:py-2.5"
    >
      <div className="no-scrollbar flex items-center gap-0.5 overflow-x-auto sm:gap-1 sm:justify-between mx-auto max-w-7xl">
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[index] || Database;
          const isActive = step.id === currentStepId;

          return (
            <div
              key={step.id}
              ref={isActive ? activeStepRef : undefined}
              className="flex shrink-0 items-center"
            >
              <PipelineStepButton
                step={step}
                icon={Icon}
                isActive={isActive}
                onClick={() => handleStepClick(step)}
              />
              {index < steps.length - 1 && (
                <ChevronRight className="mx-1 h-3.5 w-3.5 shrink-0 text-muted-foreground/30" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
