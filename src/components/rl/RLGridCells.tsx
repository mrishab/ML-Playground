import { RLCell } from "./RLCell";
import { stateKey } from "@/lib/rl/rlEngine";
import { getGridLookups } from "./rlCellUtils";
import type { useRLStore } from "@/stores/rlStore";
import type { EditTool } from "./RLToolBar";

type Props = {
  store: ReturnType<typeof useRLStore.getState>;
  tool: EditTool;
};

export function RLGridCells({ store, tool }: Props) {
  const { gridSize, startPos, agentPos, goalPos, qTable, toggleCell } = store;
  const { hazardSet, obstacleSet, smartObsMap, bfsSet } = getGridLookups(store);

  return (
    <div
      className="grid gap-1.5 w-full max-w-sm mx-auto"
      style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
        const r = Math.floor(idx / gridSize);
        const c = idx % gridSize;
        const key = stateKey(r, c);
        const q = qTable[key] || [0, 0, 0, 0];
        const maxQ = Math.max(...q);

        return (
          <RLCell
            key={key}
            isStart={startPos[0] === r && startPos[1] === c}
            isAgent={agentPos[0] === r && agentPos[1] === c}
            isGoal={goalPos[0] === r && goalPos[1] === c}
            isHazard={hazardSet.has(key)}
            isObstacle={obstacleSet.has(key)}
            isBFSPath={bfsSet?.has(key)}
            smartObstacle={smartObsMap.get(key)}
            bestAction={q.indexOf(maxQ)}
            maxQ={maxQ}
            onClick={() => toggleCell(r, c, tool)}
          />
        );
      })}
    </div>
  );
}
