import { cn } from "@/lib/utils";
import { getBgStyle, type RLCellProps } from "./rlCellUtils";
import { RLCellContent } from "./RLCellContent";

type Props = RLCellProps & {
  onClick: () => void;
};

export function RLCell(props: Props) {
  const {
    isObstacle,
    isHazard,
    isGoal,
    smartObstacle,
    isBFSPath,
    maxQ,
    onClick,
  } = props;
  const isBlocked = isObstacle || isHazard || isGoal || !!smartObstacle;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative aspect-square rounded-md border flex items-center justify-center transition-all cursor-pointer select-none",
        isObstacle &&
          "bg-muted text-muted-foreground border-border cursor-not-allowed",
        isHazard && "bg-destructive/20 border-destructive/50 text-destructive",
        isGoal && "bg-primary/20 border-primary/50 text-primary",
        smartObstacle &&
          "bg-destructive/15 border-destructive/40 text-destructive",
        isBFSPath && "ring-1 ring-ring",
        !isBlocked && "border-border/60 hover:bg-muted/40",
      )}
      style={getBgStyle(isBlocked, maxQ)}
    >
      <RLCellContent {...props} />
    </button>
  );
}
