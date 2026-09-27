import { Activity, CheckCircle2, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LossTelemetry } from "@/types/loss";

export function LossPlotHeader({ telemetry }: { telemetry: LossTelemetry }) {
  const { currentStep, totalSteps, isComplete, metricName } = telemetry;
  const currentLoss =
    telemetry.history[telemetry.history.length - 1]?.loss ?? 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold tracking-tight">{metricName}</h3>
      </div>
      <div className="flex items-center gap-2">
        <Badge
          variant={isComplete ? "outline" : "default"}
          className="gap-1.5 text-xs"
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              <span>Converged ({totalSteps} steps)</span>
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span>
                Step {currentStep} / {totalSteps}
              </span>
            </>
          )}
        </Badge>
        <Badge variant="secondary" className="gap-1 font-mono text-xs">
          <TrendingDown className="h-3 w-3" />
          {telemetry.shortMetric}: {currentLoss.toFixed(4)}
        </Badge>
      </div>
    </div>
  );
}
