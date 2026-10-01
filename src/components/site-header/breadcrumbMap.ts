export const BREADCRUMB_MAP = {
  data: "Data Ingestion",
  select: "Select Dataset",
  transform: "Transform",
  pretrain: "Pretraining",
  explore: "Explore & Split",
  visualize: "Feature Analysis",
  analyze: "Feature Analysis",
  train: "Training",
  linear: "Linear Regression",
  knn: "KNN",
  lda: "LDA",
  logistic: "Logistic Regression",
  clustering: "K-Means Clustering",
  models: "Saved Models",
} as const satisfies Record<string, string>;

export type BreadcrumbSegment = keyof typeof BREADCRUMB_MAP;

export function getBreadcrumbLabel(segment: string): string {
  if (segment in BREADCRUMB_MAP) {
    return BREADCRUMB_MAP[segment as BreadcrumbSegment];
  }
  return segment;
}
