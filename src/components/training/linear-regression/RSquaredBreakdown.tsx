import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

type RSquaredBreakdownProps = {
  metrics: RegressionMetrics;
};

export function RSquaredBreakdown({ metrics }: RSquaredBreakdownProps) {
  const rSquaredPercent = (metrics.rSquared * 100).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">R² (R-Squared) Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formula */}
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">R² = 1 - (RSS / TSS)</p>
        </div>

        {/* RSS and TSS */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-3.5 transition-colors duration-200">
            <p className="text-sm font-medium">RSS (Residual Sum of Squares)</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Σ(yᵢ - ŷᵢ)²
            </p>
            <p className="mt-2 text-lg font-semibold">
              {formatNumber(metrics.rss)}
            </p>
          </div>
          <div className="rounded-lg border p-3.5 transition-colors duration-200">
            <p className="text-sm font-medium">TSS (Total Sum of Squares)</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Σ(yᵢ - ȳ)²
            </p>
            <p className="mt-2 text-lg font-semibold">
              {formatNumber(metrics.tss)}
            </p>
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
            <span className="text-sm">Mean of Y (ȳ)</span>
            <Badge variant="secondary">{formatNumber(metrics.yMean)}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
            <span className="text-sm">
              RSS / TSS = {formatNumber(metrics.rss)} /{" "}
              {formatNumber(metrics.tss)}
            </span>
            <Badge variant="secondary">
              {formatNumber(metrics.rss / metrics.tss)}
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
            <span className="text-sm">
              R² = 1 - {formatNumber(metrics.rss / metrics.tss)}
            </span>
            <Badge className="bg-green-500">
              {formatNumber(metrics.rSquared)}
            </Badge>
          </div>
        </div>

        {/* Visual Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Goodness of Fit</span>
            <span className="font-medium">{rSquaredPercent}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-green-500 transition-all"
              style={{
                width: `${Math.max(0, Math.min(100, metrics.rSquared * 100))}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
