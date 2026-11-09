import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RLControlSliders } from "./RLControlSliders";
import { RLControlsActionButtons } from "./RLControlsActionButtons";
import type { RLHyperparameters } from "@/lib/rl/types";

type Props = {
  params: RLHyperparameters;
  isSimulating: boolean;
  onChange: (patch: Partial<RLHyperparameters>) => void;
  onTrain: (episodes: number) => void;
  onStep: () => void;
  onToggleSimulate: () => void;
  onResetQ: () => void;
};

export function RLControlsCard({
  params,
  isSimulating,
  onChange,
  onTrain,
  onStep,
  onToggleSimulate,
  onResetQ,
}: Props) {
  const isQ = params.algorithm === "q-learning";
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Policy & Learning Controls</CardTitle>
        <div className="flex gap-1 bg-muted/50 p-0.5 rounded-md border text-xs">
          <button
            type="button"
            className={`px-2 py-0.5 rounded ${isQ ? "bg-background font-semibold shadow-xs" : "text-muted-foreground"}`}
            onClick={() => onChange({ algorithm: "q-learning" })}
          >
            Q-Learning
          </button>
          <button
            type="button"
            className={`px-2 py-0.5 rounded ${!isQ ? "bg-background font-semibold shadow-xs" : "text-muted-foreground"}`}
            onClick={() => onChange({ algorithm: "sarsa" })}
          >
            SARSA
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <RLControlSliders params={params} onChange={onChange} />
        <RLControlsActionButtons
          isSimulating={isSimulating}
          onTrain={onTrain}
          onStep={onStep}
          onToggleSimulate={onToggleSimulate}
          onResetQ={onResetQ}
        />
      </CardContent>
    </Card>
  );
}
