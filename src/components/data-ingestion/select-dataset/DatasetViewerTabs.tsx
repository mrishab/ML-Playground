import { Table as TableIcon, BarChart3 } from "lucide-react";
import { DataTable, type DataTableColumnDef } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-1 pb-2">
        <span className="text-xs text-muted-foreground">
          Loaded: <strong className="text-foreground">{selectedDataset}</strong>{" "}
          ({rows.length} rows, {columns.length} columns)
        </span>
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
