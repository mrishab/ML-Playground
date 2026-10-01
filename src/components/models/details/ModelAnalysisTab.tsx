import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

export function ModelAnalysisTab({ model }: { model: SavedModel }) {
  const analysis = model.featureAnalysis ?? [];

  if (analysis.length === 0) {
    return <p className="text-xs text-muted-foreground py-4">No feature analysis data available.</p>;
  }

  return (
    <div className="overflow-x-auto max-h-64 border rounded-lg border-border/70 text-xs">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="py-2 h-8">Feature</TableHead>
            <TableHead className="py-2 h-8 font-mono">Mean</TableHead>
            <TableHead className="py-2 h-8 font-mono">Std Dev</TableHead>
            <TableHead className="py-2 h-8 font-mono">Min / Max</TableHead>
            <TableHead className="py-2 h-8">Target Correlation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {analysis.map((item) => (
            <TableRow key={item.feature} className="hover:bg-muted/20">
              <TableCell className="font-medium py-1.5">{item.feature}</TableCell>
              <TableCell className="font-mono py-1.5">{item.mean}</TableCell>
              <TableCell className="font-mono py-1.5">{item.std}</TableCell>
              <TableCell className="font-mono py-1.5">{item.min} / {item.max}</TableCell>
              <TableCell className="py-1.5">
                {item.correlationWithTarget !== undefined ? (
                  <Badge variant="outline" className="font-mono text-[10px]">
                    r = {item.correlationWithTarget} ({item.correlationStrength})
                  </Badge>
                ) : (
                  "—"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
