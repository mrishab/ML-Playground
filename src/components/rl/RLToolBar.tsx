import { Button } from "@/components/ui/button";
import { Bot, Trophy, Flame, Square, Ghost, Eraser } from "lucide-react";

export type EditTool =
  | "agent"
  | "goal"
  | "hazard"
  | "obstacle"
  | "smart-obstacle"
  | "clear";

type Props = {
  activeTool: EditTool;
  onSelectTool: (tool: EditTool) => void;
  onResetEnv: () => void;
};

const TOOLS: { tool: EditTool; label: string; icon: typeof Bot }[] = [
  { tool: "agent", label: "Agent", icon: Bot },
  { tool: "goal", label: "Goal", icon: Trophy },
  { tool: "hazard", label: "Hazard", icon: Flame },
  { tool: "obstacle", label: "Wall", icon: Square },
  { tool: "smart-obstacle", label: "Villain", icon: Ghost },
  { tool: "clear", label: "Clear", icon: Eraser },
];

export function RLToolBar({ activeTool, onSelectTool, onResetEnv }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
      <div className="flex items-center gap-1">
        {TOOLS.map(({ tool, label, icon: Icon }) => (
          <Button
            key={tool}
            size="sm"
            variant={activeTool === tool ? "default" : "outline"}
            className="h-7 text-xs px-2 gap-1"
            onClick={() => onSelectTool(tool)}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        ))}
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 text-xs text-muted-foreground"
        onClick={onResetEnv}
      >
        Reset Grid
      </Button>
    </div>
  );
}
