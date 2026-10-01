import { Play, Eye, Download, Pencil, Trash2, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SavedDataset } from "@/types/savedDataset";

interface ActionsProps {
  dataset: SavedDataset;
  onLoadInPipeline: (d: SavedDataset) => void;
  onInspect: (d: SavedDataset) => void;
  onDownloadCSV: (d: SavedDataset) => void;
  onDownloadJSON: (d: SavedDataset) => void;
  onRename: (d: SavedDataset) => void;
  onDelete: (d: SavedDataset) => void;
}

export function DatasetItemCardActions(p: ActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1">
      <div className="flex items-center gap-1.5">
        <Button size="sm" onClick={() => p.onLoadInPipeline(p.dataset)} className="h-7 text-xs font-medium gap-1 active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
          <Play className="h-3 w-3" /> Load
        </Button>
        <Button variant="outline" size="sm" onClick={() => p.onInspect(p.dataset)} className="h-7 text-xs font-medium gap-1 active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
          <Eye className="h-3 w-3" /> Inspect
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => p.onDownloadCSV(p.dataset)} title="Download CSV" className="h-7 px-2 text-xs active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
          <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => p.onDownloadJSON(p.dataset)} title="Download JSON" className="h-7 px-2 text-xs active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
          <Download className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => p.onRename(p.dataset)} title="Rename Dataset" className="h-7 px-2 text-xs active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => p.onDelete(p.dataset)} title="Delete Dataset" className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10 active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
