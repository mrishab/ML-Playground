import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

export function RSEContent({ metrics }: { metrics: RegressionMetrics }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold">{formatNumber(metrics.rse)}</p>
      <p className="text-sm text-muted-foreground">Residual Standard Error</p>
    </div>
  );
}
