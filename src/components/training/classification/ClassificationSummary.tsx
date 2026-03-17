import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/number";
import { cn } from "@/lib/utils";
import type { ClassificationMetrics } from "@/types/classification";

type ClassificationSummaryProps = {
  metrics: ClassificationMetrics;
  direction?: "horizontal" | "vertical";
};

type MetricCardProps = {
  label: string;
  value: number;
  subtitle: string;
  format?: "number" | "percent";
};

function MetricCard({
  label,
  value,
  subtitle,
  format = "number",
}: MetricCardProps) {
  const displayValue =
    format === "percent" ? `${(value * 100).toFixed(2)}%` : formatNumber(value);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">{displayValue}</p>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ClassificationSummary({
  metrics,
  direction = "horizontal",
}: ClassificationSummaryProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        direction === "horizontal" ? "md:grid-cols-4" : "grid-cols-1",
      )}
    >
      <MetricCard
        label="Accuracy"
        value={metrics.accuracy}
        subtitle="Overall correct rate"
        format="percent"
      />
      <MetricCard
        label="Precision"
        value={metrics.weightedPrecision}
        subtitle="Weighted average"
      />
      <MetricCard
        label="Recall"
        value={metrics.weightedRecall}
        subtitle="Weighted average"
      />
      <MetricCard
        label="F1-Score"
        value={metrics.weightedF1}
        subtitle="Weighted average"
      />
    </div>
  );
}
