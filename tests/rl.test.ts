import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { RLEngine, stateKey } from "../src/lib/rl/rlEngine.ts";
import {
  stepSmartObstacle,
  STRATEGIES,
} from "../src/lib/rl/smartObstacleBehavior.ts";
import {
  findBFSPath,
  simulateBFSAgainstObstacles,
} from "../src/lib/rl/bfsSearch.ts";
import type {
  SmartObstacle,
  RLEnvironmentRules,
  RLHyperparameters,
} from "../src/lib/rl/types.ts";

const BASE_RULES: RLEnvironmentRules = {
  gridSize: 5,
  stepReward: -1,
  goalReward: 50,
  hazardPenalty: -30,
  slipProbability: 0,
  hazardIsTerminal: false,
  smartObstaclePenalty: -40,
  smartObstacleIsTerminal: true,
};

const BASE_PARAMS: RLHyperparameters = {
  learningRate: 0.2,
  discountFactor: 0.95,
  explorationRate: 0.1,
  algorithm: "q-learning",
};

describe("Smart Obstacle Strategies", () => {
  it("should have all 5 expected strategies defined with metadata", () => {
    const ids = STRATEGIES.map((s) => s.id);
    assert.deepEqual(ids, ["patrol", "chase", "ambush", "guard", "random"]);
    for (const s of STRATEGIES) {
      assert.ok(s.label.length > 0);
      assert.ok(s.desc.length > 0);
      assert.ok(s.badge.length === 1);
    }
  });

  describe("Patrol Strategy", () => {
    it("should step in patrolDir when cell is valid", () => {
      const obs: SmartObstacle = {
        id: "p1",
        r: 1,
        c: 1,
        strategy: "patrol",
        patrolDir: [0, 1],
      };
      const moved = stepSmartObstacle(obs, [0, 0], [4, 4], 5, new Set());
      assert.equal(moved.r, 1);
      assert.equal(moved.c, 2);
      assert.deepEqual(moved.patrolDir, [0, 1]);
    });

    it("should reverse direction when hitting grid boundary", () => {
      const obs: SmartObstacle = {
        id: "p2",
        r: 1,
        c: 4,
        strategy: "patrol",
        patrolDir: [0, 1],
      };
      const moved = stepSmartObstacle(obs, [0, 0], [4, 4], 5, new Set());
      assert.equal(moved.r, 1);
      assert.equal(moved.c, 3);
      assert.deepEqual(moved.patrolDir, [0, -1]);
    });

    it("should reverse direction when hitting a static wall", () => {
      const walls = new Set([stateKey(1, 2)]);
      const obs: SmartObstacle = {
        id: "p3",
        r: 1,
        c: 1,
        strategy: "patrol",
        patrolDir: [0, 1],
      };
      const moved = stepSmartObstacle(obs, [0, 0], [4, 4], 5, walls);
      assert.equal(moved.r, 1);
      assert.equal(moved.c, 0);
      assert.deepEqual(moved.patrolDir, [0, -1]);
    });

    it("should attempt perpendicular move if trapped in both directions", () => {
      const walls = new Set([stateKey(1, 0), stateKey(1, 2)]);
      const obs: SmartObstacle = {
        id: "p4",
        r: 1,
        c: 1,
        strategy: "patrol",
        patrolDir: [0, 1],
      };
      const moved = stepSmartObstacle(obs, [0, 0], [4, 4], 5, walls);
      // Moves perpendicular: row 2 or row 0
      assert.ok(moved.r === 2 || moved.r === 0);
      assert.equal(moved.c, 1);
    });
  });

  describe("Chase Strategy", () => {
    it("should pursue agent coordinates along closest delta", () => {
      const obs: SmartObstacle = {
        id: "c1",
        r: 3,
        c: 1,
        strategy: "chase",
      };
      // Agent is at [1, 1], so dr = -1, dc = 0
      const moved = stepSmartObstacle(obs, [1, 1], [4, 4], 5, new Set());
      assert.equal(moved.r, 2);
      assert.equal(moved.c, 1);
    });

    it("should navigate around obstacles when primary move is blocked", () => {
      const walls = new Set([stateKey(2, 1)]); // Wall blocks straight up
      const obs: SmartObstacle = {
        id: "c2",
        r: 3,
        c: 1,
        strategy: "chase",
      };
      // Agent is at [1, 1], but [2, 1] is a wall. Chase should detour perpendicular
      const moved = stepSmartObstacle(obs, [1, 1], [4, 4], 5, walls);
      assert.ok(moved.c === 2 || moved.c === 0);
      assert.equal(moved.r, 3);
    });
  });

  describe("Ambush Strategy", () => {
    it("should move towards midpoint between agent and goal", () => {
      // Agent at [0, 0], Goal at [4, 4] -> Midpoint is [2, 2]
      const obs: SmartObstacle = {
        id: "a1",
        r: 0,
        c: 2,
        strategy: "ambush",
      };
      const moved = stepSmartObstacle(obs, [0, 0], [4, 4], 5, new Set());
      assert.equal(moved.r, 1);
      assert.equal(moved.c, 2);
    });
  });

  describe("Guard Strategy", () => {
    it("should defend perimeter within distance 1-2 of goal", () => {
      // Goal at [4, 4]. Guard at [1, 1]. Agent at [0, 0].
      // Guard should head towards goal perimeter.
      const obs: SmartObstacle = {
        id: "g1",
        r: 1,
        c: 1,
        strategy: "guard",
      };
      const moved = stepSmartObstacle(obs, [0, 0], [4, 4], 5, new Set());
      const oldDist = Math.abs(4 - 1) + Math.abs(4 - 1);
      const newDist = Math.abs(4 - moved.r) + Math.abs(4 - moved.c);
      assert.ok(newDist < oldDist);
    });

    it("should intercept agent when agent comes within 2 tiles of guard", () => {
      const obs: SmartObstacle = {
        id: "g2",
        r: 4,
        c: 3,
        strategy: "guard",
      };
      // Agent approaches at [3, 3] (distance = 1)
      const moved = stepSmartObstacle(obs, [3, 3], [4, 4], 5, new Set());
      assert.equal(moved.r, 3);
      assert.equal(moved.c, 3);
    });
  });

  describe("Random Strategy", () => {
    it("should always produce a valid adjacent move or stay if enclosed", () => {
      const obs: SmartObstacle = {
        id: "r1",
        r: 2,
        c: 2,
        strategy: "random",
      };
      const moved = stepSmartObstacle(obs, [0, 0], [4, 4], 5, new Set());
      const manhattan = Math.abs(moved.r - 2) + Math.abs(moved.c - 2);
      assert.ok(manhattan === 1 || manhattan === 0);
      assert.ok(moved.r >= 0 && moved.r < 5);
      assert.ok(moved.c >= 0 && moved.c < 5);
    });
  });
});

