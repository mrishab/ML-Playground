import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PipelineStepInfo } from "@/stores/pipeline";
import { RequirementChecklist } from "./prerequisites/RequirementChecklist";
import { PrerequisiteGateHeader } from "./prerequisites/PrerequisiteGateHeader";

export function PrerequisiteGate({ step }: { step: PipelineStepInfo }) {
  const navigate = useNavigate();
  const unsatisfiedReq = step.requirements.find((req) => !req.satisfied);

  return (
    <div className="flex flex-1 items-center justify-center p-3 sm:p-6">
      <Card className="w-full max-w-xl border-dashed">
        <PrerequisiteGateHeader title={step.title} />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-1">
              Required Artifacts
            </div>
            <RequirementChecklist requirements={step.requirements} />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" /> Go Back
            </Button>
            {unsatisfiedReq && (
              <Button
                size="sm"
                onClick={() => navigate(unsatisfiedReq.actionRoute)}
                className="w-full sm:w-auto group"
              >
                {unsatisfiedReq.actionLabel}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
