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
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">
            Accuracy = Correct Predictions / Total Predictions
          </p>
        </div>

        {/* Calculation Steps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
            <span className="text-sm">Total Samples</span>
            <Badge variant="secondary">{metrics.totalSamples}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
            <span className="text-sm">Correct Predictions</span>
            <Badge variant="secondary">{metrics.correctPredictions}</Badge>
          </div>
          <div className="flex items-center justify-between rounded border p-2.5 transition-colors duration-200">
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
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{
                width: `${Math.max(0, Math.min(100, metrics.accuracy * 100))}%`,
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
