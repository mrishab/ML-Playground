import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

export function ROCContent({ metrics }: { metrics: ClassificationMetrics }) {
  const { rocCurves } = metrics;
  const macroAUC =
    rocCurves.length > 0
      ? rocCurves.reduce((sum, c) => sum + c.auc, 0) / rocCurves.length
      : 0;
  const macroAUCPct = (macroAUC * 100).toFixed(1);

  const minAUC =
    rocCurves.length > 0 ? Math.min(...rocCurves.map((c) => c.auc)) : 0;
  const maxAUC =
    rocCurves.length > 0 ? Math.max(...rocCurves.map((c) => c.auc)) : 0;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-3xl font-bold">{macroAUCPct}%</p>
        <p className="text-sm text-muted-foreground">Macro-Avg AUC</p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full w-full origin-left bg-violet-500 transition-transform duration-300 ease-out"
          style={{
            transform: `scaleX(${Math.max(0, Math.min(1, macroAUC))})`,
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="flex items-center justify-between gap-1.5 rounded border p-2 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/30">
          <span className="text-xs">Min AUC</span>
          <Badge variant="outline" className="text-xs shrink-0">
            {formatNumber(minAUC)}
          </Badge>
        </div>
        <div className="flex items-center justify-between gap-1.5 rounded border p-2 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/30">
          <span className="text-xs">Max AUC</span>
          <Badge variant="outline" className="text-xs shrink-0">
            {formatNumber(maxAUC)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
