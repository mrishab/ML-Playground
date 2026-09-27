export function AccuracyProgressBar({ accuracy }: { accuracy: number }) {
  const accuracyPercent = (accuracy * 100).toFixed(2);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Overall Accuracy</span>
        <span className="font-medium">{accuracyPercent}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-blue-500 transition-[width] duration-300 ease-out"
          style={{
            width: `${Math.max(0, Math.min(100, accuracy * 100))}%`,
          }}
        />
      </div>
    </div>
  );
}
