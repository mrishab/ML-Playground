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
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">RSE = √(RSS / (n - 2))</p>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
            <span className="text-xs sm:text-sm">
              Residual Sum of Squares (RSS)
            </span>
            <Badge variant="secondary" className="shrink-0">
              {formatNumber(metrics.rss)}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
            <span className="text-xs sm:text-sm">
              Degrees of Freedom (n - 2)
            </span>
            <Badge variant="secondary" className="shrink-0">
              {metrics.n - 2}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
            <span className="text-xs sm:text-sm">
              RSS / (n - 2) = {formatNumber(metrics.rss)} / {metrics.n - 2}
            </span>
            <Badge variant="secondary" className="shrink-0">
              {formatNumber(metrics.rss / (metrics.n - 2))}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded border p-2.5 transition-[background-color,border-color] duration-150 ease-out hover:bg-muted/40">
            <span className="text-xs sm:text-sm">
              RSE = √({formatNumber(metrics.rss / (metrics.n - 2))})
            </span>
            <Badge className="bg-orange-500 shrink-0">
              {formatNumber(metrics.rse)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
