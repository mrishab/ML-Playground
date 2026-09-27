import { Link, useLocation } from "react-router-dom";
import { Search, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isSplit: boolean;
}

export function PretrainSubNav({ isSplit }: Props) {
  const { pathname } = useLocation();
  const isExplore = pathname.includes("/explore");
  const isAnalyze =
    pathname.includes("/visualize") || pathname.includes("/analyze");

  return (
    <div className="flex items-center gap-1.5 p-1 bg-muted/60 rounded-lg border w-fit">
      <Link
        to="/pretrain/explore"
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
          isExplore
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-background/50",
        )}
      >
        <Search className="h-3.5 w-3.5" />
        Explore & Split
      </Link>
      {isSplit ? (
        <Link
          to="/pretrain/analyze"
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
            isAnalyze
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50",
          )}
        >
          <BarChart3 className="h-3.5 w-3.5" />
          Feature Analysis
        </Link>
      ) : (
        <span
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground/50 cursor-not-allowed"
          title="Split your dataset in Explore first"
        >
          <BarChart3 className="h-3.5 w-3.5" />
          Feature Analysis
        </span>
      )}
    </div>
  );
}
