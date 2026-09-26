import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDatasetStore } from "@/stores/dataset";
import { useMLConfigStore } from "@/stores/mlConfig";
import { useTrainingResultsStore } from "@/stores/trainingResults";
import {
  usePipelineStore,
  areExploreSettingsDirty,
  type PipelineStepInfo,
  type StepId,
  type StepStatus,
} from "@/stores/pipeline";

export function usePipelineSteps() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Store states
  const { df, selectedDataset } = useDatasetStore();
  const {
    isSplit,
    xTrain,
    xTest,
    targetColumn,
    selectedFeatures,
    testSplitPercent,
    shuffle,
    problemType,
  } = useMLConfigStore();

  const { linearRegression, knn, lda, logisticRegression } =
    useTrainingResultsStore();

  const { pendingDataset, lastSplitConfig } = usePipelineStore();

  const hasDataset = df !== null;
  const isSplitReady = isSplit && xTrain !== null && xTest !== null;

  const hasTrainedModel =
    problemType === "regression"
      ? linearRegression.metrics !== null
      : problemType === "clustering"
        ? true // clustering can be explored directly once split
        : knn.metrics !== null ||
          lda.metrics !== null ||
          logisticRegression.metrics !== null;

  // Stale state calculations
  const isExploreDirty = useMemo(() => {
    if (!isSplitReady || !lastSplitConfig) return false;
    return areExploreSettingsDirty(lastSplitConfig, {
      datasetName: selectedDataset,
      problemType,
      targetColumn,
      selectedFeatures,
      testSplitPercent,
      shuffle,
    });
  }, [
    isSplitReady,
    lastSplitConfig,
    selectedDataset,
    problemType,
    targetColumn,
    selectedFeatures,
    testSplitPercent,
    shuffle,
  ]);

  const isDatasetDirty =
    pendingDataset !== null && pendingDataset !== selectedDataset;

  const isDownstreamStale = isExploreDirty || isDatasetDirty;

  // Route determination for training
  const defaultTrainRoute = useMemo(() => {
    if (problemType === "regression") return "/train/linear";
    if (problemType === "clustering") return "/comparison/clustering";
    return "/train/knn";
  }, [problemType]);

  // Route determination for comparison
  const defaultCompareRoute = useMemo(() => {
    if (problemType === "regression") return "/comparison/regression";
    if (problemType === "clustering") return "/comparison/clustering";
    return "/comparison/classification";
  }, [problemType]);

  // Determine current active step ID from current path
  const currentStepId: StepId = useMemo(() => {
    if (currentPath.startsWith("/data")) return 1;
    if (currentPath.startsWith("/pretrain")) return 2;
    if (currentPath.startsWith("/train")) return 3;
    if (currentPath.startsWith("/comparison")) return 4;
    if (currentPath.startsWith("/validation")) return 5;
    return 1;
  }, [currentPath]);

  // Step 1: Dataset
  const step1: PipelineStepInfo = useMemo(() => {
    const isActive = currentStepId === 1;
    const isCompleted = hasDataset;
    const status: StepStatus = isActive
      ? "active"
      : isCompleted
        ? isDatasetDirty
          ? "stale"
          : "completed"
        : "active";

    return {
      id: 1,
      key: "dataset",
      title: "1. Dataset Ingestion",
      shortTitle: "Dataset",
      route: "/data/select",
      subRoutes: ["/data/select", "/data/transform"],
      status,
      isStale: isDatasetDirty,
      artifactDescription: hasDataset
        ? `${selectedDataset} (${df?.shape[0] ?? 0} rows)`
        : null,
      requirements: [
        {
          id: "req-dataset-selected",
          label: "Select a Dataset",
          satisfied: hasDataset,
          missingMessage:
            "Select an in-browser dataset or sample from the catalog.",
          actionRoute: "/data/select",
          actionLabel: "Choose Dataset",
        },
      ],
    };
  }, [currentStepId, hasDataset, isDatasetDirty, selectedDataset, df]);

  // Step 2: Pretraining & Split
  const step2: PipelineStepInfo = useMemo(() => {
    const isActive = currentStepId === 2;
    const isCompleted = isSplitReady;
    const isLocked = !hasDataset;

    let status: StepStatus = "locked";
    if (isActive) {
      status = "active";
    } else if (isLocked) {
      status = "locked";
    } else if (isCompleted) {
      status = isExploreDirty || isDatasetDirty ? "stale" : "completed";
    } else {
      status = "active"; // Accessible because Step 1 is done
    }

    return {
      id: 2,
      key: "pretrain",
      title: "2. Pretrain & Split",
      shortTitle: "Pretrain",
      route: "/pretrain/explore",
      subRoutes: ["/pretrain/explore", "/pretrain/visualize"],
      status,
      isStale: isExploreDirty || isDatasetDirty,
      artifactDescription: isSplitReady
        ? `${xTrain?.shape[0]} train / ${xTest?.shape[0]} test rows`
        : null,
      requirements: [
        {
          id: "req-df-loaded",
          label: "Dataset Loaded from Step 1",
          satisfied: hasDataset,
          missingMessage:
            "A dataset must be selected before features can be explored.",
          actionRoute: "/data/select",
          actionLabel: "Go to Step 1: Dataset",
        },
        {
          id: "req-target-chosen",
          label: "Target Variable (Y) Selected",
          satisfied: targetColumn !== "",
          missingMessage:
            "Select a target column to predict in the Data Split Settings.",
          actionRoute: "/pretrain/explore",
          actionLabel: "Configure Target in Step 2",
        },
        {
          id: "req-features-chosen",
          label: "At Least 1 Feature Selected",
          satisfied: selectedFeatures.length > 0,
          missingMessage: "Select one or more input features from the dataset.",
          actionRoute: "/pretrain/explore",
          actionLabel: "Select Features in Step 2",
        },
        {
          id: "req-split-done",
          label: "Train / Test Split Executed",
          satisfied: isSplitReady,
          missingMessage:
            "Click 'Create Train/Test Split' to partition data for training.",
          actionRoute: "/pretrain/explore",
          actionLabel: "Execute Split in Step 2",
        },
      ],
    };
  }, [
    currentStepId,
    isSplitReady,
    hasDataset,
    isExploreDirty,
    isDatasetDirty,
    xTrain,
    xTest,
    targetColumn,
    selectedFeatures,
  ]);

  // Step 3: Model Training
  const step3: PipelineStepInfo = useMemo(() => {
    const isActive = currentStepId === 3;
    const isLocked = !hasDataset || !isSplitReady;

    let status: StepStatus = "locked";
    if (isActive) {
      status = "active";
    } else if (isLocked) {
      status = "locked";
    } else if (hasTrainedModel) {
      status = isDownstreamStale ? "stale" : "completed";
    } else {
      status = "active";
    }

    const modelArtifactDesc =
      problemType === "regression" && linearRegression.metrics
        ? `Linear Regression (MSE: ${linearRegression.metrics.mse.toFixed(3)}, R²: ${linearRegression.metrics.rSquared.toFixed(2)})`
        : knn.metrics
          ? `KNN Model (Acc: ${(knn.metrics.accuracy * 100).toFixed(1)}%)`
          : lda.metrics
            ? `LDA Model (Acc: ${(lda.metrics.accuracy * 100).toFixed(1)}%)`
            : logisticRegression.metrics
              ? `Logistic Reg (Acc: ${(logisticRegression.metrics.accuracy * 100).toFixed(1)}%)`
              : null;

    return {
      id: 3,
      key: "train",
      title: "3. Model Training",
      shortTitle: "Training",
      route: defaultTrainRoute,
      subRoutes: [
        "/train/linear",
        "/train/knn",
        "/train/lda",
        "/train/logistic",
      ],
      status,
      isStale: isDownstreamStale && hasTrainedModel,
      artifactDescription: modelArtifactDesc,
      requirements: [
        {
          id: "req-train-dataset",
          label: "Dataset Selected",
          satisfied: hasDataset,
          missingMessage:
            "Dataset must be chosen in Step 1 before training models.",
          actionRoute: "/data/select",
          actionLabel: "Go to Step 1: Dataset",
        },
        {
          id: "req-train-split",
          label: "Data Split Completed",
          satisfied: isSplitReady,
          missingMessage:
            "Train/test split must be generated in Step 2 to provide training tensors.",
          actionRoute: "/pretrain/explore",
          actionLabel: "Go to Step 2: Split Data",
        },
        {
          id: "req-train-model",
          label: "Train at Least One Model",
          satisfied: hasTrainedModel,
          missingMessage:
            "Click 'Train Model' to fit model parameters on client hardware.",
          actionRoute: defaultTrainRoute,
          actionLabel: "Train Model in Step 3",
        },
      ],
    };
  }, [
    currentStepId,
    hasDataset,
    isSplitReady,
    hasTrainedModel,
    isDownstreamStale,
    problemType,
    linearRegression.metrics,
    knn.metrics,
    lda.metrics,
    logisticRegression.metrics,
    defaultTrainRoute,
  ]);

  // Step 4: Model Comparison
  const step4: PipelineStepInfo = useMemo(() => {
    const isActive = currentStepId === 4;
    const isLocked = !hasDataset || !isSplitReady || !hasTrainedModel;

    let status: StepStatus = "locked";
    if (isActive) {
      status = "active";
    } else if (isLocked) {
      status = "locked";
    } else {
      status = isDownstreamStale ? "stale" : "completed";
    }

    return {
      id: 4,
      key: "comparison",
      title: "4. Model Comparison",
      shortTitle: "Comparison",
      route: defaultCompareRoute,
      subRoutes: [
        "/comparison/regression",
        "/comparison/classification",
        "/comparison/clustering",
      ],
      status,
      isStale: isDownstreamStale && hasTrainedModel,
      artifactDescription: hasTrainedModel ? "Comparative Metrics" : null,
      requirements: [
        {
          id: "req-comp-split",
          label: "Data Split Performed",
          satisfied: isSplitReady,
          missingMessage: "Requires partitioned data from Step 2.",
          actionRoute: "/pretrain/explore",
          actionLabel: "Go to Step 2: Split",
        },
        {
          id: "req-comp-trained",
          label: "Model Trained in Step 3",
          satisfied: hasTrainedModel,
          missingMessage:
            "Requires at least one trained model to benchmark performance.",
          actionRoute: defaultTrainRoute,
          actionLabel: "Go to Step 3: Train Model",
        },
      ],
    };
  }, [
    currentStepId,
    hasDataset,
    isSplitReady,
    hasTrainedModel,
    isDownstreamStale,
    defaultCompareRoute,
    defaultTrainRoute,
  ]);

  // Step 5: Validation / Results
  const step5: PipelineStepInfo = useMemo(() => {
    const isActive = currentStepId === 5;
    const isLocked = !hasDataset || !isSplitReady || !hasTrainedModel;

    let status: StepStatus = "locked";
    if (isActive) {
      status = "active";
    } else if (isLocked) {
      status = "locked";
    } else {
      status = isDownstreamStale ? "stale" : "completed";
    }

    return {
      id: 5,
      key: "validation",
      title: "5. Validation & Results",
      shortTitle: "Results",
      route: "/validation",
      subRoutes: ["/validation"],
      status,
      isStale: isDownstreamStale && hasTrainedModel,
      artifactDescription: hasTrainedModel ? "Final Evaluation Ready" : null,
      requirements: [
        {
          id: "req-val-split",
          label: "Data Split Completed",
          satisfied: isSplitReady,
          missingMessage: "Requires partitioned data from Step 2.",
          actionRoute: "/pretrain/explore",
          actionLabel: "Go to Step 2: Split",
        },
        {
          id: "req-val-trained",
          label: "Model Evaluated",
          satisfied: hasTrainedModel,
          missingMessage:
            "Requires trained model metrics before generating final evaluation summary.",
          actionRoute: defaultTrainRoute,
          actionLabel: "Go to Step 3: Train Model",
        },
      ],
    };
  }, [
    currentStepId,
    hasDataset,
    isSplitReady,
    hasTrainedModel,
    isDownstreamStale,
    defaultTrainRoute,
  ]);

  const steps: PipelineStepInfo[] = useMemo(
    () => [step1, step2, step3, step4, step5],
    [step1, step2, step3, step4, step5],
  );

  const currentStep = useMemo(() => {
    return steps.find((s) => s.id === currentStepId) ?? step1;
  }, [steps, currentStepId, step1]);

  // Navigation routes logic
  const prevStepRoute = useMemo(() => {
    if (currentStepId === 1) return null;
    return steps[currentStepId - 2]?.route ?? null;
  }, [currentStepId, steps]);

  const prevStepLabel = useMemo(() => {
    if (currentStepId === 1) return null;
    return steps[currentStepId - 2]?.shortTitle ?? null;
  }, [currentStepId, steps]);

  const nextStepRoute = useMemo(() => {
    if (currentStepId === 5) return null;
    return steps[currentStepId]?.route ?? null;
  }, [currentStepId, steps]);

  const nextStepLabel = useMemo(() => {
    if (currentStepId === 5) return null;
    return steps[currentStepId]?.shortTitle ?? null;
  }, [currentStepId, steps]);

  const canProceedToNext = useMemo(() => {
    if (currentStepId === 1) return hasDataset;
    if (currentStepId === 2) return isSplitReady;
    if (currentStepId === 3) return hasTrainedModel;
    if (currentStepId === 4) return hasTrainedModel;
    return false;
  }, [currentStepId, hasDataset, isSplitReady, hasTrainedModel]);

  return {
    steps,
    currentStep,
    currentStepId,
    hasDataset,
    isSplitReady,
    hasTrainedModel,
    isExploreDirty,
    isDatasetDirty,
    isDownstreamStale,
    pendingDataset,
    prevStepRoute,
    prevStepLabel,
    nextStepRoute,
    nextStepLabel,
    canProceedToNext,
    defaultTrainRoute,
    defaultCompareRoute,
  };
}
