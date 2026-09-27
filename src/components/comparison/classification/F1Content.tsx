import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

export function F1Content({ metrics }: { metrics: ClassificationMetrics }) {
  const weightedPct = (metrics.weightedF1 * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-3xl font-bold">{weightedPct}%</p>
        <p className="text-sm text-muted-foreground">Weighted F1-Score</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-emerald-500 transition-[width] duration-300 ease-out"
          style={{
            width: `${Math.max(0, Math.min(100, metrics.weightedF1 * 100))}%`,
          }}
        />
      </div>
      <div className="flex items-center justify-between rounded border p-2 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/30">
        <span className="text-xs">Macro F1</span>
        <Badge variant="secondary" className="text-xs">
          {formatNumber(metrics.macroF1)}
        </Badge>
      </div>
    </div>
  );
}
