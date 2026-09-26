import { Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./AppShell";
import { SelectDatasetPage } from "@/components/data-ingestion/select-dataset/SelectDatasetPage";
import { TransformPage } from "@/components/data-ingestion/transform/TransformPage";
import { ExplorePage } from "@/components/pretraining/explore/ExplorePage";
import { VisualizePage } from "@/components/pretraining/visualize/VisualizePage";
import { LinearRegressionPage } from "@/components/training/linear-regression/LinearRegressionPage";
import { KNNPage } from "@/components/training/knn/KNNPage";
import { LDAPage } from "@/components/training/lda/LDAPage";
import { LogisticRegressionPage } from "@/components/training/logistic-regression/LogisticRegressionPage";
import { ClassificationComparisonPage } from "@/components/comparison/classification/ClassificationComparisonPage";
import { RegressionComparisonPage } from "@/components/comparison/regression/RegressionComparisonPage";
import { ClusterComparisonPage } from "@/components/comparison/clustering/ClusterComparisonPage";
import { ValidationResultsPage } from "@/components/pipeline/ValidationResultsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/data/select" replace />} />
        <Route path="data/select" element={<SelectDatasetPage />} />
        <Route path="data/transform" element={<TransformPage />} />
        <Route path="pretrain/explore" element={<ExplorePage />} />
        <Route path="pretrain/visualize" element={<VisualizePage />} />
        <Route path="train/linear" element={<LinearRegressionPage />} />
        <Route path="train/knn" element={<KNNPage />} />
        <Route path="train/lda" element={<LDAPage />} />
        <Route path="train/logistic" element={<LogisticRegressionPage />} />
        <Route
          path="comparison/classification"
          element={<ClassificationComparisonPage />}
        />
        <Route
          path="comparison/regression"
          element={<RegressionComparisonPage />}
        />
        <Route
          path="comparison/clustering"
          element={<ClusterComparisonPage />}
        />
        <Route path="validation" element={<ValidationResultsPage />} />
      </Route>
    </Routes>
  );
}
