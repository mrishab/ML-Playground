import { Database, Sparkles, UploadCloud, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatFileSize } from "@/lib/csv-upload/formatFileSize";
import type { SavedDataset } from "@/types/savedDataset";

export function DatasetItemCardHeader({ dataset }: { dataset: SavedDataset }) {
  const dateStr = new Date(dataset.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCleaned = dataset.source === "cleaned";

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {isCleaned ? <Sparkles className="h-4 w-4" /> : <Database className="h-4 w-4" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-semibold text-foreground truncate" title={dataset.name}>
              {dataset.name}
            </h4>
            <Badge variant="secondary" className="text-[9px] px-1 py-0 uppercase">
              {dataset.source}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate" title={dataset.description || dataset.originalDatasetName}>
            {dataset.description || (dataset.originalDatasetName ? `Derived from ${dataset.originalDatasetName}` : "Custom Dataset")}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end shrink-0 gap-1">
        <Badge variant="outline" className="text-[10px] font-mono py-0 h-5">
          {formatFileSize(dataset.sizeBytes)}
        </Badge>
        <span className="text-[10px] text-muted-foreground">{dateStr}</span>
      </div>
    </div>
  );
}
