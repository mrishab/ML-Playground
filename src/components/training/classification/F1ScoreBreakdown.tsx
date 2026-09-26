import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClassificationMetrics } from "@/types/classification";
import { F1PerClassTable } from "./f1/F1PerClassTable";
import { F1Averages } from "./f1/F1Averages";
import { F1VisualBars } from "./f1/F1VisualBars";

export function F1ScoreBreakdown({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">F1-Score Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted/60 p-3 text-center">
          <p className="font-mono text-sm">
            F1 = 2 × (Precision × Recall) / (Precision + Recall)
          </p>
        </div>
        <F1PerClassTable perClass={metrics.perClass} />
        <F1Averages macroF1={metrics.macroF1} weightedF1={metrics.weightedF1} />
        <F1VisualBars perClass={metrics.perClass} />
      </CardContent>
    </Card>
  );
}
