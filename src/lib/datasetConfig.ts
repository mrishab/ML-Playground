import axios from "axios";
import type {
  DatasetConfigEntry,
  DatasetConfigFileMap,
  MappedConfig,
} from "./dataset-config/types";
import { mapConfigToState } from "./dataset-config/mapping";

export type { DatasetConfigEntry, DatasetConfigFileMap, MappedConfig };

let configCache: DatasetConfigFileMap | null = null;

export async function loadDatasetConfig(
  datasetFile: string,
): Promise<MappedConfig | null> {
  try {
    if (!configCache) {
      const url = `${import.meta.env.BASE_URL}datasets/config.json`;
      const response = await axios.get<DatasetConfigFileMap>(url);
      configCache = response.data;
    }

    const datasetConfig = configCache[datasetFile];
    if (!datasetConfig) {
      return null;
    }

    return mapConfigToState(datasetConfig.ml_config);
  } catch (err) {
    console.error("[datasetConfig] Failed to load config:", err);
    return null;
  }
}
