import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

export function RSquaredSteps({ metrics }: { metrics: RegressionMetrics }) {
  const ratio = metrics.rss / metrics.tss;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-colors duration-200">
        <span className="text-xs sm:text-sm">Mean of Y (ȳ)</span>
        <Badge variant="secondary" className="shrink-0">
          {formatNumber(metrics.yMean)}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-colors duration-200">
        <span className="text-xs sm:text-sm">
          RSS / TSS = {formatNumber(metrics.rss)} / {formatNumber(metrics.tss)}
        </span>
        <Badge variant="secondary" className="shrink-0">
          {formatNumber(ratio)}
        </Badge>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-colors duration-200">
        <span className="text-xs sm:text-sm">
          R² = 1 - {formatNumber(ratio)}
        </span>
        <Badge className="bg-emerald-500 shrink-0">
          {formatNumber(metrics.rSquared)}
        </Badge>
      </div>
    </div>
  );
}
