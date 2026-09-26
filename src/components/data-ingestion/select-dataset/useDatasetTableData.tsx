import { useMemo } from "react";
import type { DataFrame } from "danfojs";
import type { DataTableColumnDef } from "@/components/ui/data-table";
import type { DatasetRowData } from "@/types/dataset";

export function useDatasetTableData(df: DataFrame | null) {
  const rows = useMemo<DatasetRowData[]>(() => {
    if (!df) return [];
    const headers = (df.columns as unknown[]).map((col) => String(col ?? ""));
    const values = Array.isArray(df.values) ? (df.values as unknown[][]) : [];

    return values.map((row) => {
      const normalizedRow = Array.isArray(row) ? row : [];
      return headers.reduce<DatasetRowData>((acc, header, index) => {
        acc[header] = normalizedRow[index] ?? null;
        return acc;
      }, {});
    });
  }, [df]);

  const columns = useMemo<DataTableColumnDef<DatasetRowData>[]>(() => {
    if (!df) return [];
    return df.columns.map((rawHeader: string, index: number) => {
      const header = String(rawHeader ?? "");
      const title = header.trim().length > 0 ? header : `Column ${index + 1}`;

      return {
        id: `column_${index + 1}`,
        header: { id: `column_${index + 1}`, title },
        accessorFn: (row: DatasetRowData) => row[header],
        cell: ({ getValue }) => (
          <div className="whitespace-nowrap">{String(getValue() ?? "")}</div>
        ),
      };
    });
  }, [df]);

  return { rows, columns };
}
