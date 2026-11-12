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
import { RandomForestPage } from "@/components/training/random-forest/RandomForestPage";
import { XGBoostPage } from "@/components/training/xgboost/XGBoostPage";
import { IsolationForestPage } from "@/components/training/isolation-forest/IsolationForestPage";
import { ModelsPage } from "@/components/models/ModelsPage";
import { DatasetsPage } from "@/components/datasets/DatasetsPage";
import { REDIRECTS } from "./routeRedirects";

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
        <Route path="train/random-forest" element={<RandomForestPage />} />
        <Route path="train/xgboost" element={<XGBoostPage />} />
        <Route path="train/isolation-forest" element={<IsolationForestPage />} />
        <Route path="models" element={<ModelsPage />} />
        {REDIRECTS.map(({ path, to }) => (
          <Route key={path} path={path} element={<Navigate to={to} replace />} />
        ))}
      </Route>
    </Routes>
  );
}
