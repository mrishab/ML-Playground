export const BREADCRUMB_MAP = {
  data: "Data Ingestion",
  select: "Select Dataset",
  transform: "Transform",
  pretrain: "Pretraining",
  explore: "Explore",
  visualize: "Visualize",
  analyze: "Analyze",
  train: "Training",
  linear: "Linear Regression",
  knn: "KNN",
  lda: "LDA",
  logistic: "Logistic Regression",
  comparison: "Comparison",
  classification: "Classification",
  regression: "Regression",
  clustering: "Clustering",
  validation: "Validation & Results",
} as const satisfies Record<string, string>;

export type BreadcrumbSegment = keyof typeof BREADCRUMB_MAP;

export function getBreadcrumbLabel(segment: string): string {
  if (segment in BREADCRUMB_MAP) {
    return BREADCRUMB_MAP[segment as BreadcrumbSegment];
  }
  return segment;
}
