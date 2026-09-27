import type { ClassificationMetrics } from "@/types/classification";

export function ConfusionMatrixContent({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  const { correctPredictions, totalSamples } = metrics;
  const misclassified = totalSamples - correctPredictions;
  const safeTotal = totalSamples > 0 ? totalSamples : 1;
  const correctPct = ((correctPredictions / safeTotal) * 100).toFixed(1);
  const misclassifiedPct = ((misclassified / safeTotal) * 100).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-md bg-green-500/15 p-3">
          <p className="text-2xl font-bold text-green-500">
            {correctPredictions}
          </p>
          <p className="text-xs text-muted-foreground">
            Correct ({correctPct}%)
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md bg-red-500/15 p-3">
          <p className="text-2xl font-bold text-red-500">{misclassified}</p>
          <p className="text-xs text-muted-foreground">
            Misclassified ({misclassifiedPct}%)
          </p>
        </div>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full">
        <div
          className="bg-green-500 transition-[width] duration-300 ease-out"
          style={{ width: `${correctPct}%` }}
        />
        <div
          className="bg-red-500 transition-[width] duration-300 ease-out"
          style={{ width: `${misclassifiedPct}%` }}
        />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {totalSamples} total samples
      </p>
    </div>
  );
}
