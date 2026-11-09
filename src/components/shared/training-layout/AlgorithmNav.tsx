import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Users,
  Layers,
  Binary,
  CircleDot,
  Trees,
  Zap,
  ShieldAlert,
} from "lucide-react";

const ALGORITHMS = [
  { path: "/train/linear", label: "Linear Reg", icon: TrendingUp },
  { path: "/train/knn", label: "KNN", icon: Users },
  { path: "/train/logistic", label: "Logistic", icon: Binary },
  { path: "/train/lda", label: "LDA", icon: Layers },
  { path: "/train/clustering", label: "K-Means", icon: CircleDot },
  { path: "/train/random-forest", label: "Random Forest", icon: Trees },
  { path: "/train/xgboost", label: "XGBoost", icon: Zap },
  { path: "/train/isolation-forest", label: "Iso Forest", icon: ShieldAlert },
] as const;

export function AlgorithmNav() {
  const { pathname } = useLocation();

  return (
    <div className="w-full overflow-x-auto no-scrollbar pb-1">
      <div className="flex items-center gap-1.5 p-1 bg-muted/40 rounded-lg border border-border/60 min-w-max">
        {ALGORITHMS.map(({ path, label, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ease-out",
                isActive
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
