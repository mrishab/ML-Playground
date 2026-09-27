import { CheckCircle2, AlertCircle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActionGateChecklistButtonProps } from "./types";

export function ActionGateChecklistButton(p: ActionGateChecklistButtonProps) {
  const {
    satisfiedCount,
    totalCount,
    allSatisfied,
    missingItems,
    isOpen,
    onToggle,
    completedSteps,
    totalSteps,
    currentStepId,
  } = p;
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium cursor-pointer px-2 sm:px-3"
        title={`Step ${currentStepId} of ${totalSteps} (${satisfiedCount}/${totalCount} reqs completed)`}
      >
        {allSatisfied ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
        ) : (
          <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        )}
        <span className="flex items-center gap-1">
          <span>
            {completedSteps}/{totalSteps} Steps
          </span>
          <span className="hidden text-[11px] font-normal text-muted-foreground sm:inline">
            ({satisfiedCount}/{totalCount} reqs)
          </span>
        </span>
        <ChevronUp
          className={cn(
            "h-3 w-3 text-muted-foreground transition-transform duration-200 ease-out shrink-0",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {!allSatisfied && missingItems.length > 0 && (
        <span className="hidden lg:inline text-xs text-muted-foreground">
          Needs:{" "}
          <span className="font-medium text-foreground">
            {missingItems[0].label}
          </span>
        </span>
      )}
    </div>
  );
}