describe("BFS Path Finder and Simulation against Obstacles", () => {
  it("should find the shortest static path avoiding static walls", () => {
    const walls: [number, number][] = [
      [1, 1],
      [2, 1],
      [3, 1],
    ];
    const path = findBFSPath(5, [0, 0], [4, 4], walls);
    assert.ok(path.length > 0);
    assert.deepEqual(path[0], [0, 0]);
    assert.deepEqual(path[path.length - 1], [4, 4]);
    // Ensure no path step touches walls
    for (const [r, c] of path) {
      assert.ok(!walls.some(([wr, wc]) => wr === r && wc === c));
    }
  });

  it("should return empty array if goal is unreachable", () => {
    // Completely enclose start
    const walls: [number, number][] = [
      [0, 1],
      [1, 0],
    ];
    const path = findBFSPath(5, [0, 0], [4, 4], walls);
    assert.equal(path.length, 0);
  });

  it("should detect interception by patrol sentry along static path", () => {
    // Place patrol obstacle directly in the corridor where static BFS walks
    const patrolObs: SmartObstacle[] = [
      {
        id: "sentry",
        r: 0,
        c: 2,
        strategy: "patrol",
        patrolDir: [0, -1],
      },
    ];
    const res = simulateBFSAgainstObstacles(5, [0, 0], [4, 4], [], patrolObs);
    assert.equal(res.success, false);
    assert.equal(res.reason, "intercepted_by_villain");
    assert.ok(res.interceptedStep! > 0);
    assert.ok(res.summary.includes("villain"));
  });
});

