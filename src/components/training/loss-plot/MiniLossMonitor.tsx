import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LossTelemetry } from "@/types/loss";

export function MiniLossMonitor({
  telemetry,
}: {
  telemetry: LossTelemetry | null;
}) {
  const currentLoss =
    telemetry?.history[telemetry.history.length - 1]?.loss ?? 0;
  const step = telemetry?.currentStep ?? 0;
  const total = telemetry?.totalSteps ?? 30;
  const pct = Math.min(100, Math.round((step / total) * 100));

  return (
    <Card className="border-primary/40 bg-primary/5 transition-[border-color,background-color] duration-200 ease-out">
      <CardContent className="flex flex-col justify-center space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium">Training In Progress...</span>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            Step {step} / {total} ({pct}%)
          </Badge>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full w-full origin-left bg-primary transition-transform duration-200 ease-out"
            style={{
              transform: `scaleX(${Math.max(0, Math.min(1, pct / 100))})`,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{telemetry?.metricName ?? "Objective Loss"}</span>
          <span className="font-mono text-sm font-semibold text-foreground">
            {currentLoss > 0 ? currentLoss.toFixed(4) : "Initializing..."}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
