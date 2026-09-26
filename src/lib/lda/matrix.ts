/** Compute the mean of each column in a subset of rows. */
export function classMean(X: number[][], indices: number[]): number[] {
  const p = X[0].length;
  const mean = new Array<number>(p).fill(0);
  for (const i of indices) {
    for (let j = 0; j < p; j++) mean[j] += X[i][j];
  }
  const n = indices.length;
  for (let j = 0; j < p; j++) mean[j] /= n;
  return mean;
}

/** Matrix-vector multiply: result[i] = Σ_j M[i][j] * v[j] */
export function matvec(M: number[][], v: number[]): number[] {
  return M.map((row) => row.reduce((s, val, j) => s + val * v[j], 0));
}

/** Dot product */
export function dot(a: number[], b: number[]): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}
