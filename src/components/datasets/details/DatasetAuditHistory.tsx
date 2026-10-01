import { CheckCircle2 } from "lucide-react";
import type { CleanupHistoryEntry } from "@/types/dataCleanup";

interface AuditHistoryProps {
  history?: CleanupHistoryEntry[];
}

export function DatasetAuditHistory({ history = [] }: AuditHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-md">
        No cleanup transformations recorded for this dataset.
      </div>
    );
  }

  return (
    <div className="max-h-72 overflow-auto space-y-2 border border-border rounded-md p-3">
      {history.map((entry) => (
        <div key={entry.id} className="flex items-center justify-between p-2 rounded border border-border bg-card/40 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <span className="font-medium text-foreground">{entry.description}</span>
          </div>
          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
            {entry.rowsBefore} &rarr; {entry.rowsAfter} rows
          </span>
        </div>
      ))}
    </div>
  );
}
