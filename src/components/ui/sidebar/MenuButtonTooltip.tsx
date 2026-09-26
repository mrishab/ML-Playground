import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar-context";

interface MenuButtonTooltipProps {
  tooltip: string | React.ComponentProps<typeof TooltipContent>;
  children: React.ReactElement;
}

export function MenuButtonTooltip({
  tooltip,
  children,
}: MenuButtonTooltipProps) {
  const { isMobile, state } = useSidebar();
  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}
