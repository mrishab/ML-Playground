import { Table as TableIcon, BarChart3 } from "lucide-react";
import { DataTable, type DataTableColumnDef } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useDatasetStore } from "@/stores/dataset";
import { DatasetOverview } from "./DatasetOverview";
import { AnalyzeTable } from "./AnalyzeTable";
import type { DatasetRowData } from "@/types/dataset";

interface DatasetViewerTabsProps {
  selectedDataset: string | null;
  rows: DatasetRowData[];
  columns: DataTableColumnDef<DatasetRowData>[];
}

export function DatasetViewerTabs({
  selectedDataset,
  rows,
  columns,
}: DatasetViewerTabsProps) {
  const isCustom = useDatasetStore((s) =>
    s.customDatasets.some((d) => d.name === selectedDataset),
  );

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Loaded:{" "}
            <strong className="text-foreground">{selectedDataset}</strong> (
            {rows.length} rows, {columns.length} columns)
          </span>
          {isCustom && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-medium"
            >
              Uploaded Custom
            </Badge>
          )}
        </div>
      </div>

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
  );
}
