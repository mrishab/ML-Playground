import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { SavedModel } from "@/types/savedModel";

export function ModelTelemetryTab({ model }: { model: SavedModel }) {
  const history = model.lossHistory ?? [];

  if (history.length === 0) {
    return <p className="text-xs text-muted-foreground py-4">No training telemetry was recorded for this model.</p>;
  }

  const initialLoss = history[0]?.loss ?? 0;
  const finalLoss = history[history.length - 1]?.loss ?? 0;

  return (
    <div className="flex flex-col gap-3 py-2 text-xs">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded border border-border/70 p-2 bg-muted/20">
          <span className="text-muted-foreground block text-[10px]">Total Steps</span>
          <span className="font-mono text-sm font-semibold">{history.length}</span>
        </div>
        <div className="rounded border border-border/70 p-2 bg-muted/20">
          <span className="text-muted-foreground block text-[10px]">Initial Loss</span>
          <span className="font-mono text-sm font-semibold">{initialLoss.toFixed(4)}</span>
        </div>
        <div className="rounded border border-border/70 p-2 bg-muted/20">
          <span className="text-muted-foreground block text-[10px]">Final Loss</span>
          <span className="font-mono text-sm font-semibold">{finalLoss.toFixed(4)}</span>
        </div>
      </div>

      <div className="overflow-x-auto max-h-48 border rounded-lg border-border/70">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="py-1.5 h-7">Step</TableHead>
              <TableHead className="py-1.5 h-7 font-mono">Training Loss</TableHead>
              <TableHead className="py-1.5 h-7 font-mono">Validation / Secondary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.slice(-10).map((pt) => (
              <TableRow key={pt.step}>
                <TableCell className="py-1">{pt.step}</TableCell>
                <TableCell className="font-mono py-1">{pt.loss}</TableCell>
                <TableCell className="font-mono py-1">{pt.valLoss ?? pt.secondary ?? "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
