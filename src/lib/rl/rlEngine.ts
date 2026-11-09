import {
  type Action,
  type RLEnvironmentRules,
  type RLHyperparameters,
  type EpisodeResult,
  type SmartObstacle,
  ACTION_DELTAS,
} from "./types";
import { stepSmartObstacle } from "./smartObstacleBehavior";

export type QTable = Record<string, [number, number, number, number]>;

export function stateKey(r: number, c: number): string {
  return `${r},${c}`;
}

export function parseStateKey(key: string): [number, number] {
  const parts = key.split(",");
  return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
}

export class RLEngine {
  rules: RLEnvironmentRules;
  params: RLHyperparameters;
  startPos: [number, number];
  goalPos: [number, number];
  hazards: Set<string>;
  obstacles: Set<string>;
  initialSmartObstacles: SmartObstacle[];
  smartObstacles: SmartObstacle[];
  qTable: QTable = {};

  constructor(
    rules: RLEnvironmentRules,
    params: RLHyperparameters,
    startPos: [number, number] = [0, 0],
    goalPos?: [number, number],
    hazards: [number, number][] = [],
    obstacles: [number, number][] = [],
    smartObstacles: SmartObstacle[] = [],
  ) {
    this.rules = rules;
    this.params = params;
    this.startPos = startPos;
    this.goalPos = goalPos || [rules.gridSize - 1, rules.gridSize - 1];
    this.hazards = new Set(hazards.map(([r, c]) => stateKey(r, c)));
    this.obstacles = new Set(obstacles.map(([r, c]) => stateKey(r, c)));
    this.initialSmartObstacles = smartObstacles.map((o) => ({ ...o }));
    this.smartObstacles = smartObstacles.map((o) => ({ ...o }));
    this.initQTable();
  }

  initQTable(): void {
    this.qTable = {};
    for (let r = 0; r < this.rules.gridSize; r++) {
      for (let c = 0; c < this.rules.gridSize; c++) {
        this.qTable[stateKey(r, c)] = [0, 0, 0, 0];
      }
    }
  }

  getQValues(r: number, c: number): [number, number, number, number] {
    const key = stateKey(r, c);
    if (!this.qTable[key]) {
      this.qTable[key] = [0, 0, 0, 0];
    }
    return this.qTable[key];
  }

