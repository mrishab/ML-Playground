import { create } from "zustand";
import { RLEngine, type QTable } from "../lib/rl/rlEngine";
import type {
  RLEnvironmentRules,
  RLHyperparameters,
  SmartObstacle,
  ObstacleStrategy,
} from "../lib/rl/types";
import {
  simulateBFSAgainstObstacles,
  type BFSComparisonResult,
} from "../lib/rl/bfsSearch";

export type RLPresetName = "cliff" | "maze" | "simple" | "empty" | "smart";

export type RLStoreState = {
  gridSize: number;
  startPos: [number, number];
  agentPos: [number, number];
  goalPos: [number, number];
  hazards: [number, number][];
  obstacles: [number, number][];
  smartObstacles: SmartObstacle[];
  initialSmartObstacles: SmartObstacle[];
  activeStrategy: ObstacleStrategy;
  rules: RLEnvironmentRules;
  params: RLHyperparameters;
  qTable: QTable;
  totalEpisodes: number;
  rewardHistory: number[];
  stepsHistory: number[];
  successCount: number;
  isSimulating: boolean;
  showBFSPath: boolean;
  bfsResult: BFSComparisonResult;

  setGridSize: (size: number) => void;
  setRules: (rules: Partial<RLEnvironmentRules>) => void;
  setParams: (params: Partial<RLHyperparameters>) => void;
  setActiveStrategy: (strategy: ObstacleStrategy) => void;
  updateObstacleStrategy: (id: string, strategy: ObstacleStrategy) => void;
  removeSmartObstacle: (id: string) => void;
  toggleCell: (
    r: number,
    c: number,
    tool: "hazard" | "obstacle" | "goal" | "agent" | "smart-obstacle" | "clear",
  ) => void;
  trainEpisodes: (count: number) => void;
  stepSimulation: () => void;
  setSimulating: (simulating: boolean) => void;
  toggleShowBFSPath: () => void;
  resetQTable: () => void;
  resetEnvironment: () => void;
  loadPreset: (name: RLPresetName) => void;
};

const DEFAULT_RULES: RLEnvironmentRules = {
  gridSize: 5,
  stepReward: -1,
  goalReward: 50,
  hazardPenalty: -30,
  slipProbability: 0.05,
  hazardIsTerminal: false,
  smartObstaclePenalty: -40,
  smartObstacleIsTerminal: false,
};

const DEFAULT_PARAMS: RLHyperparameters = {
  learningRate: 0.2,
  discountFactor: 0.95,
  explorationRate: 0.2,
  algorithm: "q-learning",
};

const DEFAULT_HAZARDS: [number, number][] = [
  [1, 2],
  [2, 2],
  [3, 2],
];

const DEFAULT_OBSTACLES: [number, number][] = [
  [2, 1],
  [2, 3],
];

const DEFAULT_SMART_OBSTACLES: SmartObstacle[] = [
  {
    id: "default-patrol",
    r: 1,
    c: 1,
    strategy: "patrol",
    patrolDir: [1, 0],
  },
];

const STRATEGY_ORDER: ObstacleStrategy[] = [
  "patrol",
  "chase",
  "ambush",
  "guard",
  "random",
];

function buildEngine(state: {
  rules: RLEnvironmentRules;
  params: RLHyperparameters;
  startPos: [number, number];
  goalPos: [number, number];
  hazards: [number, number][];
  obstacles: [number, number][];
  smartObstacles: SmartObstacle[];
  qTable: QTable;
}): RLEngine {
  const engine = new RLEngine(
    state.rules,
    state.params,
    state.startPos,
    state.goalPos,
    state.hazards,
    state.obstacles,
    state.smartObstacles,
  );
  const clonedQ: QTable = {};
  for (const k of Object.keys(state.qTable)) {
    clonedQ[k] = [...state.qTable[k]];
  }
  engine.qTable = clonedQ;
  return engine;
}

