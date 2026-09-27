import type { LossTelemetry } from "@/types/loss";

const TILE_CLASSES =
  "rounded-md border bg-card p-2 text-center transition-[border-color,background-color,transform] duration-150 ease-out hover:border-primary/40 hover:-translate-y-0.5";

export function LossPlotStats({ telemetry }: { telemetry: LossTelemetry }) {
  const firstLoss = telemetry.history[0]?.loss ?? 1;
  const lastPoint = telemetry.history[telemetry.history.length - 1];
  const currentLoss = lastPoint?.loss ?? 0;
  const reduction =
    firstLoss !== 0 ? ((firstLoss - currentLoss) / firstLoss) * 100 : 0;

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 pt-1">
      <div className={TILE_CLASSES}>
        <div className="text-[11px] text-muted-foreground">
          Initial {telemetry.shortMetric}
        </div>
        <div className="text-sm font-semibold font-mono">
          {firstLoss.toFixed(4)}
        </div>
      </div>
      <div className={TILE_CLASSES}>
        <div className="text-[11px] text-muted-foreground">
          Current {telemetry.shortMetric}
        </div>
        <div className="text-sm font-semibold font-mono text-primary">
          {currentLoss.toFixed(4)}
        </div>
      </div>
      <div className={TILE_CLASSES}>
        <div className="text-[11px] text-muted-foreground">Loss Reduction</div>
        <div className="text-sm font-semibold font-mono text-emerald-600 dark:text-emerald-400">
          {reduction >= 0
            ? `-${reduction.toFixed(1)}%`
            : `+${Math.abs(reduction).toFixed(1)}%`}
        </div>
      </div>
      <div className={TILE_CLASSES}>
        <div className="text-[11px] text-muted-foreground">
          {telemetry.secondaryName ?? "Total Steps"}
        </div>
        <div className="text-sm font-semibold font-mono text-cyan-600 dark:text-cyan-400">
          {lastPoint?.secondary !== undefined
            ? `${lastPoint.secondary.toFixed(2)}${telemetry.secondaryUnit ?? ""}`
            : `${telemetry.currentStep} / ${telemetry.totalSteps}`}
        </div>
      </div>
    </div>
  );
}
