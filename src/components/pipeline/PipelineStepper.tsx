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
      className="w-full border-b bg-muted/20 px-4 py-2.5 backdrop-blur-sm transition-colors duration-200"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-1 sm:gap-2">
        {steps.map((step, index) => {
          const Icon = STEP_ICONS[index] || Database;
          const isActive = step.id === currentStepId;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-initial"
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
