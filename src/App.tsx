import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { AppShell } from "./AppShell";
import {
  SelectDatasetPage,
  TransformPage,
  ExplorePage,
  VisualizePage,
  LinearRegressionPage,
  KNNPage,
  LDAPage,
  LogisticRegressionPage,
} from "./pages";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      storageKey="comp-381-ui-theme"
    >
      <BrowserRouter>
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
