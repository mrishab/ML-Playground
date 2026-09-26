import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/number";
import type { ClassificationMetrics } from "@/types/classification";
import { AccuracyProgressBar } from "./accuracy/AccuracyProgressBar";

export function AccuracyBreakdown({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Accuracy Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">
            Accuracy = Correct Predictions / Total Predictions
          </p>
        </div>

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

        <AccuracyProgressBar accuracy={metrics.accuracy} />
      </CardContent>
    </Card>
  );
}
