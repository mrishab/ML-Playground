"use client";

import { ChevronRight, Lock, type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  onLockedClick?: () => void;
  items?: NavItem[];
};

function NavSubItems({
  items,
  depth = 0,
}: {
  items: NavItem[];
  depth?: number;
}) {
  const location = useLocation();

  return (
    <SidebarMenuSub>
      {items.map((item) => (
        <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
          <SidebarMenuSubItem>
            {item.items?.length ? (
              <>
                <CollapsibleTrigger asChild>
                  <SidebarMenuSubButton className="cursor-pointer">
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-90" />
                  </SidebarMenuSubButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <NavSubItems items={item.items} depth={depth + 1} />
                </CollapsibleContent>
              </>
            ) : (
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
                      location.pathname === item.url
                        ? "font-medium text-primary"
                        : ""
                    }
                  >
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuSubButton>
            )}
          </SidebarMenuSubItem>
        </Collapsible>
      ))}
    </SidebarMenuSub>
  );
}

export function NavMain({
  items,
  label = "Platform",
}: {
  items: NavItem[];
  label?: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.title}>
                {item.url && !item.disabled ? (
                  <Link to={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                ) : item.disabled ? (
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
                ) : (
                  <span className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </span>
                )}
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <NavSubItems items={item.items} />
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
