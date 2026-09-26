import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActionGateChecklistItem } from "./types";

export function ActionGateDrawerItem({
  item,
}: {
  item: ActionGateChecklistItem;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md border p-2.5 text-xs transition-colors duration-200",
        item.satisfied
          ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-950 dark:text-emerald-200"
          : "border-amber-500/20 bg-amber-500/5 text-amber-950 dark:text-amber-200",
      )}
    >
      {item.satisfied ? (
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
      ) : (
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium leading-tight truncate">{item.label}</p>
        {!item.satisfied && item.missingText && (
          <p className="mt-0.5 text-[11px] opacity-80">{item.missingText}</p>
        )}
      </div>
    </div>
  );
}
