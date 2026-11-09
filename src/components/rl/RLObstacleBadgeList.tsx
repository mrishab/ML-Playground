import type { SmartObstacle, ObstacleStrategy } from "@/lib/rl/types";
import { RLObstacleBadge } from "./RLObstacleBadge";

type Props = {
  obstacles: SmartObstacle[];
  onUpdateStrategy: (id: string, s: ObstacleStrategy) => void;
  onRemove: (id: string) => void;
};

export function RLObstacleBadgeList({
  obstacles,
  onUpdateStrategy,
  onRemove,
}: Props) {
  if (obstacles.length === 0) {
    return (
      <p className="text-xs text-muted-foreground italic">
        No smart obstacles placed. Click Villain tool & grid to add.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-1.5 pt-1">
      {obstacles.map((obs) => (
        <RLObstacleBadge
          key={obs.id}
          obs={obs}
          onUpdateStrategy={onUpdateStrategy}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
