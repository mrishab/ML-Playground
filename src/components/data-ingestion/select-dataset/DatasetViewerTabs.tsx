import { Table as TableIcon, BarChart3, Wand2 } from "lucide-react";
import { DataTable, type DataTableColumnDef } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatasetOverview } from "./DatasetOverview";
import { AnalyzeTable } from "./AnalyzeTable";
import { DatasetViewerHeader } from "./DatasetViewerHeader";
import { DataCleanupPanel } from "./cleanup/DataCleanupPanel";
import type { DatasetRowData } from "@/types/dataset";

interface DatasetViewerTabsProps {
  selectedDataset: string | null;
  rows: DatasetRowData[];
  columns: DataTableColumnDef<DatasetRowData>[];
}

export function DatasetViewerTabs({ selectedDataset, rows, columns }: DatasetViewerTabsProps) {
  return (
    <>
      <DatasetViewerHeader selectedDataset={selectedDataset} rowCount={rows.length} colCount={columns.length} />
      <Tabs defaultValue="table" className="flex-1">
        <TabsList>
          <TabsTrigger value="table" className="gap-2">
            <TableIcon className="h-4 w-4" /> Table
          </TabsTrigger>
          <TabsTrigger value="analyze" className="gap-2">
            <BarChart3 className="h-4 w-4" /> Analyze
          </TabsTrigger>
          <TabsTrigger value="clean" className="gap-2">
            <Wand2 className="h-4 w-4" /> Clean &amp; Prepare
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
        <TabsContent value="clean">
          <DataCleanupPanel />
        </TabsContent>
      </Tabs>
    </>
  );
}
