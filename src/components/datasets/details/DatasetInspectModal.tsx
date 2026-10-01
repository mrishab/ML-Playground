import { Play, Download, Database } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatasetRowsPreview } from "./DatasetRowsPreview";
import { DatasetSchemaTable } from "./DatasetSchemaTable";
import { DatasetAuditHistory } from "./DatasetAuditHistory";
import type { SavedDataset } from "@/types/savedDataset";

interface InspectModalProps {
  dataset: SavedDataset | null;
  onClose: () => void;
  onLoadInPipeline: (d: SavedDataset) => void;
  onDownloadCSV: (d: SavedDataset) => void;
}

export function DatasetInspectModal({ dataset, onClose, onLoadInPipeline, onDownloadCSV }: InspectModalProps) {
  if (!dataset) return null;

  return (
    <Dialog open={Boolean(dataset)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" /> {dataset.name}
          </DialogTitle>
          <DialogDescription>
            {dataset.rowCount.toLocaleString()} rows • {dataset.columnCount} columns • {dataset.source}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="rows" className="flex-1 overflow-hidden flex flex-col pt-1">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="rows">Data Preview</TabsTrigger>
            <TabsTrigger value="schema">Columns &amp; Types</TabsTrigger>
            <TabsTrigger value="history">History ({dataset.history?.length ?? 0})</TabsTrigger>
          </TabsList>
          <div className="pt-3 flex-1 overflow-auto">
            <TabsContent value="rows"><DatasetRowsPreview columns={dataset.columns} data={dataset.data} /></TabsContent>
            <TabsContent value="schema"><DatasetSchemaTable columns={dataset.columns} dtypes={dataset.dtypes} data={dataset.data} /></TabsContent>
            <TabsContent value="history"><DatasetAuditHistory history={dataset.history} /></TabsContent>
          </div>
        </Tabs>
        <DialogFooter className="flex sm:justify-between items-center gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => onDownloadCSV(dataset)} className="h-8 gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 text-xs">Close</Button>
            <Button size="sm" onClick={() => { onLoadInPipeline(dataset); onClose(); }} className="h-8 gap-1.5 text-xs active:scale-[0.98]">
              <Play className="h-3.5 w-3.5" /> Load in Pipeline
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
