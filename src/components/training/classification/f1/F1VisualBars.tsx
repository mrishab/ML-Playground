import type { PerClassMetrics } from "@/types/classification";

export function F1VisualBars({ perClass }: { perClass: PerClassMetrics[] }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Per-Class F1 Scores</p>
      {perClass.map((cls) => (
        <div key={cls.label} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{cls.label}</span>
            <span className="font-medium">
              {(cls.f1Score * 100).toFixed(1)}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full w-full origin-left bg-emerald-500 transition-transform duration-300 ease-out"
              style={{
                transform: `scaleX(${Math.max(0, Math.min(1, cls.f1Score))})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
