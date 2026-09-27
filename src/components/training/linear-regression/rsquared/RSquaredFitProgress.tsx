export function RSquaredFitProgress({ rSquared }: { rSquared: number }) {
  const rSquaredPercent = (rSquared * 100).toFixed(2);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Goodness of Fit</span>
        <span className="font-medium">{rSquaredPercent}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-emerald-500 transition-[width] duration-300 ease-out"
          style={{
            width: `${Math.max(0, Math.min(100, rSquared * 100))}%`,
          }}
        />
      </div>
    </div>
  );
}
