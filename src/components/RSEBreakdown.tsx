import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

type RSEBreakdownProps = {
  metrics: RegressionMetrics;
};

export function RSEBreakdown({ metrics }: RSEBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Residual Standard Error (RSE) Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formula */}
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 font-mono text-sm">RSE = √(RSS / (n - 2))</p>
          <p className="text-sm text-muted-foreground">
            An estimate of the standard deviation of the residuals. The
            denominator uses (n - 2) to account for the two estimated parameters
            (intercept and slope).
          </p>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">
              Residual Sum of Squares (RSS) = Σ(yᵢ - ŷᵢ)²
            </span>
            <Badge variant="secondary">{formatNumber(metrics.rss)}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Degrees of Freedom (n - 2)</span>
            <Badge variant="secondary">{metrics.n - 2}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">
              RSS / (n - 2) = {formatNumber(metrics.rss)} / {metrics.n - 2}
            </span>
            <Badge variant="secondary">
              {formatNumber(metrics.rss / (metrics.n - 2))}
            </Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">
              RSE = √({formatNumber(metrics.rss / (metrics.n - 2))})
            </span>
            <Badge className="bg-orange-500">{formatNumber(metrics.rse)}</Badge>
          </div>
        </div>

        {/* Interpretation */}
        <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-4">
          <p className="text-sm font-medium">Interpretation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The model&apos;s predictions deviate from the actual values by
            approximately <strong>{formatNumber(metrics.rse)}</strong> units on
            average. This represents the "lack of fit" in the same units as the
            response variable.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
