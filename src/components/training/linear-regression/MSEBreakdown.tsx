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
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">MSE = (1/n) × Σ(yᵢ - ŷᵢ)²</p>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
            <span className="text-xs sm:text-sm">
              Number of observations (n)
            </span>
            <Badge variant="secondary" className="shrink-0">
              {metrics.n}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
            <span className="text-xs sm:text-sm">
              Sum of Squared Residuals (RSS)
            </span>
            <Badge variant="secondary" className="shrink-0">
              {formatNumber(metrics.rss)}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
            <span className="text-xs sm:text-sm">
              MSE = {formatNumber(metrics.rss)} / {metrics.n}
            </span>
            <Badge className="bg-blue-500 shrink-0">
              {formatNumber(metrics.mse)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