export const useRLStore = create<RLStoreState>((set, get) => {
  const initialEngine = new RLEngine(
    DEFAULT_RULES,
    DEFAULT_PARAMS,
    [0, 0],
    [4, 4],
    DEFAULT_HAZARDS,
    DEFAULT_OBSTACLES,
    DEFAULT_SMART_OBSTACLES,
  );

  const initialBFS = simulateBFSAgainstObstacles(
    5,
    [0, 0],
    [4, 4],
    DEFAULT_OBSTACLES,
    DEFAULT_SMART_OBSTACLES,
  );

  return {
    gridSize: 5,
    startPos: [0, 0],
    agentPos: [0, 0],
    goalPos: [4, 4],
    hazards: DEFAULT_HAZARDS,
    obstacles: DEFAULT_OBSTACLES,
    smartObstacles: DEFAULT_SMART_OBSTACLES.map((o) => ({ ...o })),
    initialSmartObstacles: DEFAULT_SMART_OBSTACLES.map((o) => ({ ...o })),
    activeStrategy: "patrol",
    rules: DEFAULT_RULES,
    params: DEFAULT_PARAMS,
    qTable: initialEngine.qTable,
    totalEpisodes: 0,
    rewardHistory: [],
    stepsHistory: [],
    successCount: 0,
    isSimulating: false,
    showBFSPath: false,
    bfsResult: initialBFS,

    setActiveStrategy: (activeStrategy) => set({ activeStrategy }),

    setSimulating: (isSimulating) => set({ isSimulating }),

    toggleShowBFSPath: () => set((s) => ({ showBFSPath: !s.showBFSPath })),

    updateObstacleStrategy: (id, strategy) => {
      const s = get();
      const updatedSmart = s.smartObstacles.map((o) =>
        o.id === id ? { ...o, strategy } : o,
      );
      const updatedInit = s.initialSmartObstacles.map((o) =>
        o.id === id ? { ...o, strategy } : o,
      );
      const bfsResult = simulateBFSAgainstObstacles(
        s.gridSize,
        s.startPos,
        s.goalPos,
        s.obstacles,
        updatedInit,
      );
      set({
        smartObstacles: updatedSmart,
        initialSmartObstacles: updatedInit,
        bfsResult,
      });
    },

    removeSmartObstacle: (id) => {
      const s = get();
      const filtered = s.initialSmartObstacles.filter((o) => o.id !== id);
      const bfsResult = simulateBFSAgainstObstacles(
        s.gridSize,
        s.startPos,
        s.goalPos,
        s.obstacles,
        filtered,
      );
      set({
        smartObstacles: s.smartObstacles.filter((o) => o.id !== id),
        initialSmartObstacles: filtered,
        bfsResult,
      });
    },

    setGridSize: (gridSize) => {
      const newGoal: [number, number] = [gridSize - 1, gridSize - 1];
      const bfsResult = simulateBFSAgainstObstacles(
        gridSize,
        [0, 0],
        newGoal,
        [],
        [],
      );
      set({
        gridSize,
        rules: { ...get().rules, gridSize },
        startPos: [0, 0],
        agentPos: [0, 0],
        goalPos: newGoal,
        hazards: [],
        obstacles: [],
        smartObstacles: [],
        initialSmartObstacles: [],
        bfsResult,
      });
      get().resetQTable();
    },

    setRules: (patch) => {
      set((s) => ({ rules: { ...s.rules, ...patch } }));
    },

    setParams: (patch) => {
      set((s) => ({ params: { ...s.params, ...patch } }));
    },

    toggleCell: (r, c, tool) => {
      const s = get();
      if (tool === "agent") {
        const bfsResult = simulateBFSAgainstObstacles(
          s.gridSize,
          [r, c],
          s.goalPos,
          s.obstacles,
          s.initialSmartObstacles,
        );
        set({
          startPos: [r, c],
          agentPos: [r, c],
          smartObstacles: s.initialSmartObstacles.map((o) => ({ ...o })),
          bfsResult,
        });
        return;
      }
      if (tool === "goal") {
        const bfsResult = simulateBFSAgainstObstacles(
          s.gridSize,
          s.startPos,
          [r, c],
          s.obstacles,
          s.initialSmartObstacles,
        );
        set({
          goalPos: [r, c],
          agentPos: [...s.startPos],
          smartObstacles: s.initialSmartObstacles.map((o) => ({ ...o })),
          bfsResult,
        });
        return;
      }

      if (
        (r === s.startPos[0] && c === s.startPos[1]) ||
        (r === s.goalPos[0] && c === s.goalPos[1])
      ) {
        return;
      }

      const filterOut = (list: [number, number][]) =>
        list.filter(([rr, cc]) => rr !== r || cc !== c);

      let hazards = filterOut(s.hazards);
      let obstacles = filterOut(s.obstacles);
      let initialSmartObs = s.initialSmartObstacles.filter(
        (o) => o.r !== r || o.c !== c,
      );

      if (tool === "hazard") {
        hazards = [...hazards, [r, c]];
      } else if (tool === "obstacle") {
        obstacles = [...obstacles, [r, c]];
      } else if (tool === "smart-obstacle") {
        const existing = s.initialSmartObstacles.find(
          (o) => o.r === r && o.c === c,
        );
        if (existing) {
          const currIdx = STRATEGY_ORDER.indexOf(existing.strategy);
          const nextStrategy =
            STRATEGY_ORDER[(currIdx + 1) % STRATEGY_ORDER.length];
          const updated = { ...existing, strategy: nextStrategy };
          initialSmartObs = [...initialSmartObs, updated];
        } else {
          const newObs: SmartObstacle = {
            id: `smart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            r,
            c,
            strategy: s.activeStrategy,
            patrolDir: [0, 1],
          };
          initialSmartObs = [...initialSmartObs, newObs];
        }
      }

      const bfsResult = simulateBFSAgainstObstacles(
        s.gridSize,
        s.startPos,
        s.goalPos,
        obstacles,
        initialSmartObs,
      );

      set({
        hazards,
        obstacles,
        smartObstacles: initialSmartObs.map((o) => ({ ...o })),
        initialSmartObstacles: initialSmartObs,
        agentPos: [...s.startPos],
        bfsResult,
      });
    },

    trainEpisodes: (count) => {
      const s = get();
      const engine = buildEngine({
        ...s,
        smartObstacles: s.initialSmartObstacles,
      });
      const results = engine.trainBatch(count);

      const newRewards = results.map((r) => r.totalReward);
      const newSteps = results.map((r) => r.steps);
      const successes = results.filter((r) => r.reachedGoal).length;

      set({
        qTable: engine.qTable,
        totalEpisodes: s.totalEpisodes + count,
        rewardHistory: [...s.rewardHistory, ...newRewards].slice(-100),
        stepsHistory: [...s.stepsHistory, ...newSteps].slice(-100),
        successCount: s.successCount + successes,
        smartObstacles: s.initialSmartObstacles.map((o) => ({ ...o })),
        agentPos: [...s.startPos],
      });
    },

    stepSimulation: () => {
      const s = get();
      const [r, c] = s.agentPos;
      const isAtGoal = r === s.goalPos[0] && c === s.goalPos[1];
      const isAtTerminalHazard =
        s.rules.hazardIsTerminal &&
        s.hazards.some(([hr, hc]) => hr === r && hc === c);
      const isAtTerminalObs =
        (s.rules.smartObstacleIsTerminal ?? true) &&
        s.smartObstacles.some((o) => o.r === r && o.c === c);

      if (isAtGoal || isAtTerminalHazard || isAtTerminalObs) {
        set({
          agentPos: [...s.startPos],
          smartObstacles: s.initialSmartObstacles.map((o) => ({ ...o })),
        });
        return;
      }

      const engine = buildEngine(s);
      const bestAction = engine.getBestAction(r, c);
      const { nextPos } = engine.step(r, c, bestAction);
      set({
        agentPos: nextPos,
        smartObstacles: engine.smartObstacles,
      });
    },

    resetQTable: () => {
      const s = get();
      const engine = new RLEngine(
        s.rules,
        s.params,
        s.startPos,
        s.goalPos,
        s.hazards,
        s.obstacles,
        s.initialSmartObstacles,
      );
      set({
        qTable: engine.qTable,
        totalEpisodes: 0,
        rewardHistory: [],
        stepsHistory: [],
        successCount: 0,
        agentPos: [...s.startPos],
        smartObstacles: s.initialSmartObstacles.map((o) => ({ ...o })),
        isSimulating: false,
      });
    },

    resetEnvironment: () => {
      const g = get().gridSize;
      const bfsResult = simulateBFSAgainstObstacles(
        g,
        [0, 0],
        [g - 1, g - 1],
        [],
        [],
      );
      set({
        hazards: [],
        obstacles: [],
        smartObstacles: [],
        initialSmartObstacles: [],
        startPos: [0, 0],
        agentPos: [0, 0],
        goalPos: [g - 1, g - 1],
        bfsResult,
        isSimulating: false,
      });
      get().resetQTable();
    },

    loadPreset: (name) => {
      const size = 5;
      let startPos: [number, number] = [0, 0];
      let goalPos: [number, number] = [4, 4];
      let hazards: [number, number][] = [];
      let obstacles: [number, number][] = [];
      let smartObs: SmartObstacle[] = [];
      let rules = { ...get().rules };

      if (name === "cliff") {
        startPos = [4, 0];
        goalPos = [4, 4];
        hazards = [
          [4, 1],
          [4, 2],
          [4, 3],
        ];
        rules = {
          ...rules,
          hazardPenalty: -100,
          stepReward: -1,
          hazardIsTerminal: true,
        };
      } else if (name === "maze") {
        hazards = [[2, 2]];
        obstacles = [
          [1, 1],
          [2, 1],
          [3, 1],
          [1, 3],
          [2, 3],
          [3, 3],
        ];
        rules = {
          ...rules,
          hazardPenalty: -40,
          stepReward: -1,
          hazardIsTerminal: false,
        };
      } else if (name === "smart") {
        smartObs = [
          {
            id: "preset-patrol",
            r: 2,
            c: 2,
            strategy: "patrol",
            patrolDir: [0, 1],
          },
          {
            id: "preset-chase",
            r: 4,
            c: 1,
            strategy: "chase",
          },
          {
            id: "preset-guard",
            r: 3,
            c: 3,
            strategy: "guard",
          },
        ];
        hazards = [[1, 0]];
        obstacles = [
          [1, 2],
          [3, 2],
        ];
        rules = {
          ...DEFAULT_RULES,
          smartObstaclePenalty: -40,
          smartObstacleIsTerminal: false,
        };
      } else if (name === "simple") {
        hazards = DEFAULT_HAZARDS;
        obstacles = DEFAULT_OBSTACLES;
        smartObs = DEFAULT_SMART_OBSTACLES.map((o) => ({ ...o }));
        rules = DEFAULT_RULES;
      } else {
        rules = {
          ...DEFAULT_RULES,
          slipProbability: 0,
          hazardIsTerminal: false,
        };
      }

      const bfsResult = simulateBFSAgainstObstacles(
        size,
        startPos,
        goalPos,
        obstacles,
        smartObs,
      );

      set({
        gridSize: size,
        startPos,
        agentPos: [...startPos],
        goalPos,
        hazards,
        obstacles,
        smartObstacles: smartObs.map((o) => ({ ...o })),
        initialSmartObstacles: smartObs.map((o) => ({ ...o })),
        rules,
        bfsResult,
        isSimulating: false,
      });

      get().resetQTable();
    },
  };
});
