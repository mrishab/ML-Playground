import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar-context";
import { SidebarGap } from "./SidebarGap";
import { SidebarDesktopInner } from "./SidebarDesktopInner";

export interface SidebarDesktopProps extends React.ComponentProps<"div"> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}

export const SidebarDesktop = React.forwardRef<
  HTMLDivElement,
  SidebarDesktopProps
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const { state } = useSidebar();

    return (
      <div
        ref={ref}
        className={cn(
          "group peer hidden text-sidebar-foreground md:block",
          className,
        )}
        style={style}
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        <SidebarGap variant={variant} />
        <SidebarDesktopInner side={side} variant={variant} {...props}>
          {children}
        </SidebarDesktopInner>
      </div>
    );
  },
);
SidebarDesktop.displayName = "SidebarDesktop";
