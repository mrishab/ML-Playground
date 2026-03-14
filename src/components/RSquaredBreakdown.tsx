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
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 font-mono text-sm">R² = 1 - (RSS / TSS)</p>
          <p className="text-sm text-muted-foreground">
            The proportion of variance in the dependent variable explained by
            the independent variables.
          </p>
        </div>

        {/* RSS and TSS Explanation */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="font-medium">RSS (Residual Sum of Squares)</p>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              Σ(yᵢ - ŷᵢ)²
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Variation <em>not</em> explained by the model.
            </p>
            <p className="mt-2 text-lg font-semibold">
              {formatNumber(metrics.rss)}
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="font-medium">TSS (Total Sum of Squares)</p>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              Σ(yᵢ - ȳ)²
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Total variation in the actual data (where ȳ ={" "}
              {formatNumber(metrics.yMean)}).
            </p>
            <p className="mt-2 text-lg font-semibold">
              {formatNumber(metrics.tss)}
            </p>
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Mean of Y (ȳ)</span>
            <Badge variant="secondary">{formatNumber(metrics.yMean)}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">
              RSS / TSS = {formatNumber(metrics.rss)} /{" "}
              {formatNumber(metrics.tss)}
            </span>
            <Badge variant="secondary">
              {formatNumber(metrics.rss / metrics.tss)}
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">
              R² = 1 - {formatNumber(metrics.rss / metrics.tss)}
            </span>
            <Badge className="bg-green-500">
              {formatNumber(metrics.rSquared)}
            </Badge>
          </div>
        </div>

        {/* Interpretation */}
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
          <p className="text-sm font-medium">Interpretation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The model explains <strong>{rSquaredPercent}%</strong> of the
            variance in the target variable. An R² of 1 indicates perfect fit,
            while 0 indicates the model explains none of the variability.
          </p>
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
