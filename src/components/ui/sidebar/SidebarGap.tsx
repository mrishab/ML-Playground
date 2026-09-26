import { cn } from "@/lib/utils";

interface SidebarGapProps {
  variant?: "sidebar" | "floating" | "inset";
}

export function SidebarGap({ variant }: SidebarGapProps) {
  return (
    <div
      className={cn(
        "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
        "group-data-[collapsible=offcanvas]:w-0",
        "group-data-[side=right]:rotate-180",
        variant === "floating" || variant === "inset"
          ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
          : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
      )}
    />
  );
}
