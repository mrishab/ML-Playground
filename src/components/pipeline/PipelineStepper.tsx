import { useNavigate } from "react-router-dom";
import {
  Check,
  Lock,
  AlertTriangle,
  ChevronRight,
  Database,
  Search,
  Brain,
  Scale,
  Award,
} from "lucide-react";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore, type PipelineStepInfo } from "@/stores/pipeline";
import { cn } from "@/lib/utils";

const STEP_ICONS = [Database, Search, Brain, Scale, Award];

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
          const isCompleted = step.status === "completed";
          const isStale = step.status === "stale";
          const isLocked = step.status === "locked";

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center last:flex-initial"
            >
              <button
                type="button"
                onClick={() => handleStepClick(step)}
                className={cn(
                  "group flex flex-1 items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-all duration-200 cursor-pointer",
                  isActive &&
                    "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30",
                  !isActive &&
                    !isLocked &&
                    "hover:bg-muted text-muted-foreground hover:text-foreground",
                  isLocked &&
                    "text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/40",
                  isStale && !isActive && "text-amber-600 dark:text-amber-400",
                )}
                title={
                  isLocked
                    ? `${step.title} (Locked - Click to see requirements)`
                    : isStale
                      ? `${step.title} (Stale - Upstream modified)`
                      : step.title
                }
              >
                {/* Step badge icon */}
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-all duration-200",
                    isActive && "bg-primary text-primary-foreground shadow-sm",
                    isCompleted &&
                      !isStale &&
                      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
                    isStale &&
                      "bg-amber-500/20 text-amber-600 dark:text-amber-400 animate-pulse",
                    isLocked && "bg-muted text-muted-foreground/50",
                  )}
                >
                  {isCompleted && !isStale ? (
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  ) : isStale ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : isLocked ? (
                    <Lock className="h-3 w-3" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Step labels */}
                <div className="hidden min-w-0 flex-col md:flex">
                  <span className="truncate leading-tight font-medium">
                    {step.shortTitle}
                  </span>
                  <span className="truncate text-[10px] text-muted-foreground/70">
                    {isLocked
                      ? "Locked"
                      : isStale
                        ? "Stale"
                        : isActive
                          ? "Current"
                          : step.artifactDescription || "Ready"}
                  </span>
                </div>
              </button>

              {/* Step divider */}
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
