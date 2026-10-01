import { RotateCcw, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CleanupBannerStats } from "./CleanupBannerStats";

interface CleanupBannerProps {
  totalMissing: number;
  missingPercent: number;
  columnsWithMissing: number;
  duplicateCount: number;
  canUndo: boolean;
  onUndo: () => void;
  onReset: () => void;
}

export function CleanupBanner({
  totalMissing,
  missingPercent,
  columnsWithMissing,
  duplicateCount,
  canUndo,
  onUndo,
  onReset,
}: CleanupBannerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-lg border border-border bg-card/60">
      <CleanupBannerStats
        totalMissing={totalMissing}
        missingPercent={missingPercent}
        columnsWithMissing={columnsWithMissing}
        duplicateCount={duplicateCount}
      />

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onUndo}
          disabled={!canUndo}
          className="h-8 gap-1.5 text-xs transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <Undo2 className="h-3.5 w-3.5" />
          Undo
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          disabled={!canUndo}
          className="h-8 gap-1.5 text-xs text-muted-foreground transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset All
        </Button>
      </div>
    </div>
  );
}
