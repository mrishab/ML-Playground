import type { DataFrame } from "danfojs";
import type { SelectedFeature } from "@/stores/mlConfig";
import type { FeatureSeriesData } from "@/types/dataset";

export function applyTransformation(
  df: DataFrame,
  feature: SelectedFeature,
): { column: number[]; name: string } {
  const values = df.column(feature.column).values as number[];
  const baseName = feature.column;

  if (feature.transformation === "polynomial") {
    const degree = feature.polynomialDegree ?? 2;
    return {
      column: values.map((v) => Math.pow(v, degree)),
      name: `${baseName}^${degree}`,
    };
  }

  if (feature.transformation === "interaction" && feature.interactionWith) {
    const otherValues = df.column(feature.interactionWith).values as number[];
    return {
      column: values.map((v, i) => v * otherValues[i]),
      name: `${baseName}*${feature.interactionWith}`,
    };
  }

  return { column: values, name: baseName };
}

export function buildFeatureColumns(
  df: DataFrame,
  features: SelectedFeature[],
): FeatureSeriesData {
  const data: FeatureSeriesData = {};
  for (const feature of features) {
    const { column, name } = applyTransformation(df, feature);
    let finalName = name;
    let counter = 1;
    while (finalName in data) {
      finalName = `${name}_${counter}`;
      counter++;
    }
    data[finalName] = column;
  }
  return data;
}
