import { CheckCircle2, Database, FlaskConical, Columns } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSplitResults, type SplitStats } from "./useSplitResults";

type SplitResultsProps = {
  stats: SplitStats | null;
  targetColumn: string;
};

export function SplitResults({ stats, targetColumn }: SplitResultsProps) {
  const { trainPercent, testPercent } = useSplitResults(stats);

  if (!stats) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex h-[200px] items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Configure features and click "Create Split" to see results
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-500/30 bg-green-500/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          Split Complete
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-lg border bg-background p-3">
            <Database className="mb-1 h-4 w-4 text-blue-500" />
            <span className="text-lg font-semibold">{stats.trainRows}</span>
            <span className="text-xs text-muted-foreground">
              Train ({trainPercent}%)
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-background p-3">
            <FlaskConical className="mb-1 h-4 w-4 text-orange-500" />
            <span className="text-lg font-semibold">{stats.testRows}</span>
            <span className="text-xs text-muted-foreground">
              Test ({testPercent}%)
            </span>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-background p-3">
            <Columns className="mb-1 h-4 w-4 text-purple-500" />
            <span className="text-lg font-semibold">{stats.featureCount}</span>
            <span className="text-xs text-muted-foreground">Features</span>
          </div>
        </div>

        {/* Target Column */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Target (Y):</span>
          <Badge variant="secondary">{targetColumn}</Badge>
        </div>

        {/* Feature Names */}
        <div>
          <span className="text-sm text-muted-foreground">Features (X):</span>
          <ScrollArea className="mt-2 h-[80px]">
            <div className="flex flex-wrap gap-1">
              {stats.featureNames.map((name) => (
                <Badge key={name} variant="outline" className="text-xs">
                  {name}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
