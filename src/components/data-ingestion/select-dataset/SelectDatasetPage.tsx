import { useMemo } from "react";
import {
  FileSpreadsheet,
  Loader2,
  Table as TableIcon,
  BarChart3,
} from "lucide-react";
import { useDatasetLoader } from "@/hooks/useDatasetLoader";
import { useDatasetStore } from "@/stores/dataset";
import { DatasetSelect } from "./DatasetSelect";
import { DatasetOverview } from "./DatasetOverview";
import { AnalyzeTable } from "./AnalyzeTable";
import { DatasetCard } from "./DatasetCard";
import { DATASETS } from "./useDatasetSelect";
import { PageLayout } from "@/components/shared/PageLayout";
import { DataTable, type DataTableColumnDef } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DatasetRowData } from "@/types/dataset";

export function SelectDatasetPage() {
  const { selectedDataset, df, loading, error } = useDatasetStore();
  const setSelectedDataset = useDatasetStore(
    (state) => state.setSelectedDataset,
  );
  useDatasetLoader();

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

  return (
    <PageLayout
      icon={<FileSpreadsheet className="h-8 w-8 text-primary" />}
      title="Select Dataset"
      subtitle="Choose a dataset from the available CSV files"
      actions={
        <div className="w-48">
          <DatasetSelect />
        </div>
      }
      nextStep={
        df && !loading && columns.length > 0
          ? {
              message: "Dataset loaded. Configure your ML parameters next.",
              linkTo: "/pretrain/explore",
              linkText: "Go to Explore",
            }
          : undefined
      }
    >
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
        <>
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
        </>
      )}

      {!selectedDataset && !loading && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Choose a dataset to begin your ML pipeline:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DATASETS.map((ds) => (
              <DatasetCard
                key={ds.name}
                name={ds.name}
                problemType={ds.problemType}
                selected={false}
                onSelect={() => setSelectedDataset(ds.name)}
              />
            ))}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
