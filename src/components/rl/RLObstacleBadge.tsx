import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { SmartObstacle, ObstacleStrategy } from "@/lib/rl/types";
import { STRATEGIES } from "@/lib/rl/smartObstacleBehavior";

type Props = {
  obs: SmartObstacle;
  onUpdateStrategy: (id: string, s: ObstacleStrategy) => void;
  onRemove: (id: string) => void;
};

export function RLObstacleBadge({ obs, onUpdateStrategy, onRemove }: Props) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
      <span className="font-mono text-[11px]">
        [{obs.r},{obs.c}]
      </span>
      <select
        value={obs.strategy}
        onChange={(e) =>
          onUpdateStrategy(obs.id, e.target.value as ObstacleStrategy)
        }
        className="bg-transparent text-[11px] font-bold cursor-pointer text-destructive focus:outline-hidden hover:opacity-80"
        title="Assign obstacle strategy"
      >
        {STRATEGIES.map((s) => (
          <option
            key={s.id}
            value={s.id}
            className="bg-background text-foreground"
          >
            {s.label}
          </option>
        ))}
      </select>
      <Button
        size="icon"
        variant="ghost"
        className="h-3.5 w-3.5 p-0 text-destructive/70 hover:text-destructive"
        onClick={() => onRemove(obs.id)}
        title="Remove villain"
      >
        <X className="h-2.5 w-2.5" />
      </Button>
    </div>
  );
}
