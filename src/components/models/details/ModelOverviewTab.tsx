import { Badge } from "@/components/ui/badge";
import type { SavedModel } from "@/types/savedModel";

export function ModelOverviewTab({ model }: { model: SavedModel }) {
  const hpEntries = Object.entries(model.hyperparameters);

  return (
    <div className="flex flex-col gap-4 py-2 text-xs">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
          <span className="text-muted-foreground block text-[11px]">Problem Type</span>
          <span className="font-semibold text-foreground capitalize">{model.problemType}</span>
        </div>
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
          <span className="text-muted-foreground block text-[11px]">Dataset</span>
          <span className="font-semibold text-foreground truncate block">{model.datasetName}</span>
        </div>
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
          <span className="text-muted-foreground block text-[11px]">Train / Test</span>
          <span className="font-semibold text-foreground font-mono">
            {model.splitConfig.trainSamples} / {model.splitConfig.testSamples}
          </span>
        </div>
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/20">
          <span className="text-muted-foreground block text-[11px]">Split Ratio</span>
          <span className="font-semibold text-foreground font-mono">
            {100 - model.splitConfig.testSplitPercent}% / {model.splitConfig.testSplitPercent}%
          </span>
        </div>
      </div>

      {model.splitConfig.targetColumn && (
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
          <span className="text-muted-foreground block text-[11px] mb-1">Target Column</span>
          <Badge variant="secondary" className="font-mono text-xs">
            {model.splitConfig.targetColumn}
          </Badge>
        </div>
      )}

      {hpEntries.length > 0 && (
        <div className="rounded-lg border border-border/70 p-2.5 bg-muted/10">
          <span className="text-muted-foreground block text-[11px] mb-1.5">Hyperparameters</span>
          <div className="flex flex-wrap gap-1.5">
            {hpEntries.map(([k, v]) => (
              <Badge key={k} variant="outline" className="font-mono text-[11px]">
                {k}: {String(v)}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
