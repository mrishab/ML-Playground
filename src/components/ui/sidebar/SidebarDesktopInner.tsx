import * as React from "react";
import { cn } from "@/lib/utils";

export interface SidebarDesktopInnerProps extends React.ComponentProps<"div"> {
  side: "left" | "right";
  variant: "sidebar" | "floating" | "inset";
}

export function SidebarDesktopInner({
  side,
  variant,
  children,
  ...props
}: SidebarDesktopInnerProps) {
  return (
    <div
      className={cn(
        "fixed top-[--header-height] z-10 hidden h-[calc(100svh-var(--header-height))] w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
        side === "left"
          ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
          : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
        variant === "floating" || variant === "inset"
          ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
          : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
      )}
      {...props}
    >
      <div
        data-sidebar="sidebar"
        className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
      >
        {children}
      </div>
    </div>
  );
}
