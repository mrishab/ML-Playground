/** Per-class precision, recall, F1, and support */
export type PerClassMetrics = {
  label: string;
  precision: number;
  recall: number;
  f1Score: number;
  support: number; // number of actual instances of this class
};

/** A single point on the ROC curve */
export type ROCPoint = {
  fpr: number; // false positive rate
  tpr: number; // true positive rate
  threshold: number;
};

/** ROC data for one class (one-vs-rest) */
export type ClassROC = {
  label: string;
  points: ROCPoint[];
  auc: number;
};

/** Full classification metrics bundle */
export type ClassificationMetrics = {
  // Confusion matrix: matrix[actual][predicted] = count
  confusionMatrix: number[][];
  labels: string[];

  // Overall
  accuracy: number;
  totalSamples: number;
  correctPredictions: number;

  // Per-class
  perClass: PerClassMetrics[];

  // Macro averages
  macroPrecision: number;
  macroRecall: number;
  macroF1: number;

  // Weighted averages
  weightedPrecision: number;
  weightedRecall: number;
  weightedF1: number;

  // ROC curves (one per class, one-vs-rest)
  rocCurves: ClassROC[];

  // Raw predictions
  predictions: string[];
  actuals: string[];
};
