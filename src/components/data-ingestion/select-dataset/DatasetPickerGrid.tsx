import { DATASETS } from "./useDatasetSelect";
import { DatasetCard } from "./DatasetCard";

interface DatasetPickerGridProps {
  pendingDataset: string | null;
  onSelect: (name: string) => void;
}

export function DatasetPickerGrid({
  pendingDataset,
  onSelect,
}: DatasetPickerGridProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Choose a dataset to begin your ML pipeline:
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
