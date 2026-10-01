import { Link } from "react-router-dom";
import { HardDrive } from "lucide-react";
import { useModelStorageStat } from "./useModelStorageStat";

export function ModelStorageStat() {
  const { formattedSize, modelCount } = useModelStorageStat();

  return (
    <Link
      to="/models"
      className="flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/40 px-2 py-1 text-xs font-medium text-muted-foreground hover:border-border hover:bg-muted/80 hover:text-foreground transition-[transform,background-color,border-color,color] duration-150 ease-out active:scale-[0.98]"
      title={`Stored Models: ${formattedSize} (${modelCount} ${modelCount === 1 ? "model" : "models"}) — Click to manage`}
      aria-label="Model storage and management"
    >
      <HardDrive className="h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="font-mono text-xs font-medium text-foreground">
        {formattedSize}
      </span>
      <span className="hidden md:inline text-[10px] text-muted-foreground">
        ({modelCount})
      </span>
    </Link>
  );
}
