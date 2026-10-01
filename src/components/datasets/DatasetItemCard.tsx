import { Card, CardContent } from "@/components/ui/card";
import { DatasetItemCardHeader } from "./DatasetItemCardHeader";
import { DatasetItemCardStats } from "./DatasetItemCardStats";
import { DatasetItemCardActions } from "./DatasetItemCardActions";
import type { SavedDataset } from "@/types/savedDataset";

interface DatasetItemCardProps {
  dataset: SavedDataset;
  onLoadInPipeline: (dataset: SavedDataset) => void;
  onInspect: (dataset: SavedDataset) => void;
  onDownloadCSV: (dataset: SavedDataset) => void;
  onDownloadJSON: (dataset: SavedDataset) => void;
  onRename: (dataset: SavedDataset) => void;
  onDelete: (dataset: SavedDataset) => void;
}

export function DatasetItemCard(p: DatasetItemCardProps) {
  return (
    <Card className="flex flex-col justify-between border-border/80 bg-card hover:border-primary/40 hover:shadow-sm transition-[border-color,box-shadow] duration-200">
      <CardContent className="flex flex-col gap-3 p-4">
        <DatasetItemCardHeader dataset={p.dataset} />
        <DatasetItemCardStats dataset={p.dataset} />
        <DatasetItemCardActions
          dataset={p.dataset}
          onLoadInPipeline={p.onLoadInPipeline}
          onInspect={p.onInspect}
          onDownloadCSV={p.onDownloadCSV}
          onDownloadJSON={p.onDownloadJSON}
          onRename={p.onRename}
          onDelete={p.onDelete}
        />
      </CardContent>
    </Card>
  );
}
