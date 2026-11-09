import { RLEnvironmentRulesCard } from "./RLEnvironmentRulesCard";
import { RLSmartObstaclesCard } from "./RLSmartObstaclesCard";
import { RLControlsCard } from "./RLControlsCard";
import type { useRLStore } from "@/stores/rlStore";

type Props = {
  store: ReturnType<typeof useRLStore.getState>;
};

export function RLConfigColumn({ store }: Props) {
  return (
    <div className="space-y-4">
      <RLEnvironmentRulesCard
        rules={store.rules}
        onChange={store.setRules}
        onPreset={store.loadPreset}
      />
      <RLSmartObstaclesCard
        activeStrategy={store.activeStrategy}
        onSelectStrategy={store.setActiveStrategy}
        smartObstacles={store.smartObstacles}
        onUpdateStrategy={store.updateObstacleStrategy}
        onRemove={store.removeSmartObstacle}
      />
      <RLControlsCard
        params={store.params}
        isSimulating={store.isSimulating}
        onChange={store.setParams}
        onTrain={store.trainEpisodes}
        onStep={store.stepSimulation}
        onToggleSimulate={() => store.setSimulating(!store.isSimulating)}
        onResetQ={store.resetQTable}
      />
    </div>
  );
}
