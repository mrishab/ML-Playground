import { Check, Circle, AlertTriangle } from "lucide-react";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";

export function PipelineProgress() {
  const { steps } = usePipelineSteps();

  return (
    <div className="flex items-center gap-1.5 px-3 py-2.5">
      {steps.map((step, i) => {
        const isCompleted = step.status === "completed";
        const isStale = step.status === "stale";
        const isActive = step.status === "active";

        return (
          <div key={step.id} className="flex items-center gap-1">
            {isCompleted && !isStale ? (
              <Check className="h-3 w-3 text-emerald-500 shrink-0" />
            ) : isStale ? (
              <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0" />
            ) : isActive ? (
              <Circle className="h-3 w-3 fill-primary text-primary shrink-0" />
            ) : (
              <Circle className="h-3 w-3 text-muted-foreground/40 shrink-0" />
            )}
            <span
              className={`text-[11px] transition-colors duration-200 ${
                isActive
                  ? "font-semibold text-primary"
                  : isCompleted && !isStale
                    ? "font-medium text-foreground"
                    : isStale
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-muted-foreground/50"
              }`}
            >
              {step.shortTitle}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`h-px w-2.5 transition-colors duration-200 ${
                  isCompleted ? "bg-primary/50" : "bg-muted-foreground/20"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
