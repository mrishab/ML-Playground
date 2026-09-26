import { CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CompletionCelebrationCard() {
  return (
    <Card className="border-emerald-500/30 bg-emerald-500/5 transition-all duration-200">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-base">
            Pipeline Completed
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            All stages executed successfully.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 px-3 py-1"
        >
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          Complete
        </Badge>
      </CardContent>
    </Card>
  );
}
