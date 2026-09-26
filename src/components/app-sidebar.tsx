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
  Award,
} from "lucide-react";

import { NavMain, type NavItem } from "@/components/nav-main";
import { PipelineProgress } from "@/components/shared/PipelineProgress";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import { usePipelineSteps } from "@/hooks/usePipelineSteps";
import { usePipelineStore } from "@/stores/pipeline";
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

  const { steps } = usePipelineSteps();
  const { openLockedModal } = usePipelineStore();

  const step1 = steps[0];
  const step2 = steps[1];
  const step3 = steps[2];
  const step4 = steps[3];
  const step5 = steps[4];

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
          onLockedClick: () => openLockedModal(step1),
        },
      ],
    },
    {
      title: "2. Pretraining",
      icon: Search,
      isActive: true,
      disabled: !hasDataset,
      disabledReason: "Select a dataset in Step 1 first",
      onLockedClick: () => openLockedModal(step2),
      items: [
        {
          title: "Explore",
          url: "/pretrain/explore",
          disabled: !hasDataset,
          disabledReason: "Select a dataset first",
          onLockedClick: () => openLockedModal(step2),
        },
        {
          title: "Visualize",
          icon: BarChart3,
          url: "/pretrain/visualize",
          disabled: !hasDataset,
          disabledReason: "Select a dataset first",
          onLockedClick: () => openLockedModal(step2),
        },
      ],
    },
    {
      title: "3. Training",
      icon: Brain,
      isActive: true,
      disabled: !isSplit,
      disabledReason: "Create a train/test split in Step 2 first",
      onLockedClick: () => openLockedModal(step3),
      items: [
        {
          title: "Linear Regression",
          icon: TrendingUp,
          url: "/train/linear",
          disabled: !isSplit || !isRegressionProblem,
          disabledReason: !isSplit
            ? "Create a train/test split in Step 2 first"
            : "Only available for regression problems",
          onLockedClick: () => openLockedModal(step3),
        },
        {
          title: "KNN",
          icon: Users,
          url: "/train/knn",
          disabled: !isSplit || !isClassificationProblem,
          disabledReason: !isSplit
            ? "Create a train/test split in Step 2 first"
            : "Only available for classification problems",
          onLockedClick: () => openLockedModal(step3),
        },
        {
          title: "LDA",
          icon: Layers,
          url: "/train/lda",
          disabled: !isSplit || !isClassificationProblem,
          disabledReason: !isSplit
            ? "Create a train/test split in Step 2 first"
            : "Only available for classification problems",
          onLockedClick: () => openLockedModal(step3),
        },
        {
          title: "Logistic Regression",
          icon: Binary,
          url: "/train/logistic",
          disabled: !isSplit || !isClassificationProblem,
          disabledReason: !isSplit
            ? "Create a train/test split in Step 2 first"
            : "Only available for classification problems",
          onLockedClick: () => openLockedModal(step3),
        },
      ],
    },
    {
      title: "4. Comparison",
      icon: Scale,
      isActive: true,
      disabled: !isSplit,
      disabledReason: "Train at least one model in Step 3 first",
      onLockedClick: () => openLockedModal(step4),
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
              : "Train at least one classification model first",
          onLockedClick: () => openLockedModal(step4),
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
              : "Train at least one regression model first",
          onLockedClick: () => openLockedModal(step4),
        },
        {
          title: "Clustering",
          icon: CircleDot,
          url: "/comparison/clustering",
          disabled: !isSplit || !isClusteringProblem,
          disabledReason: !isSplit
            ? "Create a train/test split first"
            : "Only available for clustering problems",
          onLockedClick: () => openLockedModal(step4),
        },
      ],
    },
    {
      title: "5. Validation & Results",
      icon: Award,
      isActive: true,
      url: "/validation",
      disabled: !hasRegressionModel && !hasClassificationModel,
      disabledReason:
        "Train and evaluate models before reviewing final results",
      onLockedClick: () => openLockedModal(step5),
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
