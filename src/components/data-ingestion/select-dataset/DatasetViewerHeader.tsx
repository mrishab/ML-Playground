import { Download, Save, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDatasetStore } from "@/stores/dataset";
import { useViewerHeaderActions } from "./useViewerHeaderActions";
import { SaveDatasetModal } from "./cleanup/SaveDatasetModal";

interface DatasetViewerHeaderProps {
  selectedDataset: string | null;
  rowCount: number;
  colCount: number;
}

export function DatasetViewerHeader({ selectedDataset, rowCount, colCount }: DatasetViewerHeaderProps) {
  const isCustom = useDatasetStore((s) => s.customDatasets.some((d) => d.name === selectedDataset));
  const { saveModalOpen, setSaveModalOpen, handleDownload, handleNavigateManage } = useViewerHeaderActions();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Loaded: <strong className="text-foreground">{selectedDataset}</strong> ({rowCount} rows, {colCount} cols)
        </span>
        {isCustom && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
            Custom
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="sm" onClick={() => setSaveModalOpen(true)} className="h-7 text-xs gap-1.5 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
          <Save className="h-3.5 w-3.5" /> Save
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownload} className="h-7 text-xs gap-1.5 transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </Button>
        <Button variant="ghost" size="sm" onClick={handleNavigateManage} className="h-7 text-xs gap-1.5 text-muted-foreground transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]">
          <FolderKanban className="h-3.5 w-3.5" /> Datasets
        </Button>
      </div>
      <SaveDatasetModal open={saveModalOpen} onOpenChange={setSaveModalOpen} />
    </div>
  );
}
