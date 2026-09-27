import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PipelineStepRequirement } from "@/stores/pipeline";

interface RequirementChecklistProps {
  requirements: PipelineStepRequirement[];
}

export function RequirementChecklist({
  requirements,
}: RequirementChecklistProps) {
  return (
    <div className="space-y-2 rounded-lg border bg-muted/30 p-3">
      {requirements.map((req) => (
        <div
          key={req.id}
          className="flex items-start gap-2.5 text-xs leading-normal p-1.5 rounded-md transition-[background-color] duration-150 ease-out hover:bg-muted/50"
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
            className="text-[10px] shrink-0"
          >
            {req.satisfied ? "Satisfied" : "Missing"}
          </Badge>
        </div>
      ))}
    </div>
  );
}
