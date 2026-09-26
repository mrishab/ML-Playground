export type LDAModel = {
  classes: string[];
  priors: number[]; // log(π_k)
  means: number[][]; // μ_k  [nClasses × nFeatures]
  /** Σ^{-1} μ_k  precomputed for each class [nClasses × nFeatures] */
  weights: number[][];
  /** ½ μ_k^T Σ^{-1} μ_k  precomputed for each class [nClasses] */
  intercepts: number[];
};
