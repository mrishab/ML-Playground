import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

export function RSquaredSteps({ metrics }: { metrics: RegressionMetrics }) {
  const ratio = metrics.rss / metrics.tss;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
        <span className="text-sm">Mean of Y (ȳ)</span>
        <Badge variant="secondary">{formatNumber(metrics.yMean)}</Badge>
      </div>
      <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
        <span className="text-sm">
          RSS / TSS = {formatNumber(metrics.rss)} / {formatNumber(metrics.tss)}
        </span>
        <Badge variant="secondary">{formatNumber(ratio)}</Badge>
      </div>
      <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
        <span className="text-sm">R² = 1 - {formatNumber(ratio)}</span>
        <Badge className="bg-green-500">{formatNumber(metrics.rSquared)}</Badge>
      </div>
    </div>
  );
}
