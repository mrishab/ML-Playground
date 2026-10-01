import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDatasetStore } from "@/stores/dataset";
import { downloadDataAsCSV } from "@/lib/data-cleanup/csvExport";

export function useViewerHeaderActions() {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const navigate = useNavigate();
  const { df, selectedDataset } = useDatasetStore();

  const handleDownload = () => {
    if (!df) return;
    const columns = (df.columns as unknown[]).map((c) => String(c ?? ""));
    const values = Array.isArray(df.values) ? (df.values as unknown[][]) : [];
    downloadDataAsCSV(selectedDataset || "dataset", columns, values);
  };

  const handleNavigateManage = () => {
    navigate("/data/manage");
  };

  return {
    saveModalOpen,
    setSaveModalOpen,
    handleDownload,
    handleNavigateManage,
  };
}
