import { Button } from "@/components/ui/button";
import { Download, Upload, Trash2, Database } from "lucide-react";

interface HeaderProps {
  datasetCount: number;
  onImportClick: () => void;
  onDownloadAllClick: () => void;
  onClearAllClick: () => void;
}

export function DatasetsPageHeader(p: HeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Database className="h-6 w-6 text-primary" />
          Saved Datasets &amp; Transformations
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Store, delete, download, view, and load cleaned datasets from local storage
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={p.onImportClick} className="active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          Import Dataset
        </Button>
        {p.datasetCount > 0 && (
          <>
            <Button variant="outline" size="sm" onClick={p.onDownloadAllClick} className="active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={p.onClearAllClick}
              className="text-destructive hover:bg-destructive/10 active:scale-[0.98] transition-[transform,background-color,border-color,color] duration-150 ease-out"
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
