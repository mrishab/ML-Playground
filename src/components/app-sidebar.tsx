"use client";

import * as React from "react";
import { Link } from "react-router-dom";
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
  Scale,
  Target,
  CircleDot,
} from "lucide-react";

import { NavMain, type NavItem } from "@/components/nav-main";
import { PipelineProgress } from "@/components/shared/PipelineProgress";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const hasDataset = useDatasetStore((state) => state.df !== null);
  const problemType = useMLConfigStore((state) => state.problemType);
  const isSplit = useMLConfigStore((state) => state.isSplit);
  const linearRegression = useTrainingResultsStore(
    (state) => state.linearRegression,
  );
  const knn = useTrainingResultsStore((state) => state.knn);
  const lda = useTrainingResultsStore((state) => state.lda);
  const logisticRegression = useTrainingResultsStore(
    (state) => state.logisticRegression,
  );

  const isRegressionProblem = problemType === "regression";
  const isClassificationProblem = problemType === "classification";
  const isClusteringProblem = problemType === "clustering";

  const hasRegressionModel = linearRegression.metrics !== null;
  const hasClassificationModel =
    knn.metrics !== null ||
    lda.metrics !== null ||
    logisticRegression.metrics !== null;

  const navItems: NavItem[] = [
    {
      title: "1. Data Ingestion",
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
          disabled: !hasDataset,
          disabledReason: "Select a dataset first",
        },
      ],
    },
    {
      title: "2. Pretraining",
      icon: Search,
      isActive: true,
      disabled: !hasDataset,
      disabledReason: "Select a dataset first",
      items: [
        {
          title: "Explore",
          url: "/pretrain/explore",
          disabled: !hasDataset,
          disabledReason: "Select a dataset first",
        },
        {
          title: "Visualize",
          icon: BarChart3,
          url: "/pretrain/visualize",
          disabled: !hasDataset,
          disabledReason: "Select a dataset first",
        },
      ],
    },
    {
      title: "3. Training",
      icon: Brain,
      isActive: true,
      disabled: !isSplit,
      disabledReason: "Create a train/test split first",
      items: [
        {
          title: "Linear Regression",
          icon: TrendingUp,
          url: "/train/linear",
          disabled: !isSplit || !isRegressionProblem,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : "Only available for regression problems",
        },
        {
          title: "KNN",
          icon: Users,
          url: "/train/knn",
          disabled: !isSplit || !isClassificationProblem,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : "Only available for classification problems",
        },
        {
          title: "LDA",
          icon: Layers,
          url: "/train/lda",
          disabled: !isSplit || !isClassificationProblem,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : "Only available for classification problems",
        },
        {
          title: "Logistic Regression",
          icon: Binary,
          url: "/train/logistic",
          disabled: !isSplit || !isClassificationProblem,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : "Only available for classification problems",
        },
      ],
    },
    {
      title: "4. Clustering",
      icon: CircleDot,
      isActive: true,
      disabled: !isSplit,
      disabledReason: "Create a train/test split first",
      items: [
        {
          title: "Cluster Comparison",
          icon: CircleDot,
          url: "/comparison/clustering",
          disabled: !isSplit || !isClusteringProblem,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : "Only available for clustering problems",
        },
      ],
    },
    {
      title: "5. Comparison",
      icon: Scale,
      isActive: true,
      disabled: !isSplit,
      disabledReason: "Create a train/test split first",
      items: [
        {
          title: "Classification",
          icon: Target,
          url: "/comparison/classification",
          disabled:
            !isSplit || !isClassificationProblem || !hasClassificationModel,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : !isClassificationProblem
              ? "Only available for classification problems"
              : "Train at least one model first",
        },
        {
          title: "Regression",
          icon: TrendingUp,
          url: "/comparison/regression",
          disabled: !isSplit || !isRegressionProblem || !hasRegressionModel,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : !isRegressionProblem
              ? "Only available for regression problems"
              : "Train at least one model first",
        },
      ],
    },
  ];

  return (
    <Sidebar className="border-r" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/data/select">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Brain className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ML Pipeline</span>
                  <span className="truncate text-xs">ML Playground</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
