import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar-context";
import { SidebarMobile } from "./SidebarMobile";
import { SidebarDesktop, type SidebarDesktopProps } from "./SidebarDesktop";

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarDesktopProps>(
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
    const { isMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <SidebarMobile side={side} style={style} {...props}>
          {children}
        </SidebarMobile>
      );
    }

    return (
      <SidebarDesktop
        ref={ref}
        side={side}
        variant={variant}
        collapsible={collapsible}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </SidebarDesktop>
    );
  },
);
Sidebar.displayName = "Sidebar";
