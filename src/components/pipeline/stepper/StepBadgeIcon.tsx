import { Check, Lock, AlertTriangle, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepBadgeIconProps {
  icon: LucideIcon;
  isActive: boolean;
  isCompleted: boolean;
  isStale: boolean;
  isLocked: boolean;
}

export function StepBadgeIcon({
  icon: Icon,
  isActive,
  isCompleted,
  isStale,
  isLocked,
}: StepBadgeIconProps) {
  return (
    <div
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-medium transition-[background-color,color,box-shadow,transform] duration-150 ease-out",
        isActive && "bg-primary text-primary-foreground shadow-sm",
        isCompleted &&
          !isStale &&
          "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        isStale &&
          "bg-amber-500/20 text-amber-600 dark:text-amber-400 animate-pulse",
        isLocked && "bg-muted text-muted-foreground/50",
      )}
    >
      {isCompleted && !isStale ? (
        <Check className="h-3.5 w-3.5 stroke-[2.5]" />
      ) : isStale ? (
        <AlertTriangle className="h-3.5 w-3.5" />
      ) : isLocked ? (
        <Lock className="h-3 w-3" />
      ) : (
        <Icon className="h-3.5 w-3.5" />
      )}
    </div>
  );
}
