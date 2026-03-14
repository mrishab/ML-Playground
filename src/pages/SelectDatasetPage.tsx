import { useMemo } from "react";
import {
  FileSpreadsheet,
  Loader2,
  Table as TableIcon,
  BarChart3,
} from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDatasetLoader } from "@/hooks/useDatasetLoader";
import { useDatasetStore } from "@/stores/dataset";
import { DatasetSelect } from "@/components/DatasetSelect";
import { DatasetOverview } from "@/components/DatasetOverview";
import { AnalyzeTable } from "@/components/AnalyzeTable";
import { DataTable, SortableHeader } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RowData = Record<string, unknown>;

export function SelectDatasetPage() {
  const { selectedDataset, df, loading, error } = useDatasetStore();
  useDatasetLoader();

  const rows = useMemo<RowData[]>(() => {
    if (!df) return [];
    const headers = (df.columns as unknown[]).map((col) => String(col ?? ""));
    const values = Array.isArray(df.values) ? (df.values as unknown[][]) : [];

    return values.map((row) => {
      const normalizedRow = Array.isArray(row) ? row : [];
      return headers.reduce<RowData>((acc, header, index) => {
        acc[header] = normalizedRow[index] ?? null;
        return acc;
      }, {});
    });
  }, [df]);

  const columns = useMemo<ColumnDef<RowData>[]>(() => {
    if (!df) return [];
    return df.columns.map((rawHeader: string, index: number) => {
      const header = String(rawHeader ?? "");

      return {
        id: `column_${index + 1}`,
        accessorFn: (row) => row[header],
        header: ({ column }) => (
          <SortableHeader
            column={column}
            title={header.trim().length > 0 ? header : `Column ${index + 1}`}
          />
        ),
        cell: ({ getValue }) => (
          <div className="whitespace-nowrap">{String(getValue() ?? "")}</div>
        ),
      };
    });
  }, [df]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <FileSpreadsheet className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-semibold">Select Dataset</h1>
          <p className="text-sm text-muted-foreground">
            Choose a dataset from the available CSV files
          </p>
        </div>
      </div>

      <div className="w-full max-w-xs">
        <DatasetSelect />
      </div>

      {loading && (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {df && !loading && columns.length > 0 && (
        <Tabs defaultValue="table" className="flex-1">
          <TabsList>
            <TabsTrigger value="table" className="gap-2">
              <TableIcon className="h-4 w-4" />
              Table
            </TabsTrigger>
            <TabsTrigger value="analyze" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analyze
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="flex-1">
            <DataTable columns={columns} data={rows} />
          </TabsContent>

          <TabsContent value="analyze">
            <div className="space-y-6">
              <DatasetOverview />
              <AnalyzeTable />
            </div>
          </TabsContent>
        </Tabs>
      )}

      {!selectedDataset && !loading && (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30">
          <p className="text-muted-foreground">
            Select a dataset to view its contents
          </p>
        </div>
      )}
    </div>
  );
}
