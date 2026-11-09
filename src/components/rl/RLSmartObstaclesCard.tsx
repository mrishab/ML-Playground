import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { SmartObstacle, ObstacleStrategy } from "@/lib/rl/types";
import { STRATEGIES } from "@/lib/rl/smartObstacleBehavior";
import { RLObstacleBadgeList } from "./RLObstacleBadgeList";

type Props = {
  activeStrategy: ObstacleStrategy;
  onSelectStrategy: (s: ObstacleStrategy) => void;
  smartObstacles: SmartObstacle[];
  onUpdateStrategy: (id: string, s: ObstacleStrategy) => void;
  onRemove: (id: string) => void;
};

export function RLSmartObstaclesCard({
  activeStrategy,
  onSelectStrategy,
  smartObstacles,
  onUpdateStrategy,
  onRemove,
}: Props) {
  const current =
    STRATEGIES.find((s) => s.id === activeStrategy) ?? STRATEGIES[0];

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Acting Smart Obstacles</CardTitle>
        <span className="text-xs text-muted-foreground">
          {smartObstacles.length} Active
        </span>
      </CardHeader>
      <CardContent className="space-y-2.5">
        <div className="grid grid-cols-5 gap-1">
          {STRATEGIES.map((s) => (
            <Button
              key={s.id}
              size="sm"
              variant={activeStrategy === s.id ? "default" : "outline"}
              className="h-7 text-xs px-1"
              onClick={() => onSelectStrategy(s.id)}
            >
              {s.label}
            </Button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">{current.desc}</p>
        <RLObstacleBadgeList
          obstacles={smartObstacles}
          onUpdateStrategy={onUpdateStrategy}
          onRemove={onRemove}
        />
      </CardContent>
    </Card>
  );
}
