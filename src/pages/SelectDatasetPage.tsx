import { useMemo } from "react";
import {
  FileSpreadsheet,
  Loader2,
  Table as TableIcon,
  BarChart3,
} from "lucide-react";
import { useDatasetLoader } from "@/hooks/useDatasetLoader";
import { useDatasetStore } from "@/stores/dataset";
import { DatasetSelect } from "@/components/DatasetSelect";
import { DatasetOverview } from "@/components/DatasetOverview";
import { AnalyzeTable } from "@/components/AnalyzeTable";
import { PageHeader } from "@/components/PageHeader";
import { NoDatasetAlert } from "@/components/NoDatasetAlert";
import { DataTable, type DataTableColumnDef } from "@/components/ui/data-table";
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

  const columns = useMemo<DataTableColumnDef<RowData>[]>(() => {
    if (!df) return [];
    return df.columns.map((rawHeader: string, index: number) => {
      const header = String(rawHeader ?? "");
      const title = header.trim().length > 0 ? header : `Column ${index + 1}`;

      return {
        id: `column_${index + 1}`,
        header: { id: `column_${index + 1}`, title },
        accessorFn: (row: RowData) => row[header],
        cell: ({ getValue }) => (
          <div className="whitespace-nowrap">{String(getValue() ?? "")}</div>
        ),
      };
    });
  }, [df]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <PageHeader
        icon={<FileSpreadsheet className="h-8 w-8 text-primary" />}
        title="Select Dataset"
        subtitle="Choose a dataset from the available CSV files"
      />

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
        <NoDatasetAlert
          title="No dataset selected"
          description="Select a dataset above to view its contents."
        />
      )}
    </div>
  );
}
