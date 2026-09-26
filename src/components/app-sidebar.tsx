"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { PipelineProgress } from "@/components/shared/PipelineProgress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useAppSidebarNav } from "./sidebar/useAppSidebarNav";
import { AppSidebarHeader } from "./sidebar/AppSidebarHeader";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navItems = useAppSidebarNav();

  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader>
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} label="Workflow" />
      </SidebarContent>
      <SidebarFooter>
        <PipelineProgress />
      </SidebarFooter>
    </Sidebar>
  );
}
