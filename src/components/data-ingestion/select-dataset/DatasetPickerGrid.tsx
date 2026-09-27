import { DATASETS, type DatasetOption } from "./useDatasetSelect";
import { DatasetCard } from "./DatasetCard";
import { UploadDatasetCard } from "./upload/UploadDatasetCard";

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
      <div>
        <p className="text-sm font-medium text-foreground">
          Select or Upload a Dataset
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Choose a built-in benchmark dataset or import your own CSV to begin
          your ML pipeline:
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Upload Card */}
        <UploadDatasetCard onClick={onOpenUpload} onFileDrop={onFileDrop} />

        {/* Custom Uploaded Datasets */}
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

        {/* Standard Datasets */}
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
