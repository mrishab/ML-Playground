import { useState } from "react";
import { useDatasetStore } from "@/stores/dataset";
import { useSavedDatasetsStore } from "@/stores/savedDatasets";
import { buildSavedDataset } from "@/lib/datasets/buildSavedDataset";

export function useSaveDatasetModal(onClose: () => void) {
  const { df, selectedDataset } = useDatasetStore();
  const saveDataset = useSavedDatasetsStore((s) => s.saveDataset);

  const initialName = `${selectedDataset || "dataset"}_clean`;
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!df || !name.trim()) return;
    const columns = (df.columns as unknown[]).map((c) => String(c ?? ""));
    const values = Array.isArray(df.values) ? (df.values as unknown[][]) : [];

    const saved = buildSavedDataset({
      name: name.trim(),
      description: description.trim(),
      columns,
      values,
      source: "cleaned",
      originalDatasetName: selectedDataset,
    });

    saveDataset(saved);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
      setIsSaved(false);
    }, 1000);
  };

  return { name, setName, description, setDescription, isSaved, handleSave };
}
