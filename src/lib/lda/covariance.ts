/** Pooled within-class covariance matrix (unbiased). */
export function pooledCovariance(
  X: number[][],
  labels: string[],
  classes: string[],
  classMeans: number[][],
): number[][] {
  const n = X.length;
  const p = X[0].length;
  const K = classes.length;
  const classMap = new Map(classes.map((c, i) => [c, i]));

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

  const denom = n - K;
  for (let i = 0; i < p; i++) {
    for (let j = i; j < p; j++) {
      S[i][j] /= denom;
      S[j][i] = S[i][j];
    }
  }
  return S;
}
