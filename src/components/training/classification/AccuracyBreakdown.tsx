import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";

type AccuracyBreakdownProps = {
  metrics: ClassificationMetrics;
};

export function AccuracyBreakdown({ metrics }: AccuracyBreakdownProps) {
  const accuracyPercent = (metrics.accuracy * 100).toFixed(2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Accuracy Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formula */}
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 font-mono text-sm">
            Accuracy = Correct Predictions / Total Predictions
          </p>
          <p className="text-sm text-muted-foreground">
            The fraction of all predictions that the model classified correctly.
          </p>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Total Samples</span>
            <Badge variant="secondary">{metrics.totalSamples}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">Correct Predictions</span>
            <Badge variant="secondary">{metrics.correctPredictions}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-3">
            <span className="text-sm">
              Accuracy = {metrics.correctPredictions} / {metrics.totalSamples}
            </span>
            <Badge className="bg-blue-500">
              {formatNumber(metrics.accuracy)}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Accuracy</span>
            <span className="font-medium">{accuracyPercent}%</span>
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

        {/* Interpretation */}
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-4">
          <p className="text-sm font-medium">Interpretation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            The model correctly classified <strong>{accuracyPercent}%</strong>{" "}
            of all test samples ({metrics.correctPredictions} out of{" "}
            {metrics.totalSamples}). Accuracy alone can be misleading for
            imbalanced datasets.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
