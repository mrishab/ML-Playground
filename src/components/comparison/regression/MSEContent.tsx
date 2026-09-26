import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

export function MSEContent({ metrics }: { metrics: RegressionMetrics }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold">{formatNumber(metrics.mse)}</p>
      <p className="text-sm text-muted-foreground">Mean Squared Error</p>
    </div>
  );
}
