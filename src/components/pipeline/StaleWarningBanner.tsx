import { AlertTriangle, RotateCcw, Play } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type StaleWarningBannerProps = {
  title?: string;
  message: string;
  onRevert: () => void;
  revertLabel?: string;
  onRecompute: () => void;
  recomputeLabel?: string;
};

export function StaleWarningBanner({
  title = "Parameters Modified",
  message,
  onRevert,
  revertLabel = "Revert Changes",
  onRecompute,
  recomputeLabel = "Apply Changes",
}: StaleWarningBannerProps) {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-200 transition-[border-color,background-color,box-shadow] duration-200 ease-out shadow-sm">
      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
        <div>
          <AlertTitle className="text-amber-800 dark:text-amber-300 font-semibold text-sm">
            {title}
          </AlertTitle>
          <AlertDescription className="text-xs text-amber-900/80 dark:text-amber-200/80 mt-1">
            {message}
          </AlertDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onRevert}
            className="group h-8 text-xs border-amber-500/30 hover:bg-amber-500/15 transition-[background-color,border-color,color] duration-150 ease-out"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:-rotate-45" />
            {revertLabel}
          </Button>
          <Button
            size="sm"
            onClick={onRecompute}
            className="h-8 text-xs bg-amber-600 hover:bg-amber-700 text-white transition-[background-color,box-shadow,transform] duration-150 ease-out active:scale-95"
          >
            <Play className="mr-1.5 h-3.5 w-3.5 fill-current" />
            {recomputeLabel}
          </Button>
        </div>
      </div>
    </Alert>
  );
}
