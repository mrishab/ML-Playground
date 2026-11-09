export type Action = 0 | 1 | 2 | 3; // 0: Up, 1: Right, 2: Down, 3: Left
export const ACTION_NAMES: Record<Action, string> = {
  0: "Up",
  1: "Right",
  2: "Down",
  3: "Left",
};

export const ACTION_DELTAS: Record<Action, [number, number]> = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};

export type ObstacleStrategy =
  | "patrol"
  | "chase"
  | "ambush"
  | "guard"
  | "random";

export type SmartObstacle = {
  id: string;
  r: number;
  c: number;
  strategy: ObstacleStrategy;
  patrolDir?: [number, number];
};

export type CellType =
  | "empty"
  | "start"
  | "goal"
  | "hazard"
  | "obstacle"
  | "smart-obstacle";

export type RLEnvironmentRules = {
  gridSize: number;
  stepReward: number;
  goalReward: number;
  hazardPenalty: number;
  slipProbability: number;
  hazardIsTerminal: boolean;
  smartObstaclePenalty?: number;
  smartObstacleIsTerminal?: boolean;
};

export type RLHyperparameters = {
  learningRate: number; // alpha
  discountFactor: number; // gamma
  explorationRate: number; // epsilon
  algorithm: "q-learning" | "sarsa";
};

export type EpisodeResult = {
  episode: number;
  totalReward: number;
  steps: number;
  reachedGoal: boolean;
  caughtByObstacle?: boolean;
};
