import { CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CompletionCelebrationCard() {
  return (
    <Card className="border-emerald-500/30 bg-emerald-500/5 transition-all duration-200">
      <CardContent className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 p-4 sm:p-5">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="flex-1 min-w-[140px]">
          <h3 className="font-semibold text-foreground text-base">
            Pipeline Completed
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            All stages executed successfully.
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 px-3 py-1 shrink-0 ml-auto sm:ml-0"
        >
          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
          Complete
        </Badge>
      </CardContent>
    </Card>
  );
}
