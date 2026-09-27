import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";
import { RSEStepRow } from "./RSEStepRow";

type RSEBreakdownProps = {
  metrics: RegressionMetrics;
};

export function RSEBreakdown({ metrics }: RSEBreakdownProps) {
  const dof = metrics.n - 2;
  const rssOverDof = metrics.rss / dof;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Residual Standard Error (RSE) Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">RSE = √(RSS / (n - 2))</p>
        </div>

        <div className="space-y-2">
          <RSEStepRow
            label="Residual Sum of Squares (RSS)"
            value={formatNumber(metrics.rss)}
          />
          <RSEStepRow label="Degrees of Freedom (n - 2)" value={dof} />
          <RSEStepRow
            label={`RSS / (n - 2) = ${formatNumber(metrics.rss)} / ${dof}`}
            value={formatNumber(rssOverDof)}
          />
          <RSEStepRow
            label={`RSE = √(${formatNumber(rssOverDof)})`}
            value={formatNumber(metrics.rse)}
            isHighlight
          />
        </div>
      </CardContent>
    </Card>
  );
}