describe("RL Engine with Smart Obstacles", () => {
  it("should initialize Q-table with 0s for all grid cells", () => {
    const engine = new RLEngine(BASE_RULES, BASE_PARAMS);
    const q = engine.getQValues(0, 0);
    assert.deepEqual(q, [0, 0, 0, 0]);
    assert.equal(Object.keys(engine.qTable).length, 25);
  });

  it("should detect collision when agent steps into smart obstacle", () => {
    const smartObs: SmartObstacle[] = [
      { id: "o1", r: 0, c: 1, strategy: "patrol", patrolDir: [0, 1] },
    ];
    const engine = new RLEngine(
      BASE_RULES,
      BASE_PARAMS,
      [0, 0],
      [4, 4],
      [],
      [],
      smartObs,
    );
    // Action 1: Right -> steps to [0, 1] where obstacle currently is
    const res = engine.step(0, 0, 1);
    assert.equal(res.caughtByObstacle, true);
    assert.equal(res.reward, BASE_RULES.smartObstaclePenalty);
    assert.equal(res.isTerminal, true);
  });

  it("should detect collision when obstacle moves onto agent", () => {
    // Obstacle at [0, 2] with chase strategy, agent steps to [0, 1]
    const smartObs: SmartObstacle[] = [
      { id: "o2", r: 0, c: 2, strategy: "chase" },
    ];
    const engine = new RLEngine(
      BASE_RULES,
      BASE_PARAMS,
      [0, 0],
      [4, 4],
      [],
      [],
      smartObs,
    );
    // Step to [0, 1]
    const res = engine.step(0, 0, 1);
    assert.equal(res.caughtByObstacle, true);
    assert.equal(res.reward, BASE_RULES.smartObstaclePenalty);
  });

  it("should successfully run episode and return valid EpisodeResult", () => {
    const smartObs: SmartObstacle[] = [
      { id: "p1", r: 2, c: 2, strategy: "patrol", patrolDir: [0, 1] },
    ];
    const engine = new RLEngine(
      BASE_RULES,
      BASE_PARAMS,
      [0, 0],
      [4, 4],
      [],
      [],
      smartObs,
    );
    const ep = engine.runEpisode(50);
    assert.ok(ep.steps >= 1 && ep.steps <= 50);
    assert.ok(typeof ep.totalReward === "number");
    assert.ok(typeof ep.reachedGoal === "boolean");
  });

  it("should train batch and update Q-table values", () => {
    const smartObs: SmartObstacle[] = [
      { id: "p1", r: 2, c: 2, strategy: "patrol", patrolDir: [0, 1] },
    ];
    const engine = new RLEngine(
      BASE_RULES,
      BASE_PARAMS,
      [0, 0],
      [4, 4],
      [],
      [],
      smartObs,
    );
    const results = engine.trainBatch(100, 50);
    assert.equal(results.length, 100);

    // After 100 episodes, Q-table should have non-zero updates
    const hasNonZero = Object.values(engine.qTable).some((q) =>
      q.some((val) => val !== 0),
    );
    assert.ok(hasNonZero);
  });

  it("SARSA algorithm should update Q-table properly", () => {
    const sarsaParams: RLHyperparameters = {
      ...BASE_PARAMS,
      algorithm: "sarsa",
    };
    const engine = new RLEngine(
      BASE_RULES,
      sarsaParams,
      [0, 0],
      [4, 4],
      [],
      [],
      [],
    );
    const results = engine.trainBatch(30, 40);
    assert.equal(results.length, 30);
    const hasNonZero = Object.values(engine.qTable).some((q) =>
      q.some((val) => val !== 0),
    );
    assert.ok(hasNonZero);
  });

  it("should handle multiple simultaneous smart obstacles without crashing", () => {
    const multipleObs: SmartObstacle[] = [
      { id: "o1", r: 1, c: 1, strategy: "patrol", patrolDir: [0, 1] },
      { id: "o2", r: 2, c: 2, strategy: "chase" },
      { id: "o3", r: 3, c: 3, strategy: "ambush" },
      { id: "o4", r: 4, c: 3, strategy: "guard" },
      { id: "o5", r: 0, c: 4, strategy: "random" },
    ];
    const engine = new RLEngine(
      BASE_RULES,
      BASE_PARAMS,
      [0, 0],
      [4, 4],
      [],
      [],
      multipleObs,
    );
    const ep = engine.runEpisode(30);
    assert.ok(ep.steps >= 1);
    assert.equal(engine.smartObstacles.length, 5);
  });

  it("should break ties uniformly at random in getBestAction", () => {
    const engine = new RLEngine(BASE_RULES, BASE_PARAMS);
    const chosenCounts = [0, 0, 0, 0];
    for (let i = 0; i < 200; i++) {
      const a = engine.getBestAction(0, 0);
      chosenCounts[a]++;
    }
    // All 4 actions must be chosen at least once on ties, proving unbiased exploration
    for (let a = 0; a < 4; a++) {
      assert.ok(chosenCounts[a] > 5, `Action ${a} was only chosen ${chosenCounts[a]} times`);
    }
  });

  it("should prevent smart obstacles from overlapping each other during advance", () => {
    // Place two obstacles adjacent to each other
    const obsA: SmartObstacle = { id: "a", r: 1, c: 1, strategy: "random" };
    const obsB: SmartObstacle = { id: "b", r: 1, c: 2, strategy: "random" };
    const engine = new RLEngine(
      BASE_RULES,
      BASE_PARAMS,
      [0, 0],
      [4, 4],
      [],
      [],
      [obsA, obsB],
    );
    for (let step = 0; step < 50; step++) {
      engine.step(0, 0, 0);
      const [first, second] = engine.smartObstacles;
      assert.ok(
        first.r !== second.r || first.c !== second.c,
        `Obstacles overlapped at [${first.r}, ${first.c}] on step ${step}`,
      );
    }
  });

  it("should continue obstacle stepping when non-terminal collision occurs", () => {
    const nonTerminalRules: RLEnvironmentRules = {
      ...BASE_RULES,
      smartObstacleIsTerminal: false,
    };
    const obs: SmartObstacle = {
      id: "p1",
      r: 0,
      c: 1,
      strategy: "patrol",
      patrolDir: [0, 1],
    };
    const engine = new RLEngine(
      nonTerminalRules,
      BASE_PARAMS,
      [0, 0],
      [4, 4],
      [],
      [],
      [obs],
    );
    // Agent steps into [0, 1] where obstacle is
    const res = engine.step(0, 0, 1);
    assert.equal(res.caughtByObstacle, true);
    assert.equal(res.isTerminal, false);
    // Smart obstacle should have stepped (moved to [0, 2] or bounced)
    assert.ok(engine.smartObstacles[0].c !== 1 || engine.smartObstacles[0].r !== 0);
  });

  it("should correctly terminate when agent is already at goal", () => {
    const engine = new RLEngine(BASE_RULES, BASE_PARAMS, [4, 4], [4, 4]);
    const ep = engine.runEpisode(50);
    assert.equal(ep.reachedGoal, true);
    assert.equal(ep.steps, 0);
    assert.equal(ep.totalReward, BASE_RULES.goalReward);
  });
});

