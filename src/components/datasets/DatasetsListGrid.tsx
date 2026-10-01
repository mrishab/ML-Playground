import { DatasetItemCard } from "./DatasetItemCard";
import type { SavedDataset } from "@/types/savedDataset";

interface ListGridProps {
  datasets: SavedDataset[];
  onLoadInPipeline: (d: SavedDataset) => void;
  onInspect: (d: SavedDataset) => void;
  onDownloadCSV: (d: SavedDataset) => void;
  onDownloadJSON: (d: SavedDataset) => void;
  onRename: (d: SavedDataset) => void;
  onDelete: (d: SavedDataset) => void;
}

export function DatasetsListGrid(p: ListGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {p.datasets.map((dataset) => (
        <DatasetItemCard
          key={dataset.id}
          dataset={dataset}
          onLoadInPipeline={p.onLoadInPipeline}
          onInspect={p.onInspect}
          onDownloadCSV={p.onDownloadCSV}
          onDownloadJSON={p.onDownloadJSON}
          onRename={p.onRename}
          onDelete={p.onDelete}
        />
      ))}
    </div>
  );
}
