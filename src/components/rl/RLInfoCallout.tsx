import { Sparkles } from "lucide-react";

export function RLInfoCallout() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/30 p-3 text-xs text-muted-foreground">
      <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
      <p>
        <span className="font-semibold text-foreground">
          RL vs. Static Search (DFS/BFS):{" "}
        </span>
        Static pathfinders (DFS/BFS) assume fixed, known graphs. With acting
        smart obstacles (patrol sentries, chasing villains, ambushes) whose
        behaviors are unknown, the agent must run simulation episodes to learn
        safe, evasive policies through trial-and-error without prior knowledge.
      </p>
    </div>
  );
}
