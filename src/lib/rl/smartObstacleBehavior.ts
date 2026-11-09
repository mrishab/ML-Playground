import type { SmartObstacle, ObstacleStrategy } from "./types";
import { stateKey } from "./rlEngine";

export const STRATEGIES: {
  id: ObstacleStrategy;
  label: string;
  desc: string;
  badge: string;
}[] = [
  {
    id: "patrol",
    label: "Patrol",
    desc: "Sentry oscillates along corridor; forces timing & safe route learning",
    badge: "P",
  },
  {
    id: "chase",
    label: "Chase",
    desc: "Hunter pursues agent position; tests evasion and luring",
    badge: "C",
  },
  {
    id: "ambush",
    label: "Ambush",
    desc: "Interceptor blocks midpoint to goal; tests flanking maneuvers",
    badge: "A",
  },
  {
    id: "guard",
    label: "Guard",
    desc: "Sentinel defends goal perimeter; forces agent to sneak or flank around",
    badge: "G",
  },
  {
    id: "random",
    label: "Random",
    desc: "Unpredictable wanderer; tests stochastic dynamic hazard avoidance",
    badge: "R",
  },
];

export function stepSmartObstacle(
  obs: SmartObstacle,
  agentPos: [number, number],
  goalPos: [number, number],
  gridSize: number,
  staticWalls: Set<string>,
  occupiedPositions?: Set<string>,
): SmartObstacle {
  const { r, c, strategy } = obs;
  const patrolDir = obs.patrolDir ?? [0, 1];

  const isValid = (nr: number, nc: number) => {
    if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) return false;
    const key = stateKey(nr, nc);
    if (staticWalls.has(key)) return false;
    if (occupiedPositions?.has(key)) return false;
    // Do not block the goal tile permanently unless agent is currently there
    const isGoal = nr === goalPos[0] && nc === goalPos[1];
    const agentAtGoal =
      agentPos[0] === goalPos[0] && agentPos[1] === goalPos[1];
    if (isGoal && !agentAtGoal) return false;
    return true;
  };

  if (strategy === "patrol") {
    let [dr, dc] = patrolDir;
    let nr = r + dr;
    let nc = c + dc;
    if (isValid(nr, nc)) {
      return { ...obs, r: nr, c: nc, patrolDir: [dr, dc] };
    }
    // Bounce / reverse
    dr = -dr || 0;
    dc = -dc || 0;
    nr = r + dr;
    nc = c + dc;
    if (isValid(nr, nc)) {
      return { ...obs, r: nr, c: nc, patrolDir: [dr, dc] };
    }
    // Try perpendicular axis if trapped
    const perp: [number, number] = dr === 0 ? [1, 0] : [0, 1];
    if (isValid(r + perp[0], c + perp[1])) {
      return { ...obs, r: r + perp[0], c: c + perp[1], patrolDir: perp };
    }
    if (isValid(r - perp[0], c - perp[1])) {
      return {
        ...obs,
        r: r - perp[0],
        c: c - perp[1],
        patrolDir: [-perp[0], -perp[1]],
      };
    }
    return { ...obs, patrolDir: [dr, dc] };
  }

  if (strategy === "chase") {
    const dist = Math.abs(agentPos[0] - r) + Math.abs(agentPos[1] - c);
    // Detection vision radius <= 3 cells: hunter spots agent and pursues
    if (dist <= 3) {
      const dr = Math.sign(agentPos[0] - r);
      const dc = Math.sign(agentPos[1] - c);
      const rawCandidates: [number, number][] =
        Math.abs(agentPos[0] - r) >= Math.abs(agentPos[1] - c)
          ? [
              [r + dr, c],
              [r, c + dc],
            ]
          : [
              [r, c + dc],
              [r + dr, c],
            ];
      const candidates = rawCandidates.filter(
        ([nr, nc]) => nr !== r || nc !== c,
      );
      for (const [nr, nc] of candidates) {
        if (isValid(nr, nc)) {
          return { ...obs, r: nr, c: nc };
        }
      }
      // If primary moves are blocked, attempt perpendicular moves to detour around wall
      const perps: [number, number][] =
        Math.abs(agentPos[0] - r) >= Math.abs(agentPos[1] - c)
          ? [
              [r, c + 1],
              [r, c - 1],
            ]
          : [
              [r + 1, c],
              [r - 1, c],
            ];
      for (const [nr, nc] of perps) {
        if (isValid(nr, nc)) {
          return { ...obs, r: nr, c: nc };
        }
      }
    } else if (Math.random() < 0.3) {
      // Outside vision range: wander slowly in territory
      const moves: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
        .map(([dr, dc]): [number, number] => [r + dr, c + dc])
        .filter(([nr, nc]) => isValid(nr, nc));
      if (moves.length > 0) {
        const pick = moves[Math.floor(Math.random() * moves.length)];
        return { ...obs, r: pick[0], c: pick[1] };
      }
    }
    return obs;
  }

  if (strategy === "ambush") {
    const targetR = Math.round((agentPos[0] + goalPos[0]) / 2);
    const targetC = Math.round((agentPos[1] + goalPos[1]) / 2);
    const dr = Math.sign(targetR - r);
    const dc = Math.sign(targetC - c);
    const rawCandidates: [number, number][] =
      Math.abs(targetR - r) >= Math.abs(targetC - c)
        ? [
            [r + dr, c],
            [r, c + dc],
          ]
        : [
            [r, c + dc],
            [r + dr, c],
          ];
    const candidates = rawCandidates.filter(([nr, nc]) => nr !== r || nc !== c);
    for (const [nr, nc] of candidates) {
      if (isValid(nr, nc)) {
        return { ...obs, r: nr, c: nc };
      }
    }
    return obs;
  }

  if (strategy === "guard") {
    const distToGoal = Math.abs(goalPos[0] - r) + Math.abs(goalPos[1] - c);
    const distToAgent = Math.abs(agentPos[0] - r) + Math.abs(agentPos[1] - c);

    // Intercept if agent is directly adjacent to guard
    if (distToAgent <= 1) {
      const dr = Math.sign(agentPos[0] - r);
      const dc = Math.sign(agentPos[1] - c);
      const rawCandidates: [number, number][] =
        Math.abs(agentPos[0] - r) >= Math.abs(agentPos[1] - c)
          ? [
              [r + dr, c],
              [r, c + dc],
            ]
          : [
              [r, c + dc],
              [r + dr, c],
            ];
      const candidates = rawCandidates.filter(
        ([nr, nc]) => nr !== r || nc !== c,
      );
      for (const [nr, nc] of candidates) {
        if (isValid(nr, nc)) return { ...obs, r: nr, c: nc };
      }
    }

    // Guard perimeter of goal: stay within distance 1..2 of goal
    if (distToGoal > 2) {
      const dr = Math.sign(goalPos[0] - r);
      const dc = Math.sign(goalPos[1] - c);
      const rawCandidates: [number, number][] = [
        [r + dr, c],
        [r, c + dc],
      ];
      const candidates = rawCandidates.filter(
        ([nr, nc]) => nr !== r || nc !== c,
      );
      for (const [nr, nc] of candidates) {
        if (isValid(nr, nc)) return { ...obs, r: nr, c: nc };
      }
    } else {
      // Patrol perimeter cells (dist 1..2 of goal)
      const moves: [number, number][] = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]
        .map(([dr, dc]): [number, number] => [r + dr, c + dc])
        .filter(([nr, nc]) => {
          const d = Math.abs(goalPos[0] - nr) + Math.abs(goalPos[1] - nc);
          return d >= 1 && d <= 2 && isValid(nr, nc);
        });
      if (moves.length > 0 && Math.random() < 0.6) {
        const pick = moves[Math.floor(Math.random() * moves.length)];
        return { ...obs, r: pick[0], c: pick[1] };
      }
    }
    return obs;
  }

  if (strategy === "random") {
    const moves: [number, number][] = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]
      .map(([dr, dc]): [number, number] => [r + dr, c + dc])
      .filter(([nr, nc]) => isValid(nr, nc));

    if (moves.length > 0) {
      const pick = moves[Math.floor(Math.random() * moves.length)];
      return { ...obs, r: pick[0], c: pick[1] };
    }
  }

  return obs;
}
