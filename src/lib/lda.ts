export type LDAModel = {
  classes: string[];
  priors: number[]; // log(π_k)
  means: number[][]; // μ_k  [nClasses × nFeatures]
  /** Σ^{-1} μ_k  precomputed for each class [nClasses × nFeatures] */
  weights: number[][];
  /** ½ μ_k^T Σ^{-1} μ_k  precomputed for each class [nClasses] */
  intercepts: number[];
};

// ─── helpers ────────────────────────────────────────────────────────

/** Compute the mean of each column in a subset of rows. */
function classMean(X: number[][], indices: number[]): number[] {
  const p = X[0].length;
  const mean = new Array<number>(p).fill(0);
  for (const i of indices) {
    for (let j = 0; j < p; j++) mean[j] += X[i][j];
  }
  const n = indices.length;
  for (let j = 0; j < p; j++) mean[j] /= n;
  return mean;
}

/** Pooled within-class covariance matrix (unbiased). */
function pooledCovariance(
  X: number[][],
  labels: string[],
  classes: string[],
  classMeans: number[][],
): number[][] {
  const n = X.length;
  const p = X[0].length;
  const K = classes.length;
  const classMap = new Map(classes.map((c, i) => [c, i]));

  // Accumulate S_w
  const S: number[][] = Array.from({ length: p }, () =>
    new Array<number>(p).fill(0),
  );

  for (let row = 0; row < n; row++) {
    const ci = classMap.get(labels[row])!;
    const mu = classMeans[ci];
    for (let i = 0; i < p; i++) {
      const di = X[row][i] - mu[i];
      for (let j = i; j < p; j++) {
        const dj = X[row][j] - mu[j];
        S[i][j] += di * dj;
      }
    }
  }

  // Divide by (n - K) and mirror
  const denom = n - K;
  for (let i = 0; i < p; i++) {
    for (let j = i; j < p; j++) {
      S[i][j] /= denom;
      S[j][i] = S[i][j];
    }
  }
  return S;
}

/**
 * Invert a symmetric positive-definite matrix via Cholesky decomposition.
 * Falls back to regularisation (adding small ridge to diagonal) if
 * the matrix is near-singular.
 */
function invertSPD(M: number[][]): number[][] {
  const p = M.length;

  // Add small ridge for numerical stability
  const A = M.map((row) => [...row]);
  const ridge = 1e-6;
  for (let i = 0; i < p; i++) A[i][i] += ridge;

  // Cholesky: A = L L^T
  const L: number[][] = Array.from({ length: p }, () =>
    new Array<number>(p).fill(0),
  );

  for (let i = 0; i < p; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) sum += L[i][k] * L[j][k];
      if (i === j) {
        const val = A[i][i] - sum;
        if (val <= 0) {
          throw new Error(
            "Covariance matrix is not positive definite. Try adding more features or data.",
          );
        }
        L[i][j] = Math.sqrt(val);
      } else {
        L[i][j] = (A[i][j] - sum) / L[j][j];
      }
    }
  }

  // Invert L (lower triangular)
  const Linv: number[][] = Array.from({ length: p }, () =>
    new Array<number>(p).fill(0),
  );
  for (let i = 0; i < p; i++) {
    Linv[i][i] = 1 / L[i][i];
    for (let j = i + 1; j < p; j++) {
      let sum = 0;
      for (let k = i; k < j; k++) sum += L[j][k] * Linv[k][i];
      Linv[j][i] = -sum / L[j][j];
    }
  }

  // A^{-1} = (L^T)^{-1} L^{-1} = Linv^T Linv
  const inv: number[][] = Array.from({ length: p }, () =>
    new Array<number>(p).fill(0),
  );
  for (let i = 0; i < p; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = i; k < p; k++) sum += Linv[k][i] * Linv[k][j];
      inv[i][j] = sum;
      inv[j][i] = sum;
    }
  }
  return inv;
}

/** Matrix-vector multiply: result[i] = Σ_j M[i][j] * v[j] */
function matvec(M: number[][], v: number[]): number[] {
  return M.map((row) => row.reduce((s, val, j) => s + val * v[j], 0));
}

/** Dot product */
function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

// ─── public API ─────────────────────────────────────────────────────

/**
 * Fit an LDA model on training data.
 * @param X - training features [nSamples × nFeatures]
 * @param y - training labels (strings)
 */
export function fitLDA(X: number[][], y: string[]): LDAModel {
  const n = X.length;
  const classes = Array.from(new Set(y)).sort();
  const K = classes.length;

  if (K < 2) {
    throw new Error("LDA requires at least 2 classes.");
  }

  // Group row indices by class
  const classIndices = new Map<string, number[]>();
  for (const c of classes) classIndices.set(c, []);
  for (let i = 0; i < n; i++) classIndices.get(y[i])!.push(i);

  // Class means
  const means = classes.map((c) => classMean(X, classIndices.get(c)!));

  // Pooled covariance and its inverse
  const sigma = pooledCovariance(X, y, classes, means);
  const sigmaInv = invertSPD(sigma);

  // Priors (log)
  const priors = classes.map((c) => Math.log(classIndices.get(c)!.length / n));

  // Precompute weights (Σ^{-1} μ_k) and intercepts (½ μ_k^T Σ^{-1} μ_k)
  const weights = means.map((mu) => matvec(sigmaInv, mu));
  const intercepts = means.map((mu, i) => 0.5 * dot(mu, weights[i]));

  return { classes, priors, means, weights, intercepts };
}

/**
 * Predict class labels for new observations.
 * @returns predicted class labels (strings)
 */
export function predictLDA(model: LDAModel, X: number[][]): string[] {
  const { classes, priors, weights, intercepts } = model;
  const K = classes.length;

  return X.map((x) => {
    let bestScore = -Infinity;
    let bestClass = 0;

    for (let k = 0; k < K; k++) {
      // δ_k(x) = x^T w_k - c_k + log(π_k)
      const score = dot(x, weights[k]) - intercepts[k] + priors[k];
      if (score > bestScore) {
        bestScore = score;
        bestClass = k;
      }
    }

    return classes[bestClass];
  });
}

/**
 * Compute posterior probabilities P(class_k | x) via softmax over
 * discriminant scores. Useful for ROC curve computation.
 * @returns Map<classLabel, number[]> — probability per sample per class
 */
export function predictProbaLDA(
  model: LDAModel,
  X: number[][],
): Map<string, number[]> {
  const { classes, priors, weights, intercepts } = model;
  const K = classes.length;
  const n = X.length;

  // Compute raw discriminant scores [n × K]
  const scores: number[][] = X.map((x) =>
    Array.from(
      { length: K },
      (_, k) => dot(x, weights[k]) - intercepts[k] + priors[k],
    ),
  );

  // Softmax per sample
  const result = new Map<string, number[]>();
  for (const c of classes) result.set(c, new Array(n));

  for (let i = 0; i < n; i++) {
    const maxScore = Math.max(...scores[i]);
    const exps = scores[i].map((s) => Math.exp(s - maxScore));
    const sumExp = exps.reduce((a, b) => a + b, 0);

    for (let k = 0; k < K; k++) {
      result.get(classes[k])![i] = exps[k] / sumExp;
    }
  }

  return result;
}
