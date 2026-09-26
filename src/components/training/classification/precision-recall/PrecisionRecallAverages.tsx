import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

export function PrecisionRecallAverages({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded border p-3">
        <span className="text-sm">Macro Avg Precision</span>
        <Badge variant="secondary">
          {formatNumber(metrics.macroPrecision)}
        </Badge>
      </div>
      <div className="flex items-center justify-between rounded border p-3">
        <span className="text-sm">Macro Avg Recall</span>
        <Badge variant="secondary">{formatNumber(metrics.macroRecall)}</Badge>
      </div>
      <div className="flex items-center justify-between rounded border p-3">
        <span className="text-sm">Weighted Avg Precision</span>
        <Badge className="bg-purple-500">
          {formatNumber(metrics.weightedPrecision)}
        </Badge>
      </div>
      <div className="flex items-center justify-between rounded border p-3">
        <span className="text-sm">Weighted Avg Recall</span>
        <Badge className="bg-purple-500">
          {formatNumber(metrics.weightedRecall)}
        </Badge>
      </div>
    </div>
  );
}
