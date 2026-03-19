import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { AppShell } from "./AppShell";
import { SelectDatasetPage } from "@/components/data-ingestion/select-dataset/SelectDatasetPage";
import { TransformPage } from "@/components/data-ingestion/transform/TransformPage";
import { ExplorePage } from "@/components/pretraining/explore/ExplorePage";
import { VisualizePage } from "@/components/pretraining/visualize/VisualizePage";
import { LinearRegressionPage } from "@/components/training/linear-regression/LinearRegressionPage";
import { KNNPage } from "@/components/training/knn/KNNPage";
import { LDAPage } from "@/components/training/lda/LDAPage";
import { LogisticRegressionPage } from "@/components/training/logistic-regression/LogisticRegressionPage";

const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="ml-playground-ui-theme"
    >
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Navigate to="/data/select" replace />} />
            {/* Data Ingestion */}
            <Route path="data/select" element={<SelectDatasetPage />} />
            <Route path="data/transform" element={<TransformPage />} />
            {/* Pretraining */}
            <Route path="pretrain/explore" element={<ExplorePage />} />
            <Route path="pretrain/visualize" element={<VisualizePage />} />
            {/* Training */}
            <Route path="train/linear" element={<LinearRegressionPage />} />
            <Route path="train/knn" element={<KNNPage />} />
            <Route path="train/lda" element={<LDAPage />} />
            <Route path="train/logistic" element={<LogisticRegressionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
