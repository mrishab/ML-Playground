"use client";

import * as React from "react";
import {
  Database,
  FileSpreadsheet,
  Shuffle,
  Search,
  BarChart3,
  Brain,
  TrendingUp,
  Users,
  Layers,
  Binary,
} from "lucide-react";

import { NavMain, type NavItem } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems: NavItem[] = [
  {
    title: "Data Ingestion",
    icon: Database,
    isActive: true,
    items: [
      {
        title: "Select Dataset",
        icon: FileSpreadsheet,
        url: "/data/select",
      },
      {
        title: "Transform",
        icon: Shuffle,
        url: "/data/transform",
      },
    ],
  },
  {
    title: "Pretraining",
    icon: Search,
    isActive: true,
    items: [
      {
        title: "Explore",
        url: "/pretrain/explore",
      },
      {
        title: "Visualize",
        icon: BarChart3,
        url: "/pretrain/visualize",
      },
    ],
  },
  {
    title: "Training",
    icon: Brain,
    isActive: true,
    items: [
      {
        title: "Linear Regression",
        icon: TrendingUp,
        url: "/train/linear",
      },
      {
        title: "KNN",
        icon: Users,
        url: "/train/knn",
      },
      {
        title: "LDA",
        icon: Layers,
        url: "/train/lda",
      },
      {
        title: "Logistic Regression",
        icon: Binary,
        url: "/train/logistic",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Brain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ML Pipeline</span>
                  <span className="truncate text-xs">COMP 381</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} label="Workflow" />
      </SidebarContent>
    </Sidebar>
  );
}
