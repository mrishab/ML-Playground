import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

export function RSquaredContent({ metrics }: { metrics: RegressionMetrics }) {
  const pct = (metrics.rSquared * 100).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-3xl font-bold">{formatNumber(metrics.rSquared)}</p>
        <p className="text-sm text-muted-foreground">
          Coefficient of Determination
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{
            width: `${Math.max(0, Math.min(100, metrics.rSquared * 100))}%`,
          }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {pct}% of variance explained
      </p>
    </div>
  );
}
