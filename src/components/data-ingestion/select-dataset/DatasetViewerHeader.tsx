import { Badge } from "@/components/ui/badge";
import { useDatasetStore } from "@/stores/dataset";

interface DatasetViewerHeaderProps {
  selectedDataset: string | null;
  rowCount: number;
  colCount: number;
}

export function DatasetViewerHeader({
  selectedDataset,
  rowCount,
  colCount,
}: DatasetViewerHeaderProps) {
  const isCustom = useDatasetStore((s) =>
    s.customDatasets.some((d) => d.name === selectedDataset),
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">
          Loaded: <strong className="text-foreground">{selectedDataset}</strong>{" "}
          ({rowCount} rows, {colCount} columns)
        </span>
        {isCustom && (
          <Badge
            variant="secondary"
            className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-medium"
          >
            Uploaded Custom
          </Badge>
        )}
      </div>
    </div>
  );
}
