/** Cholesky decomposition of symmetric positive definite matrix A = L L^T */
export function choleskyDecompose(A: number[][]): number[][] {
  const p = A.length;
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
  return L;
}
