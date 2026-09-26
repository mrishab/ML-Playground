import { DataTable } from "@/components/ui/data-table";
import type { RegressionMetrics } from "@/types/regression";
import {
  createPredictionColumns,
  type PredictionRow,
} from "./predictions/createPredictionColumns";

function metricsToRows(metrics: RegressionMetrics): PredictionRow[] {
  return metrics.actuals.map((actual, i) => ({
    index: i + 1,
    actual,
    predicted: metrics.predictions[i],
    residual: metrics.residuals[i],
    squaredResidual: metrics.squaredResiduals[i],
  }));
}

export function PredictionsTable({ metrics }: { metrics: RegressionMetrics }) {
  const columns = createPredictionColumns();
  const data = metricsToRows(metrics);

  return <DataTable columns={columns} data={data} />;
}
