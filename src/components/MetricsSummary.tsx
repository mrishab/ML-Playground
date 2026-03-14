import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/number";
import { cn } from "@/lib/utils";
import type { RegressionMetrics } from "@/types/regression";

type MetricsSummaryProps = {
  metrics: RegressionMetrics;
  direction?: "horizontal" | "vertical";
};

export function MetricsSummary({
  metrics,
  direction = "horizontal",
}: MetricsSummaryProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        direction === "horizontal" ? "md:grid-cols-3" : "grid-cols-1",
      )}
    >
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">MSE</p>
            <p className="text-3xl font-bold">{formatNumber(metrics.mse)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Mean Squared Error
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">RSE</p>
            <p className="text-3xl font-bold">{formatNumber(metrics.rse)}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Residual Standard Error
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">R²</p>
            <p className="text-3xl font-bold">
              {formatNumber(metrics.rSquared)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Coefficient of Determination
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
