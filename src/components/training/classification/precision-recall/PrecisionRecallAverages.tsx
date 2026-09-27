import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

export function PrecisionRecallAverages({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <div className="space-y-2 sm:space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 sm:p-3">
        <span className="text-xs sm:text-sm">Macro Avg Precision</span>
        <Badge variant="secondary" className="shrink-0">
          {formatNumber(metrics.macroPrecision)}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 sm:p-3">
        <span className="text-xs sm:text-sm">Macro Avg Recall</span>
        <Badge variant="secondary" className="shrink-0">
          {formatNumber(metrics.macroRecall)}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 sm:p-3">
        <span className="text-xs sm:text-sm">Weighted Avg Precision</span>
        <Badge className="bg-purple-500 shrink-0">
          {formatNumber(metrics.weightedPrecision)}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 sm:p-3">
        <span className="text-xs sm:text-sm">Weighted Avg Recall</span>
        <Badge className="bg-purple-500 shrink-0">
          {formatNumber(metrics.weightedRecall)}
        </Badge>
      </div>
    </div>
  );
}
