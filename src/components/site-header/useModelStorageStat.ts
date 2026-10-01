import { useSavedModelsStore } from "@/stores/savedModels";

export function useModelStorageStat() {
  const formattedSize = useSavedModelsStore((s) => s.formattedSize);
  const modelCount = useSavedModelsStore((s) => s.models.length);
  const totalBytes = useSavedModelsStore((s) => s.totalBytes);

  return { formattedSize, modelCount, totalBytes };
}
