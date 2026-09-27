import { DATASETS, type DatasetOption } from "./useDatasetSelect";
import { DatasetCard } from "./DatasetCard";
import { UploadDatasetCard } from "./upload/UploadDatasetCard";
import { DatasetPickerHeader } from "./DatasetPickerHeader";

interface DatasetPickerGridProps {
  pendingDataset: string | null;
  onSelect: (name: string) => void;
  onOpenUpload: () => void;
  onFileDrop?: (file: File) => void;
  customDatasets?: DatasetOption[];
  onDeleteCustom?: (name: string) => void;
}

export function DatasetPickerGrid({
  pendingDataset,
  onSelect,
  onOpenUpload,
  onFileDrop,
  customDatasets = [],
  onDeleteCustom,
}: DatasetPickerGridProps) {
  return (
    <div className="space-y-4">
      <DatasetPickerHeader />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <UploadDatasetCard onClick={onOpenUpload} onFileDrop={onFileDrop} />

        {customDatasets.map((ds) => (
          <DatasetCard
            key={ds.name}
            name={ds.name}
            problemType={ds.problemType}
            selected={ds.name === pendingDataset}
            onSelect={() => onSelect(ds.name)}
            isCustom={true}
            rowCount={ds.rowCount}
            columnCount={ds.columnCount}
            onDelete={
              onDeleteCustom ? () => onDeleteCustom(ds.name) : undefined
            }
          />
        ))}

        {DATASETS.map((ds) => (
          <DatasetCard
            key={ds.name}
            name={ds.name}
            problemType={ds.problemType}
            selected={ds.name === pendingDataset}
            onSelect={() => onSelect(ds.name)}
          />
        ))}
      </div>
    </div>
  );
}
