import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RegressionMetrics } from "@/types/regression";
import { RSquaredSumSquares } from "./rsquared/RSquaredSumSquares";
import { RSquaredSteps } from "./rsquared/RSquaredSteps";
import { RSquaredFitProgress } from "./rsquared/RSquaredFitProgress";

export function RSquaredBreakdown({ metrics }: { metrics: RegressionMetrics }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">R² (R-Squared) Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">R² = 1 - (RSS / TSS)</p>
        </div>
        <RSquaredSumSquares rss={metrics.rss} tss={metrics.tss} />
        <RSquaredSteps metrics={metrics} />
        <RSquaredFitProgress rSquared={metrics.rSquared} />
      </CardContent>
    </Card>
  );
}
