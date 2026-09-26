import { useNavigate } from "react-router-dom";
import {
  Lock,
  ArrowRight,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type PipelineStepInfo } from "@/stores/pipeline";

type PrerequisiteGateProps = {
  step: PipelineStepInfo;
};

export function PrerequisiteGate({ step }: PrerequisiteGateProps) {
  const navigate = useNavigate();

  const unsatisfiedReq = step.requirements.find((req) => !req.satisfied);

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-xl border-dashed">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mb-2">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">
            {step.title} is Locked
          </CardTitle>
          <CardDescription className="text-sm">
            This stage requires outputs from previous steps before it can run.
            Review the checklist below to unlock this view.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2 rounded-lg border bg-muted/30 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-1">
              Required Artifacts
            </div>

            {step.requirements.map((req) => (
              <div
                key={req.id}
                className="flex items-start gap-3 rounded-md p-2 text-xs"
              >
                {req.satisfied ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={
                        req.satisfied
                          ? "font-medium text-foreground"
                          : "font-semibold text-rose-600 dark:text-rose-400"
                      }
                    >
                      {req.label}
                    </span>
                    <Badge
                      variant={req.satisfied ? "secondary" : "outline"}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {req.satisfied ? "Satisfied" : "Missing"}
                    </Badge>
                  </div>
                  {!req.satisfied && (
                    <p className="mt-1 text-muted-foreground">
                      {req.missingMessage}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Go Back
            </Button>

            {unsatisfiedReq && (
              <Button
                size="sm"
                onClick={() => navigate(unsatisfiedReq.actionRoute)}
                className="w-full sm:w-auto group"
              >
                {unsatisfiedReq.actionLabel}
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
