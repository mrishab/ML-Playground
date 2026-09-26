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
  const items = [
    { label: "MSE", value: metrics.mse, desc: "Mean Squared Error" },
    { label: "RSE", value: metrics.rse, desc: "Residual Standard Error" },
    { label: "R²", value: metrics.rSquared, desc: "Goodness of Fit" },
  ];

  return (
    <div
      className={cn(
        "grid gap-4",
        direction === "horizontal" ? "md:grid-cols-3" : "grid-cols-1",
      )}
    >
      {items.map((item) => (
        <Card
          key={item.label}
          className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-3xl font-bold">{formatNumber(item.value)}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
