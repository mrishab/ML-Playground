import { Ghost } from "lucide-react";
import type { ObstacleStrategy } from "@/lib/rl/types";

export function RLGhostBadge({ strategy }: { strategy: ObstacleStrategy }) {
  return (
    <div className="flex flex-col items-center justify-center pointer-events-none">
      <Ghost className="h-4 w-4 text-destructive" />
      <span className="text-[8px] font-mono font-bold leading-none text-destructive/80">
        {strategy[0].toUpperCase()}
      </span>
    </div>
  );
}
