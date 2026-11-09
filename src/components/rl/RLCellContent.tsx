import { Bot, Trophy, Flame } from "lucide-react";
import { RLGhostBadge } from "./RLGhostBadge";
import { ARROWS, type RLCellProps } from "./rlCellUtils";

export function RLCellContent(props: RLCellProps) {
  const {
    isStart,
    isAgent,
    isGoal,
    isHazard,
    isObstacle,
    smartObstacle,
    bestAction,
    maxQ,
  } = props;
  const Arrow = bestAction !== undefined ? ARROWS[bestAction] : null;
  const isOccupied = isObstacle || isHazard || isGoal || !!smartObstacle;

  return (
    <>
      {isObstacle && (
        <div className="w-full h-full bg-muted-foreground/30 rounded-xs" />
      )}
      {isGoal && <Trophy className="h-5 w-5 animate-bounce" />}
      {isHazard && <Flame className="h-5 w-5 text-destructive" />}
      {smartObstacle && !isAgent && (
        <RLGhostBadge strategy={smartObstacle.strategy} />
      )}
      {isStart && !isAgent && !isOccupied && (
        <span className="absolute top-1 left-1 text-[9px] font-mono text-muted-foreground font-bold">
          S
        </span>
      )}
      {isAgent && (
        <div className="absolute z-10 p-1 rounded-full bg-primary text-primary-foreground shadow-md animate-pulse">
          <Bot className="h-4 w-4" />
        </div>
      )}
      {!isAgent && !isOccupied && Arrow && maxQ !== 0 && (
        <Arrow className="h-3.5 w-3.5 text-muted-foreground/70" />
      )}
      {props.isBFSPath && !isGoal && (
        <span
          className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-primary"
          title="BFS Path Step"
        />
      )}
    </>
  );
}
