import { Badge } from "@/components/ui/badge";

type Props = {
  successRate: number;
  totalEpisodes: number;
};

export function RLRLPolicyPanel({ successRate, totalEpisodes }: Props) {
  return (
    <div className="space-y-1.5 p-2.5 rounded-md border border-primary/30 bg-primary/5">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground">
          RL Simulation Policy
        </span>
        <Badge variant="default" className="text-[10px] h-5">
          {totalEpisodes > 0
            ? `${successRate.toFixed(0)}% Success`
            : "Untrained"}
        </Badge>
      </div>
      <p className="text-muted-foreground">
        {totalEpisodes > 0
          ? `Learns evasive routes over ${totalEpisodes} simulated episodes without prior knowledge.`
          : "Run simulations to learn how to deal with smart obstacles without prior knowledge."}
      </p>
      <div className="text-[11px] text-muted-foreground/80 pt-1">
        Adapts dynamically through trial-and-error reward signals.
      </div>
    </div>
  );
}
