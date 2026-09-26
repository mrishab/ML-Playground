import type { ColumnStats } from "@/types/dataset";
import { formatNumber } from "@/lib/number";
import type { DataTableColumnDef } from "@/components/ui/data-table";

type ColDef = DataTableColumnDef<ColumnStats>;

const numCol = (id: keyof ColumnStats, title: string): ColDef => ({
  id,
  header: { id, title, className: "text-right" },
  accessorKey: id,
  cell: ({ getValue }) => (
    <div className="text-right">
      {formatNumber(getValue<number | undefined>())}
    </div>
  ),
});

const textCol = (id: keyof ColumnStats, title: string): ColDef => ({
  id,
  header: { id, title, className: "text-right" },
  accessorKey: id,
  cell: ({ getValue }) => (
    <div className="text-right">{String(getValue() ?? "")}</div>
  ),
});

export function createAnalyzeColumns(): ColDef[] {
  return [
    {
      id: "column",
      header: { id: "column", title: "Column" },
      accessorKey: "column",
      cell: ({ getValue }) => (
        <span className="font-medium">{String(getValue() ?? "")}</span>
      ),
    },
    {
      id: "dtype",
      header: { id: "dtype", title: "Type" },
      accessorKey: "dtype",
      cell: ({ getValue }) => (
        <span className="rounded bg-muted px-2 py-0.5 text-xs">
          {String(getValue() ?? "")}
        </span>
      ),
    },
    textCol("count", "Count"),
    textCol("missing", "Missing"),
    textCol("unique", "Unique"),
    numCol("mean", "Mean"),
    numCol("std", "Std"),
    numCol("min", "Min"),
    numCol("median", "Median"),
    numCol("max", "Max"),
  ];
}
