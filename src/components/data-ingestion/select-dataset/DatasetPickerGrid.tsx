import type { DatasetPickerGridProps, DatasetOption } from "./datasetTypes";
import { DATASETS } from "./useDatasetSelect";
import { DatasetCard } from "./DatasetCard";
import { UploadDatasetCard } from "./upload/UploadDatasetCard";
import { DatasetPickerHeader } from "./DatasetPickerHeader";

const EMPTY_CUSTOM_DATASETS: DatasetOption[] = [];

export function DatasetPickerGrid({
  pendingDataset,
  onSelect,
  onOpenUpload,
  onFileDrop,
  customDatasets = EMPTY_CUSTOM_DATASETS,
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
