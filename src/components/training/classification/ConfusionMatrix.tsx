import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClassificationMetrics } from "@/types/classification";
import { ConfusionMatrixTable } from "./confusion-matrix/ConfusionMatrixTable";
import { ConfusionMatrixLegend } from "./confusion-matrix/ConfusionMatrixLegend";

export function ConfusionMatrix({
  metrics,
}: {
  metrics: ClassificationMetrics;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Confusion Matrix</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ConfusionMatrixTable
          confusionMatrix={metrics.confusionMatrix}
          labels={metrics.labels}
        />
        <ConfusionMatrixLegend />
      </CardContent>
    </Card>
  );
}
