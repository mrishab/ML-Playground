import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { RLEnvironmentRules } from "@/lib/rl/types";
import type { RLPresetName } from "@/stores/rlStore";
import { RLEnvironmentRuleSliders } from "./RLEnvironmentRuleSliders";

type Props = {
  rules: RLEnvironmentRules;
  onChange: (patch: Partial<RLEnvironmentRules>) => void;
  onPreset: (name: RLPresetName) => void;
};

const PRESETS: { id: RLPresetName; label: string }[] = [
  { id: "smart", label: "Smart" },
  { id: "cliff", label: "Cliff" },
  { id: "maze", label: "Maze" },
  { id: "empty", label: "Open" },
];

export function RLEnvironmentRulesCard({ rules, onChange, onPreset }: Props) {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base">Environment Rules</CardTitle>
        <div className="flex gap-1">
          {PRESETS.map((p) => (
            <Button
              key={p.id}
              size="sm"
              variant="outline"
              className="h-6 text-[10px] px-1.5"
              onClick={() => onPreset(p.id)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <RLEnvironmentRuleSliders rules={rules} onChange={onChange} />
      </CardContent>
    </Card>
  );
}
