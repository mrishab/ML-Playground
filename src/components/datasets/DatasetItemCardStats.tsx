import type { SavedDataset } from "@/types/savedDataset";

export function DatasetItemCardStats({ dataset }: { dataset: SavedDataset }) {
  const nullCount = dataset.summary?.nullCount ?? 0;
  const duplicateCount = dataset.summary?.duplicateRows ?? 0;
  const numericCount = dataset.summary?.numericColumns ?? 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2 border-y border-border/60 text-xs">
      <div>
        <span className="text-muted-foreground block text-[10px]">Rows</span>
        <span className="font-semibold text-foreground font-mono">{dataset.rowCount.toLocaleString()}</span>
      </div>
      <div>
        <span className="text-muted-foreground block text-[10px]">Columns</span>
        <span className="font-semibold text-foreground font-mono">
          {dataset.columnCount} ({numericCount} num)
        </span>
      </div>
      <div>
        <span className="text-muted-foreground block text-[10px]">Missing</span>
        <span className={`font-semibold font-mono ${nullCount > 0 ? "text-amber-500" : "text-emerald-500"}`}>
          {nullCount}
        </span>
      </div>
      <div>
        <span className="text-muted-foreground block text-[10px]">Duplicates</span>
        <span className={`font-semibold font-mono ${duplicateCount > 0 ? "text-amber-500" : "text-muted-foreground"}`}>
          {duplicateCount}
        </span>
      </div>
    </div>
  );
}
