import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "./types";

export function NavMainItemButton({ item }: { item: NavItem }) {
  if (item.url && !item.disabled) {
    return (
      <Link to={item.url}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </Link>
    );
  }
  if (item.disabled) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => item.onLockedClick?.()}
            className="flex w-full items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-left"
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <Lock className="ml-auto h-3.5 w-3.5 text-muted-foreground/60" />
          </button>
        </TooltipTrigger>
        {item.disabledReason && (
          <TooltipContent side="right">
            <p>{item.disabledReason} (Click for details)</p>
          </TooltipContent>
        )}
      </Tooltip>
    );
  }
  return (
    <span className="flex items-center gap-2">
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </span>
  );
}
