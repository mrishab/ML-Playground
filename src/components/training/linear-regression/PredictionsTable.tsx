import type { DataTableColumnDef } from "@/components/ui/data-table";
import { DataTable } from "@/components/ui/data-table";
import { formatNumber } from "@/lib/number";
import type { RegressionMetrics } from "@/types/regression";

type PredictionRow = {
  index: number;
  actual: number;
  predicted: number;
  residual: number;
  squaredResidual: number;
};

function createColumns(): DataTableColumnDef<PredictionRow>[] {
  return [
    {
      id: "index",
      accessorKey: "index",
      header: { id: "index", title: "#" },
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">
          {String(getValue() ?? "")}
        </span>
      ),
    },
    {
      id: "actual",
      accessorKey: "actual",
      header: { id: "actual", title: "Actual (y)", className: "text-right" },
      cell: ({ getValue }) => (
        <div className="text-right">{formatNumber(getValue<number>())}</div>
      ),
    },
    {
      id: "predicted",
      accessorKey: "predicted",
      header: {
        id: "predicted",
        title: "Predicted (ŷ)",
        className: "text-right",
      },
      cell: ({ getValue }) => (
        <div className="text-right">{formatNumber(getValue<number>())}</div>
      ),
    },
    {
      id: "residual",
      accessorKey: "residual",
      header: { id: "residual", title: "Residual", className: "text-right" },
      cell: ({ getValue }) => (
        <div className="text-right">{formatNumber(getValue<number>())}</div>
      ),
    },
    {
      id: "squaredResidual",
      accessorKey: "squaredResidual",
      header: {
        id: "squaredResidual",
        title: "Residual²",
        className: "text-right",
      },
      cell: ({ getValue }) => (
        <div className="text-right">{formatNumber(getValue<number>())}</div>
      ),
    },
  ];
}

function metricsToRows(metrics: RegressionMetrics): PredictionRow[] {
  return metrics.actuals.map((actual, i) => ({
    index: i + 1,
    actual,
    predicted: metrics.predictions[i],
    residual: metrics.residuals[i],
    squaredResidual: metrics.squaredResiduals[i],
  }));
}

type PredictionsTableProps = {
  metrics: RegressionMetrics;
};

export function PredictionsTable({ metrics }: PredictionsTableProps) {
  const columns = createColumns();
  const data = metricsToRows(metrics);

  return <DataTable columns={columns} data={data} />;
}
