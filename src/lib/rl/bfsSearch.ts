import type { SmartObstacle } from "./types";
import { stateKey } from "./rlEngine";
import { stepSmartObstacle } from "./smartObstacleBehavior";

export type BFSComparisonResult = {
  path: [number, number][];
  success: boolean;
  stepsTaken: number;
  interceptedStep?: number;
  interceptedBy?: SmartObstacle;
  reason: "reached_goal" | "intercepted_by_villain" | "no_path";
  summary: string;
};

export function findBFSPath(
  gridSize: number,
  start: [number, number],
  goal: [number, number],
  walls: [number, number][],
  hazards: [number, number][] = [],
): [number, number][] {
  const wallSet = new Set(walls.map(([r, c]) => stateKey(r, c)));
  const hazardSet = new Set(hazards.map(([r, c]) => stateKey(r, c)));

  // Try avoiding hazards first; fall back to allowing hazards if blocked
  const runBFS = (avoidHazards: boolean): [number, number][] | null => {
    const startKey = stateKey(start[0], start[1]);
    const goalKey = stateKey(goal[0], goal[1]);
    if (startKey === goalKey) return [start];

    const visited = new Set<string>([startKey]);
    const queue: [number, number][] = [start];
    const parent = new Map<string, [number, number]>();

    const dirs: [number, number][] = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      if (r === goal[0] && c === goal[1]) {
        // Reconstruct path
        const path: [number, number][] = [];
        let curr: [number, number] | undefined = [r, c];
        while (curr) {
          path.unshift(curr);
          const k = stateKey(curr[0], curr[1]);
          if (k === startKey) break;
          curr = parent.get(k);
        }
        return path;
      }

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) continue;
        const key = stateKey(nr, nc);
        if (visited.has(key) || wallSet.has(key)) continue;
        if (avoidHazards && hazardSet.has(key)) continue;

        visited.add(key);
        parent.set(key, [r, c]);
        queue.push([nr, nc]);
      }
    }
    return null;
  };

  const safePath = runBFS(true);
  if (safePath) return safePath;
  const anyPath = runBFS(false);
  return anyPath ?? [];
}

export function simulateBFSAgainstObstacles(
  gridSize: number,
  start: [number, number],
  goal: [number, number],
  walls: [number, number][],
  initialObstacles: SmartObstacle[],
): BFSComparisonResult {
  const path = findBFSPath(gridSize, start, goal, walls);
  if (path.length === 0) {
    return {
      path: [],
      success: false,
      stepsTaken: 0,
      reason: "no_path",
      summary: "No static path exists from start to goal.",
    };
  }

  const wallSet = new Set(walls.map(([r, c]) => stateKey(r, c)));
  let currentObstacles = initialObstacles.map((o) => ({ ...o }));

  // Simulate each step along the static BFS path
  for (let step = 1; step < path.length; step++) {
    const nextPos = path[step];

    // Check collision if agent steps onto obstacle
    const hitCurrent = currentObstacles.find(
      (o) => o.r === nextPos[0] && o.c === nextPos[1],
    );
    if (hitCurrent) {
      return {
        path,
        success: false,
        stepsTaken: step,
        interceptedStep: step,
        interceptedBy: hitCurrent,
        reason: "intercepted_by_villain",
        summary: `Static BFS walked directly into ${hitCurrent.strategy.toUpperCase()} villain at [${hitCurrent.r}, ${hitCurrent.c}] on step ${step}.`,
      };
    }

    // If goal reached before obstacle move
    if (nextPos[0] === goal[0] && nextPos[1] === goal[1]) {
      return {
        path,
        success: true,
        stepsTaken: step,
        reason: "reached_goal",
        summary: `Static BFS reached goal in ${step} steps without villain collision.`,
      };
    }

    // Smart obstacles move with non-overlapping position tracking
    const currentPositions = new Set(
      currentObstacles.map((o) => stateKey(o.r, o.c)),
    );
    currentObstacles = currentObstacles.map((obs) => {
      currentPositions.delete(stateKey(obs.r, obs.c));
      const moved = stepSmartObstacle(
        obs,
        nextPos,
        goal,
        gridSize,
        wallSet,
        currentPositions,
      );
      currentPositions.add(stateKey(moved.r, moved.c));
      return moved;
    });

    // Check if obstacle moved onto agent
    const caught = currentObstacles.find(
      (o) => o.r === nextPos[0] && o.c === nextPos[1],
    );
    if (caught) {
      return {
        path,
        success: false,
        stepsTaken: step,
        interceptedStep: step,
        interceptedBy: caught,
        reason: "intercepted_by_villain",
        summary: `${caught.strategy.toUpperCase()} villain intercepted static BFS agent at [${nextPos[0]}, ${nextPos[1]}] on step ${step}.`,
      };
    }
  }

  return {
    path,
    success: true,
    stepsTaken: path.length - 1,
    reason: "reached_goal",
    summary: `Static BFS reached goal in ${path.length - 1} steps.`,
  };
}
