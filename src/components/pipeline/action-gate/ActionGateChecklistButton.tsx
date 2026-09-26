import { CheckCircle2, AlertCircle, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActionGateChecklistItem } from "./types";

interface ActionGateChecklistButtonProps {
  satisfiedCount: number;
  totalCount: number;
  allSatisfied: boolean;
  missingItems: ActionGateChecklistItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export function ActionGateChecklistButton({
  satisfiedCount,
  totalCount,
  allSatisfied,
  missingItems,
  isOpen,
  onToggle,
}: ActionGateChecklistButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="flex items-center gap-2 text-xs font-medium cursor-pointer"
      >
        {allSatisfied ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
        )}
        <span>
          {satisfiedCount}/{totalCount} Requirements
        </span>
        <ChevronUp
          className={cn(
            "h-3 w-3 text-muted-foreground transition-transform duration-200",
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
