import { cn } from "@/lib/utils";
import { StepBadgeIcon } from "./StepBadgeIcon";
import { getStepTooltip, getStepSubtitle } from "./stepLabels";
import type { PipelineStepButtonProps } from "./types";

export function PipelineStepButton({
  step,
  icon,
  isActive,
  onClick,
}: PipelineStepButtonProps) {
  const isLocked = step.status === "locked";
  const isStale = step.status === "stale";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-xs transition-[background-color,color,box-shadow,transform] duration-150 ease-out active:scale-[0.98] cursor-pointer sm:gap-2 sm:px-2.5 min-w-max",
        isActive &&
          "bg-primary/10 font-semibold text-primary ring-1 ring-primary/30",
        !isActive &&
          !isLocked &&
          "hover:bg-muted text-muted-foreground hover:text-foreground",
        isLocked &&
          "text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/40",
        isStale && !isActive && "text-amber-600 dark:text-amber-400",
      )}
      title={getStepTooltip(step)}
    >
      <StepBadgeIcon
        icon={icon}
        isActive={isActive}
        isCompleted={step.status === "completed"}
        isStale={isStale}
        isLocked={isLocked}
      />
      <div
        className={cn("min-w-0 flex-col", isActive ? "flex" : "hidden sm:flex")}
      >
        <span className="truncate leading-tight font-medium">
          {step.shortTitle}
        </span>
        <span className="hidden truncate text-[10px] text-muted-foreground/70 md:inline">
          {getStepSubtitle(step, isActive)}
        </span>
      </div>
    </button>
  );
}
