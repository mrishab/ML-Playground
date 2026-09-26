import type { DataTableColumnDef } from "@/components/ui/data-table";
import { formatNumber } from "@/lib/number";

export type PredictionRow = {
  index: number;
  actual: number;
  predicted: number;
  residual: number;
  squaredResidual: number;
};

const numCol = (
  id: keyof PredictionRow,
  title: string,
): DataTableColumnDef<PredictionRow> => ({
  id,
  accessorKey: id,
  header: { id, title, className: "text-right" },
  cell: ({ getValue }) => (
    <div className="text-right">{formatNumber(getValue<number>())}</div>
  ),
});

export function createPredictionColumns(): DataTableColumnDef<PredictionRow>[] {
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
    numCol("actual", "Actual (y)"),
    numCol("predicted", "Predicted (ŷ)"),
    numCol("residual", "Residual"),
    numCol("squaredResidual", "Residual²"),
  ];
}
