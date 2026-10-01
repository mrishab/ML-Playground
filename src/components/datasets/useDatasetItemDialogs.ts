import { useState } from "react";
import type { SavedDataset } from "@/types/savedDataset";

export function useDatasetItemDialogs() {
  const [inspectDataset, setInspectDataset] = useState<SavedDataset | null>(null);
  const [renameDataset, setRenameDataset] = useState<SavedDataset | null>(null);
  const [deleteDataset, setDeleteDataset] = useState<SavedDataset | null>(null);
  const [isClearOpen, setIsClearOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  return {
    inspectDataset,
    setInspectDataset,
    renameDataset,
    setRenameDataset,
    deleteDataset,
    setDeleteDataset,
    isClearOpen,
    setIsClearOpen,
    isImportOpen,
    setIsImportOpen,
  };
}
