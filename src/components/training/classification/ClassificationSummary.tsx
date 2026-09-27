import { cn } from "@/lib/utils";
import type { ClassificationMetrics } from "@/types/classification";
import { MetricCard } from "./summary/MetricCard";

type ClassificationSummaryProps = {
  metrics: ClassificationMetrics;
  direction?: "horizontal" | "vertical";
};

export function ClassificationSummary({
  metrics,
  direction = "horizontal",
}: ClassificationSummaryProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        direction === "horizontal"
          ? "grid-cols-2 md:grid-cols-4"
          : "grid-cols-1",
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
