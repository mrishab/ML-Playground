import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ActionGatePrimaryAction } from "./types";
import { PrimaryActionButton } from "./PrimaryActionButton";

interface ActionGateCTAProps {
  primaryAction?: ActionGatePrimaryAction;
  nextStepRoute?: string | null;
  nextStepLabel?: string | null;
  canProceedToNext: boolean;
  onNextClick: () => void;
}

export function ActionGateCTA({
  primaryAction,
  nextStepRoute,
  nextStepLabel,
  canProceedToNext,
  onNextClick,
}: ActionGateCTAProps) {
  if (primaryAction) {
    return <PrimaryActionButton action={primaryAction} />;
  }

  if (nextStepRoute) {
    return (
      <Button
        size="sm"
        onClick={onNextClick}
        disabled={!canProceedToNext}
        className="group"
      >
        <span className="hidden sm:inline">Next: {nextStepLabel}</span>
        <span className="sm:hidden">Next</span>
        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </Button>
    );
  }

  return (
    <Badge variant="secondary" className="px-3 py-1 text-xs">
      <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
      Pipeline Complete
    </Badge>
  );
}
