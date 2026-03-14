import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

type MSEBreakdownProps = {
  metrics: RegressionMetrics;
};

export function MSEBreakdown({ metrics }: MSEBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Mean Squared Error (MSE) Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formula */}
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 font-mono text-sm">MSE = (1/n) × Σ(yᵢ - ŷᵢ)²</p>
          <p className="text-sm text-muted-foreground">
            The average of the squared differences between predicted and actual
            values.
          </p>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Number of observations (n)</span>
            <Badge variant="secondary">{metrics.n}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Sum of Squared Residuals (RSS)</span>
            <Badge variant="secondary">{formatNumber(metrics.rss)}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">
              MSE = {formatNumber(metrics.rss)} / {metrics.n}
            </span>
            <Badge className="bg-blue-500">{formatNumber(metrics.mse)}</Badge>
          </div>
        </div>

        {/* Interpretation */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-sm font-medium">Interpretation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            On average, the squared difference between predicted and actual
            values is <strong>{formatNumber(metrics.mse)}</strong>. Lower values
            indicate better predictive accuracy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
