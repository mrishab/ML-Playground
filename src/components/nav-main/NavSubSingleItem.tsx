import { Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SidebarMenuSubButton } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "./types";

export function NavSubSingleItem({ item }: { item: NavItem }) {
  const location = useLocation();

  return (
    <SidebarMenuSubButton asChild>
      {item.disabled ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={() => item.onLockedClick?.()}
              className="flex w-full items-center justify-between text-left opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-xs"
            >
              <span className="truncate">{item.title}</span>
              <Lock className="h-3 w-3 text-muted-foreground/60 shrink-0 ml-1" />
            </button>
          </TooltipTrigger>
          {item.disabledReason && (
            <TooltipContent side="right">
              <p>{item.disabledReason} (Click for details)</p>
            </TooltipContent>
          )}
        </Tooltip>
      ) : (
        <Link
          to={item.url ?? "#"}
          className={
            location.pathname === item.url ? "font-medium text-primary" : ""
          }
        >
          <span>{item.title}</span>
        </Link>
      )}
    </SidebarMenuSubButton>
  );
}
