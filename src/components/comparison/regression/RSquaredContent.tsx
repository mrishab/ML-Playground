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
          className="h-full w-full origin-left bg-blue-500 transition-transform duration-300 ease-out"
          style={{
            transform: `scaleX(${Math.max(0, Math.min(1, metrics.rSquared))})`,
          }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {pct}% of variance explained
      </p>
    </div>
  );
}
