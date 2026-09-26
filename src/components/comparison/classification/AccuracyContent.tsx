import type { ClassificationMetrics } from "@/types/classification";

export function AccuracyContent({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  const pct = (metrics.accuracy * 100).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-3xl font-bold">{pct}%</p>
        <p className="text-sm text-muted-foreground">
          {metrics.correctPredictions} / {metrics.totalSamples} correct
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{
            width: `${Math.max(0, Math.min(100, metrics.accuracy * 100))}%`,
          }}
        />
      </div>
    </div>
  );
}
