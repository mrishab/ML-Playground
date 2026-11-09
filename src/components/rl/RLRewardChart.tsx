import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  rewards: number[];
};

export function RLRewardChart({ rewards }: Props) {
  if (rewards.length < 2) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex h-28 items-center justify-center p-4 text-xs text-muted-foreground">
          Run episodes to see cumulative reward curve
        </CardContent>
      </Card>
    );
  }

  const minR = Math.min(...rewards);
  const maxR = Math.max(...rewards);
  const range = Math.max(1, maxR - minR);

  // Moving average smoothing
  const points = rewards.map((r, i) => {
    const x = (i / (rewards.length - 1)) * 100;
    const y = 95 - ((r - minR) / range) * 90;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(" L ")}`;

  return (
    <Card>
      <CardHeader className="pb-1 pt-3 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-medium">
          Reward Learning Curve
        </CardTitle>
        <span className="text-[10px] text-muted-foreground font-mono">
          min: {minR.toFixed(0)} | max: {maxR.toFixed(0)}
        </span>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <div className="h-24 w-full bg-muted/20 rounded border border-border/40 overflow-hidden p-1">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d={pathD}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
