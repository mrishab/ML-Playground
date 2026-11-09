import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";
import type { SmartObstacle } from "@/lib/rl/types";
import { stateKey } from "@/lib/rl/rlEngine";
import type { useRLStore } from "@/stores/rlStore";

export const ARROWS = [ArrowUp, ArrowRight, ArrowDown, ArrowLeft];

export type RLCellProps = {
  isStart?: boolean;
  isAgent: boolean;
  isGoal: boolean;
  isHazard: boolean;
  isObstacle: boolean;
  isBFSPath?: boolean;
  smartObstacle?: SmartObstacle;
  bestAction?: number;
  maxQ: number;
};

export function getBgStyle(isBlocked: boolean, q: number) {
  if (isBlocked || q === 0) return undefined;
  const token = q > 0 ? "--success" : "--destructive";
  return {
    backgroundColor: `hsl(var(${token}) / ${Math.min(0.35, Math.abs(q) / 60)})`,
  };
}

export function getGridLookups(store: ReturnType<typeof useRLStore.getState>) {
  return {
    hazardSet: new Set(store.hazards.map(([r, c]) => stateKey(r, c))),
    obstacleSet: new Set(store.obstacles.map(([r, c]) => stateKey(r, c))),
    smartObsMap: new Map(
      store.smartObstacles.map((o) => [stateKey(o.r, o.c), o]),
    ),
    bfsSet: store.showBFSPath
      ? new Set(store.bfsResult.path.map(([r, c]) => stateKey(r, c)))
      : null,
  };
}
