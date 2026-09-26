import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClassificationMetrics } from "@/types/classification";
import { PrecisionRecallTable } from "./precision-recall/PrecisionRecallTable";
import { PrecisionRecallAverages } from "./precision-recall/PrecisionRecallAverages";

export function PrecisionRecallBreakdown({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          Precision & Recall Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-muted/60 p-3 text-center">
            <p className="font-mono text-sm">Precision = TP / (TP + FP)</p>
          </div>
          <div className="rounded-lg bg-muted/60 p-3 text-center">
            <p className="font-mono text-sm">Recall = TP / (TP + FN)</p>
          </div>
        </div>
        <PrecisionRecallTable perClass={metrics.perClass} />
        <PrecisionRecallAverages metrics={metrics} />
      </CardContent>
    </Card>
  );
}
