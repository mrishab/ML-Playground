export function ConfusionMatrixLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-green-500" />
        <span>Correct (diagonal)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded bg-red-500" />
        <span>Misclassified</span>
      </div>
    </div>
  );
}
