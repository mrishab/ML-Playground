import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2 } from "lucide-react";

interface HeaderProps {
  modelCount: number;
  onImportClick: () => void;
  onDownloadAllClick: () => void;
  onClearAllClick: () => void;
}

export function ModelsPageHeader(p: HeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Saved Models & Analysis
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Manage, inspect, download, and delete trained models in local storage
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={p.onImportClick} className="active:scale-[0.98]">
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          Import Model
        </Button>
        {p.modelCount > 0 && (
          <>
            <Button variant="outline" size="sm" onClick={p.onDownloadAllClick} className="active:scale-[0.98]">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={p.onClearAllClick}
              className="text-destructive hover:bg-destructive/10 active:scale-[0.98]"
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Clear All
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