describe("RL Store Integration", () => {
  it("should load smart preset with villains and compute BFS result", async () => {
    const { useRLStore } = await import("../src/stores/rlStore.ts");
    const store = useRLStore.getState();
    store.loadPreset("smart");

    const state = useRLStore.getState();
    assert.equal(state.smartObstacles.length, 3);
    assert.ok(state.smartObstacles.some((o) => o.strategy === "patrol"));
    assert.ok(state.smartObstacles.some((o) => o.strategy === "chase"));
    assert.ok(state.smartObstacles.some((o) => o.strategy === "guard"));
    assert.ok(state.bfsResult.path.length > 0);
  });

  it("should allow assigning and updating obstacle strategies in store", async () => {
    const { useRLStore } = await import("../src/stores/rlStore.ts");
    const store = useRLStore.getState();
    store.loadPreset("smart");

    const targetObs = useRLStore.getState().smartObstacles[0];
    store.updateObstacleStrategy(targetObs.id, "ambush");

    const updated = useRLStore
      .getState()
      .smartObstacles.find((o) => o.id === targetObs.id);
    assert.equal(updated?.strategy, "ambush");
  });

  it("should train episodes via store and accumulate history", async () => {
    const { useRLStore } = await import("../src/stores/rlStore.ts");
    const store = useRLStore.getState();
    store.resetQTable();
    assert.equal(useRLStore.getState().totalEpisodes, 0);

    store.trainEpisodes(20);
    const state = useRLStore.getState();
    assert.equal(state.totalEpisodes, 20);
    assert.equal(state.rewardHistory.length, 20);
    assert.equal(state.stepsHistory.length, 20);
  });

  it("should protect startPos and goalPos from being overwritten by obstacles", async () => {
    const { useRLStore } = await import("../src/stores/rlStore.ts");
    const store = useRLStore.getState();
    store.loadPreset("smart");
    const [startR, startC] = store.startPos;
    const [goalR, goalC] = store.goalPos;

    // Try to place smart obstacle at startPos and goalPos
    store.toggleCell(startR, startC, "smart-obstacle");
    assert.ok(
      !useRLStore.getState().smartObstacles.some((o) => o.r === startR && o.c === startC),
    );

    store.toggleCell(goalR, goalC, "smart-obstacle");
    assert.ok(
      !useRLStore.getState().smartObstacles.some((o) => o.r === goalR && o.c === goalC),
    );

    // Try to place wall at startPos
    store.toggleCell(startR, startC, "obstacle");
    assert.ok(
      !useRLStore.getState().obstacles.some(([r, c]) => r === startR && c === startC),
    );
  });
});
