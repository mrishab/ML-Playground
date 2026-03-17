import type { ColumnStats } from "@/types/dataset";
import { useDatasetStore } from "@/stores/dataset";
import { extractNumber, formatNumber } from "@/lib/number";
import { DataFrame } from "danfojs";
import type { DataTableColumnDef } from "@/components/ui/data-table";

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

function createColumns(): DataTableColumnDef<ColumnStats>[] {
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
    {
      id: "count",
      header: { id: "count", title: "Count", className: "text-right" },
      accessorKey: "count",
      cell: ({ getValue }) => (
        <div className="text-right">{String(getValue() ?? "")}</div>
      ),
    },
    {
      id: "missing",
      header: { id: "missing", title: "Missing", className: "text-right" },
      accessorKey: "missing",
      cell: ({ getValue }) => (
        <div className="text-right">{String(getValue() ?? "")}</div>
      ),
    },
    {
      id: "unique",
      header: { id: "unique", title: "Unique", className: "text-right" },
      accessorKey: "unique",
      cell: ({ getValue }) => (
        <div className="text-right">{String(getValue() ?? "")}</div>
      ),
    },
    {
      id: "mean",
      header: { id: "mean", title: "Mean", className: "text-right" },
      accessorKey: "mean",
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatNumber(getValue<number | undefined>())}
        </div>
      ),
    },
    {
      id: "std",
      header: { id: "std", title: "Std", className: "text-right" },
      accessorKey: "std",
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatNumber(getValue<number | undefined>())}
        </div>
      ),
    },
    {
      id: "min",
      header: { id: "min", title: "Min", className: "text-right" },
      accessorKey: "min",
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatNumber(getValue<number | undefined>())}
        </div>
      ),
    },
    {
      id: "median",
      header: { id: "median", title: "Median", className: "text-right" },
      accessorKey: "median",
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatNumber(getValue<number | undefined>())}
        </div>
      ),
    },
    {
      id: "max",
      header: { id: "max", title: "Max", className: "text-right" },
      accessorKey: "max",
      cell: ({ getValue }) => (
        <div className="text-right">
          {formatNumber(getValue<number | undefined>())}
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
