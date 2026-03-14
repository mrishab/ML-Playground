import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnStats } from "@/types/dataset";
import { useDatasetStore } from "@/stores/dataset";
import { extractNumber, formatNumber } from "@/lib/number";
import { DataFrame } from "danfojs";
import { SortableHeader } from "@/components/ui/data-table";

function computeColumnStats(df: DataFrame): ColumnStats[] {
  const [rowCount] = df.shape as [number, number];
  const columns: ColumnStats[] = [];

  for (const col of df.columns) {
    const series = df.column(col);
    const dtype = series.dtype;
    const count = extractNumber(series.count());
    const missing = rowCount - count;
    const unique = series.unique().shape[0];

    const stats: ColumnStats = {
      column: col,
      dtype,
      count,
      missing,
      unique,
    };

    if (dtype === "float32" || dtype === "int32") {
      stats.mean = extractNumber(series.mean());
      stats.std = extractNumber(series.std());
      stats.min = extractNumber(series.min());
      stats.max = extractNumber(series.max());
      stats.median = extractNumber(series.median());
    }

    columns.push(stats);
  }

  return columns;
}

function createColumns(): ColumnDef<ColumnStats>[] {
  return [
    {
      id: "column",
      accessorKey: "column",
      header: ({ column }) => <SortableHeader column={column} title="Column" />,
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("column")}</span>
      ),
    },
    {
      id: "dtype",
      accessorKey: "dtype",
      header: ({ column }) => <SortableHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <span className="rounded bg-muted px-2 py-0.5 text-xs">
          {row.getValue("dtype")}
        </span>
      ),
    },
    {
      id: "count",
      accessorKey: "count",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Count" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("count")}</div>
      ),
    },
    {
      id: "missing",
      accessorKey: "missing",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Missing" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("missing")}</div>
      ),
    },
    {
      id: "unique",
      accessorKey: "unique",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Unique" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("unique")}</div>
      ),
    },
    {
      id: "mean",
      accessorKey: "mean",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Mean" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {formatNumber(row.getValue<number | undefined>("mean"))}
        </div>
      ),
    },
    {
      id: "std",
      accessorKey: "std",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Std" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {formatNumber(row.getValue<number | undefined>("std"))}
        </div>
      ),
    },
    {
      id: "min",
      accessorKey: "min",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Min" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {formatNumber(row.getValue<number | undefined>("min"))}
        </div>
      ),
    },
    {
      id: "median",
      accessorKey: "median",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Median" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {formatNumber(row.getValue<number | undefined>("median"))}
        </div>
      ),
    },
    {
      id: "max",
      accessorKey: "max",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader column={column} title="Max" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">
          {formatNumber(row.getValue<number | undefined>("max"))}
        </div>
      ),
    },
  ];
}

export function useAnalyzeTable() {
  const df = useDatasetStore((state) => state.df);

  if (!df) return null;

  return {
    data: computeColumnStats(df),
    columns: createColumns(),
  };
}
