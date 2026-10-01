import type { SavedModel } from "@/types/savedModel";

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadModelJSON(model: SavedModel): void {
  const jsonStr = JSON.stringify(model, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const safeName = model.name.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  triggerDownload(blob, `${safeName}_${model.id.slice(0, 8)}.json`);
}

export function downloadAllModelsBundle(models: SavedModel[]): void {
  const bundle = {
    app: "ML-Playground",
    exportedAt: new Date().toISOString(),
    count: models.length,
    models,
  };
  const blob = new Blob([JSON.stringify(bundle, null, 2)], {
    type: "application/json",
  });
  triggerDownload(blob, `ml_playground_models_${Date.now()}.json`);
}

export function parseImportJSON(rawText: string): SavedModel[] {
  const data = JSON.parse(rawText);
  let list: unknown[] = [];
  if (Array.isArray(data)) list = data;
  else if (data && typeof data === "object" && Array.isArray((data as { models?: unknown[] }).models)) {
    list = (data as { models: unknown[] }).models;
  } else if (data && typeof data === "object" && "algorithm" in data) {
    list = [data];
  }
  return list.filter((item): item is SavedModel => {
    return Boolean(
      item &&
        typeof item === "object" &&
        "algorithm" in item &&
        "name" in item,
    );
  });
}
