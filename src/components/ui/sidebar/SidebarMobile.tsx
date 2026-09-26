import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar-context";
import { SIDEBAR_WIDTH_MOBILE } from "./constants";

export interface SidebarMobileProps extends React.ComponentProps<"div"> {
  side?: "left" | "right";
}

export function SidebarMobile({
  side = "left",
  style,
  children,
  ...props
}: SidebarMobileProps) {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
      <SheetContent
        data-sidebar="sidebar"
        data-mobile="true"
        className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            ...style,
          } as React.CSSProperties
        }
        side={side}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
          <SheetDescription>Displays the mobile sidebar.</SheetDescription>
        </SheetHeader>
        <div className="flex h-full w-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
