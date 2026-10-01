import { History, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CleanupHistoryEntry } from "@/types/dataCleanup";

interface CleanupHistoryCardProps {
  history: CleanupHistoryEntry[];
}

export function CleanupHistoryCard({ history }: CleanupHistoryCardProps) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          Transformation History ({history.length})
        </CardTitle>
        <CardDescription>Audit log of operations applied during this session</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="py-6 text-center text-xs text-muted-foreground">
            No transformations applied yet. Use any tool above to clean your dataset.
          </div>
        ) : (
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-2 rounded-md border border-border bg-card/50 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-foreground">{entry.description}</span>
                </div>
                <div className="text-[11px] text-muted-foreground whitespace-nowrap">
                  {entry.rowsBefore} &rarr; {entry.rowsAfter} rows
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
