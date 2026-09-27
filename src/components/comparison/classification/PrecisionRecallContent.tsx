import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

export function PrecisionRecallContent({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1 text-center">
          <p className="text-2xl font-bold">
            {formatNumber(metrics.weightedPrecision)}
          </p>
          <p className="text-xs text-muted-foreground">Weighted Precision</p>
        </div>
        <div className="space-y-1 text-center">
          <p className="text-2xl font-bold">
            {formatNumber(metrics.weightedRecall)}
          </p>
          <p className="text-xs text-muted-foreground">Weighted Recall</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="flex items-center justify-between gap-1.5 rounded border p-2">
          <span className="text-xs">Macro P</span>
          <Badge variant="outline" className="text-xs shrink-0">
            {formatNumber(metrics.macroPrecision)}
          </Badge>
        </div>
        <div className="flex items-center justify-between gap-1.5 rounded border p-2">
          <span className="text-xs">Macro R</span>
          <Badge variant="outline" className="text-xs shrink-0">
            {formatNumber(metrics.macroRecall)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
