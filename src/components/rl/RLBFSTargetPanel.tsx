import { Badge } from "@/components/ui/badge";
import type { BFSComparisonResult } from "@/lib/rl/bfsSearch";

type Props = {
  bfsResult: BFSComparisonResult;
};

export function RLBFSTargetPanel({ bfsResult }: Props) {
  const isIntercepted = bfsResult.reason === "intercepted_by_villain";

  return (
    <div className="space-y-1.5 p-2.5 rounded-md border border-border/60 bg-muted/20">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">Static BFS / DFS</span>
        <Badge
          variant={isIntercepted ? "destructive" : "secondary"}
          className="text-[10px] h-5"
        >
          {isIntercepted ? "Intercepted" : "Completed"}
        </Badge>
      </div>
      <p className="text-muted-foreground">{bfsResult.summary}</p>
      <div className="text-[11px] text-muted-foreground/80 pt-1">
        Assumes static graph; blind to acting smart obstacles.
      </div>
    </div>
  );
}
