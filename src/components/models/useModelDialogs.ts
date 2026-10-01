import { useState } from "react";
import type { SavedModel } from "@/types/savedModel";

export function useModelDialogs() {
  const [selectedModel, setSelectedModel] = useState<SavedModel | null>(null);
  const [renameTarget, setRenameTarget] = useState<SavedModel | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SavedModel | null>(null);
  const [isClearOpen, setIsClearOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  return {
    selectedModel,
    setSelectedModel,
    renameTarget,
    setRenameTarget,
    deleteTarget,
    setDeleteTarget,
    isClearOpen,
    setIsClearOpen,
    isImportOpen,
    setIsImportOpen,
  };
}
