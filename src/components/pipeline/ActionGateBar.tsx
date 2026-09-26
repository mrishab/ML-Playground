import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { cn } from "@/lib/utils";

export type ActionGateProps = {
  primaryAction?: {
    label: string;
    onClick?: () => void;
    linkTo?: string;
    disabled?: boolean;
    disabledReason?: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    loading?: boolean;
  };
  customChecklist?: {
    label: string;
    satisfied: boolean;
    missingText?: string;
  }[];
};

export function ActionGateBar({
  primaryAction,
  customChecklist,
}: ActionGateProps) {
  const navigate = useNavigate();
  const {
    currentStep,
    prevStepRoute,
    prevStepLabel,
    nextStepRoute,
    nextStepLabel,
    canProceedToNext,
  } = usePipelineSteps();

  const [showChecklistDetails, setShowChecklistDetails] = useState(false);

  // Requirements checklist: either custom or from current step
  const checklist =
    customChecklist ??
    currentStep.requirements.map((r) => ({
      label: r.label,
      satisfied: r.satisfied,
      missingText: r.missingMessage,
    }));

  const satisfiedCount = checklist.filter((item) => item.satisfied).length;
  const totalCount = checklist.length;
  const allSatisfied = totalCount > 0 && satisfiedCount === totalCount;
  const missingItems = checklist.filter((item) => !item.satisfied);

  const handleNextClick = () => {
    if (primaryAction?.onClick) {
      primaryAction.onClick();
    } else if (primaryAction?.linkTo) {
      navigate(primaryAction.linkTo);
    } else if (nextStepRoute && canProceedToNext) {
      navigate(nextStepRoute);
    }
  };

  return (
    <div className="sticky bottom-0 z-40 mt-auto border-t bg-background/95 backdrop-blur-sm transition-all duration-200">
      {/* Expandable checklist drawer */}
      {showChecklistDetails && (
        <div className="border-b bg-muted/40 p-4 animate-in slide-in-from-bottom-2 duration-200">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {currentStep.title} Requirements Checklist
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs"
                onClick={() => setShowChecklistDetails(false)}
              >
                Close
              </Button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 pt-2">
              {checklist.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-start gap-2 rounded-md border p-2.5 text-xs transition-colors duration-200",
                    item.satisfied
                      ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-950 dark:text-emerald-200"
                      : "border-amber-500/20 bg-amber-500/5 text-amber-950 dark:text-amber-200",
                  )}
                >
                  {item.satisfied ? (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium leading-tight truncate">
                      {item.label}
                    </p>
                    {!item.satisfied && item.missingText && (
                      <p className="mt-0.5 text-[11px] opacity-80">
                        {item.missingText}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Left: Requirements checklist button */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChecklistDetails(!showChecklistDetails)}
            className="flex items-center gap-2 text-xs font-medium cursor-pointer"
          >
            {allSatisfied ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
            )}
            <span>
              {satisfiedCount}/{totalCount} Requirements Met
            </span>
            <ChevronUp
              className={cn(
                "h-3 w-3 text-muted-foreground transition-transform duration-200",
                showChecklistDetails && "rotate-180",
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

        {/* Center / Navigation back */}
        <div className="flex items-center gap-2">
          {prevStepRoute && (
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link to={prevStepRoute}>
                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                Back: {prevStepLabel}
              </Link>
            </Button>
          )}
        </div>

        {/* Right: Primary Action Gate CTA */}
        <div className="flex items-center gap-2">
          {primaryAction ? (
            primaryAction.linkTo ? (
              <Button
                asChild
                size="sm"
                variant={primaryAction.variant ?? "default"}
                disabled={primaryAction.disabled}
                className="group"
              >
                <Link to={primaryAction.linkTo}>
                  {primaryAction.label}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <Button
                size="sm"
                variant={primaryAction.variant ?? "default"}
                disabled={primaryAction.disabled}
                onClick={primaryAction.onClick}
                className="group"
              >
                {primaryAction.label}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            )
          ) : nextStepRoute ? (
            <Button
              size="sm"
              onClick={handleNextClick}
              disabled={!canProceedToNext}
              className="group"
            >
              Proceed to {nextStepLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          ) : (
            <Badge variant="secondary" className="px-3 py-1 text-xs">
              <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
              Pipeline Complete
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