  getBestAction(r: number, c: number): Action {
    const q = this.getQValues(r, c);
    let maxQ = -Infinity;
    for (let a = 0; a < 4; a++) {
      if (q[a] > maxQ) {
        maxQ = q[a];
      }
    }
    const candidates: Action[] = [];
    for (let a = 0; a < 4; a++) {
      if (Math.abs(q[a] - maxQ) < 1e-6) {
        candidates.push(a as Action);
      }
    }
    if (candidates.length === 1) return candidates[0];
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  chooseAction(r: number, c: number, epsilonOverride?: number): Action {
    const eps = epsilonOverride ?? this.params.explorationRate;
    if (Math.random() < eps) {
      return Math.floor(Math.random() * 4) as Action;
    }
    return this.getBestAction(r, c);
  }

  step(
    r: number,
    c: number,
    action: Action,
  ): {
    nextPos: [number, number];
    reward: number;
    isTerminal: boolean;
    caughtByObstacle: boolean;
  } {
    let effectiveAction = action;
    if (Math.random() < this.rules.slipProbability) {
      const slipOffset = Math.random() < 0.5 ? 1 : 3;
      effectiveAction = ((action + slipOffset) % 4) as Action;
    }

    const [dr, dc] = ACTION_DELTAS[effectiveAction];
    let nextR = Math.max(0, Math.min(this.rules.gridSize - 1, r + dr));
    let nextC = Math.max(0, Math.min(this.rules.gridSize - 1, c + dc));

    const candidateKey = stateKey(nextR, nextC);
    if (this.obstacles.has(candidateKey)) {
      nextR = r;
      nextC = c;
    }

    const penalty = this.rules.smartObstaclePenalty ?? -40;
    const isObstacleTerminal = this.rules.smartObstacleIsTerminal ?? false;

    // Helper to step all smart obstacles with mutual non-overlapping tracking
    const advanceObstacles = (targetAgentPos: [number, number]) => {
      const currentPositions = new Set(
        this.smartObstacles.map((o) => stateKey(o.r, o.c)),
      );
      this.smartObstacles = this.smartObstacles.map((obs) => {
        currentPositions.delete(stateKey(obs.r, obs.c));
        const moved = stepSmartObstacle(
          obs,
          targetAgentPos,
          this.goalPos,
          this.rules.gridSize,
          this.obstacles,
          currentPositions,
        );
        currentPositions.add(stateKey(moved.r, moved.c));
        return moved;
      });
    };

    // Check collision with smart obstacle at its current position
    const hitCurrentObs = this.smartObstacles.some(
      (o) => o.r === nextR && o.c === nextC,
    );
    if (hitCurrentObs) {
      if (isObstacleTerminal) {
        return {
          nextPos: [nextR, nextC],
          reward: penalty,
          isTerminal: true,
          caughtByObstacle: true,
        };
      }
      advanceObstacles([nextR, nextC]);
      return {
        nextPos: [nextR, nextC],
        reward: penalty,
        isTerminal: false,
        caughtByObstacle: true,
      };
    }

    const isGoal = nextR === this.goalPos[0] && nextC === this.goalPos[1];
    if (isGoal) {
      return {
        nextPos: [nextR, nextC],
        reward: this.rules.goalReward,
        isTerminal: true,
        caughtByObstacle: false,
      };
    }

    // Move smart obstacles
    advanceObstacles([nextR, nextC]);

    // Check if smart obstacle moved onto agent
    const caughtAfterMove = this.smartObstacles.some(
      (o) => o.r === nextR && o.c === nextC,
    );
    if (caughtAfterMove) {
      return {
        nextPos: [nextR, nextC],
        reward: penalty,
        isTerminal: isObstacleTerminal,
        caughtByObstacle: true,
      };
    }

    const actualNextKey = stateKey(nextR, nextC);
    const isHazard = this.hazards.has(actualNextKey);

    let reward = this.rules.stepReward;
    let isTerminal = false;

    if (isHazard) {
      reward = this.rules.hazardPenalty;
      if (this.rules.hazardIsTerminal) {
        isTerminal = true;
      }
    }

    return {
      nextPos: [nextR, nextC],
      reward,
      isTerminal,
      caughtByObstacle: false,
    };
  }

  runEpisode(maxSteps: number = 100): EpisodeResult {
    let currPos = [...this.startPos] as [number, number];
    let totalReward = 0;
    let steps = 0;
    let reachedGoal = false;
    let caughtByObstacle = false;

    // Reset smart obstacles to initial positions at start of episode
    this.smartObstacles = this.initialSmartObstacles.map((o) => ({ ...o }));

    if (currPos[0] === this.goalPos[0] && currPos[1] === this.goalPos[1]) {
      return {
        episode: 0,
        totalReward: this.rules.goalReward,
        steps: 0,
        reachedGoal: true,
        caughtByObstacle: false,
      };
    }

    let action = this.chooseAction(currPos[0], currPos[1]);

    while (steps < maxSteps) {
      steps++;
      const [r, c] = currPos;
      const key = stateKey(r, c);
      const stepRes = this.step(r, c, action);
      const { nextPos, reward, isTerminal } = stepRes;
      if (stepRes.caughtByObstacle) {
        caughtByObstacle = true;
      }
      totalReward += reward;

      const [nextR, nextC] = nextPos;
      const nextAction = this.chooseAction(nextR, nextC);

      const q = this.getQValues(r, c);
      const alpha = this.params.learningRate;
      const gamma = this.params.discountFactor;

      if (this.params.algorithm === "q-learning") {
        const nextQ = this.getQValues(nextR, nextC);
        const maxNextQ = isTerminal ? 0 : Math.max(...nextQ);
        q[action] += alpha * (reward + gamma * maxNextQ - q[action]);
      } else {
        const nextQ = this.getQValues(nextR, nextC);
        const expectedNext = isTerminal ? 0 : nextQ[nextAction];
        q[action] += alpha * (reward + gamma * expectedNext - q[action]);
      }

      this.qTable[key] = q;

      if (
        nextR === this.goalPos[0] &&
        nextC === this.goalPos[1] &&
        !stepRes.caughtByObstacle
      ) {
        reachedGoal = true;
      }

      if (isTerminal) break;

      currPos = nextPos;
      action = nextAction;
    }

    return {
      episode: 0,
      totalReward,
      steps,
      reachedGoal,
      caughtByObstacle,
    };
  }

  trainBatch(episodes: number, maxSteps: number = 100): EpisodeResult[] {
    const results: EpisodeResult[] = [];
    for (let e = 1; e <= episodes; e++) {
      const res = this.runEpisode(maxSteps);
      res.episode = e;
      results.push(res);
    }
    return results;
  }
}
