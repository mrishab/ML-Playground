import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePipelineStore } from "@/stores/pipeline";
import { RequirementChecklist } from "./prerequisites/RequirementChecklist";
import { PrerequisitesModalHeader } from "./prerequisites/PrerequisitesModalHeader";

export function PrerequisitesModal() {
  const navigate = useNavigate();
  const { lockedModalStep, isLockedModalOpen, closeLockedModal } =
    usePipelineStore();
  if (!lockedModalStep) return null;

  const firstUnsatisfiedReq = lockedModalStep.requirements.find(
    (r) => !r.satisfied,
  );
  const handleGoTo = () => {
    if (firstUnsatisfiedReq) {
      closeLockedModal();
      navigate(firstUnsatisfiedReq.actionRoute);
    }
  };

  return (
    <Dialog open={isLockedModalOpen} onOpenChange={closeLockedModal}>
      <DialogContent className="sm:max-w-md">
        <PrerequisitesModalHeader title={lockedModalStep.title} />
        <div className="space-y-2 py-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Prerequisites Checklist
          </div>
          <RequirementChecklist requirements={lockedModalStep.requirements} />
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="ghost" onClick={closeLockedModal} size="sm">
            Dismiss
          </Button>
          {firstUnsatisfiedReq && (
            <Button onClick={handleGoTo} size="sm" className="group">
              {firstUnsatisfiedReq.actionLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
