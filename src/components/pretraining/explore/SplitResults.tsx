import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSplitResults, type SplitStats } from "./useSplitResults";
import { SplitStatsGrid } from "./split-results/SplitStatsGrid";
import { SplitResultsFeatures } from "./split-results/SplitResultsFeatures";

type SplitResultsProps = {
  stats: SplitStats | null;
  targetColumn: string;
};

export function SplitResults({ stats, targetColumn }: SplitResultsProps) {
  const { trainPercent, testPercent } = useSplitResults(stats);

  if (!stats) {
    return (
      <Card className="border-dashed transition-all duration-200">
        <CardContent className="flex h-[200px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Create a split to view results.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-500/30 bg-emerald-500/5 transition-all duration-200 animate-in fade-in-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          Split Complete
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SplitStatsGrid
          stats={stats}
          trainPercent={trainPercent}
          testPercent={testPercent}
        />
        <SplitResultsFeatures
          targetColumn={targetColumn}
          featureNames={stats.featureNames}
        />
      </CardContent>
    </Card>
  );
}
