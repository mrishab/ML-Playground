import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePipelineStore } from "@/stores/pipeline";

export function PrerequisitesModal() {
  const navigate = useNavigate();
  const { lockedModalStep, isLockedModalOpen, closeLockedModal } =
    usePipelineStore();

  if (!lockedModalStep) return null;

  // Find the earliest unsatisfied requirement to guide the user
  const firstUnsatisfiedReq = lockedModalStep.requirements.find(
    (req) => !req.satisfied,
  );

  const handleGoToRequirement = () => {
    if (firstUnsatisfiedReq) {
      closeLockedModal();
      navigate(firstUnsatisfiedReq.actionRoute);
    }
  };

  return (
    <Dialog open={isLockedModalOpen} onOpenChange={closeLockedModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
              <Lock className="h-4 w-4" />
            </div>
            <DialogTitle className="text-lg">
              {lockedModalStep.title} is Locked
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm">
            This step cannot be accessed yet because previous pipeline stages
            must produce the required artifacts first.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Prerequisites Checklist
          </div>

          <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
            {lockedModalStep.requirements.map((req) => (
              <div
                key={req.id}
                className="flex items-start gap-2.5 text-xs leading-normal"
              >
                {req.satisfied ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                )}
                <div className="flex-1">
                  <span
                    className={
                      req.satisfied
                        ? "font-medium text-foreground"
                        : "font-semibold text-rose-600 dark:text-rose-400"
                    }
                  >
                    {req.label}
                  </span>
                  {!req.satisfied && (
                    <p className="mt-0.5 text-muted-foreground">
                      {req.missingMessage}
                    </p>
                  )}
                </div>
                <Badge
                  variant={req.satisfied ? "secondary" : "outline"}
                  className="text-[10px]"
                >
                  {req.satisfied ? "Ready" : "Missing"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="ghost" onClick={closeLockedModal} size="sm">
            Dismiss
          </Button>
          {firstUnsatisfiedReq && (
            <Button onClick={handleGoToRequirement} size="sm" className="group">
              {firstUnsatisfiedReq.actionLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
