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
import { KMeansPage } from "@/components/training/kmeans/KMeansPage";
import { ModelsPage } from "@/components/models/ModelsPage";
import { DatasetsPage } from "@/components/datasets/DatasetsPage";

const REDIRECTS = [
  { path: "pretrain", to: "/pretrain/explore" },
  { path: "pretrain/visualize", to: "/analyze" },
  { path: "pretrain/analyze", to: "/analyze" },
  { path: "visualize", to: "/analyze" },
  { path: "validation", to: "/data/select" },
  { path: "comparison", to: "/train/linear" },
  { path: "comparison/classification", to: "/train/knn" },
  { path: "comparison/regression", to: "/train/linear" },
  { path: "comparison/clustering", to: "/train/clustering" },
  { path: "models/manage", to: "/models" },
  { path: "manage-models", to: "/models" },
  { path: "datasets", to: "/data/manage" },
  { path: "datasets/manage", to: "/data/manage" },
  { path: "manage-datasets", to: "/data/manage" },
] as const;

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/data/select" replace />} />
        <Route path="data/select" element={<SelectDatasetPage />} />
        <Route path="data/manage" element={<DatasetsPage />} />
        <Route path="data/transform" element={<TransformPage />} />
        <Route path="pretrain/explore" element={<ExplorePage />} />
        <Route path="analyze" element={<VisualizePage />} />
        <Route path="train/linear" element={<LinearRegressionPage />} />
        <Route path="train/knn" element={<KNNPage />} />
        <Route path="train/lda" element={<LDAPage />} />
        <Route path="train/logistic" element={<LogisticRegressionPage />} />
        <Route path="train/clustering" element={<KMeansPage />} />
        <Route path="models" element={<ModelsPage />} />
        {REDIRECTS.map(({ path, to }) => (
          <Route key={path} path={path} element={<Navigate to={to} replace />} />
        ))}
      </Route>
    </Routes>
  );
}
