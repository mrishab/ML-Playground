import { cn } from "@/lib/utils";

interface ConfusionMatrixCellProps {
  count: number;
  isDiagonal: boolean;
  maxVal: number;
}

export function ConfusionMatrixCell({
  count,
  isDiagonal,
  maxVal,
}: ConfusionMatrixCellProps) {
  const intensity = count / maxVal;

  return (
    <div
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-md text-xs sm:text-sm font-semibold transition-[transform,box-shadow,opacity] duration-150 ease-out hover:scale-105 sm:h-14 sm:w-14 md:h-16 md:w-16",
        isDiagonal
          ? "bg-green-500 text-white"
          : count > 0
            ? "bg-red-500 text-white"
            : "bg-muted text-muted-foreground",
      )}
      style={{ opacity: count > 0 ? 0.4 + intensity * 0.6 : 1 }}
    >
      {count}
    </div>
  );
}
