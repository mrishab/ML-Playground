import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RLBFSTargetPanel } from "./RLBFSTargetPanel";
import { RLRLPolicyPanel } from "./RLRLPolicyPanel";
import type { BFSComparisonResult } from "@/lib/rl/bfsSearch";

type Props = {
  bfsResult: BFSComparisonResult;
  successRate: number;
  totalEpisodes: number;
};

export function RLBFSComparisonCard({
  bfsResult,
  successRate,
  totalEpisodes,
}: Props) {
  return (
    <Card className="border-border/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          RL vs. Static Path Search (BFS/DFS) Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 text-xs">
        <RLBFSTargetPanel bfsResult={bfsResult} />
        <RLRLPolicyPanel
          successRate={successRate}
          totalEpisodes={totalEpisodes}
        />
      </CardContent>
    </Card>
  );
}
