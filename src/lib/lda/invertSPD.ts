import { choleskyDecompose } from "./cholesky";

/**
 * Invert a symmetric positive-definite matrix via Cholesky decomposition.
 * Falls back to regularisation (adding small ridge to diagonal).
 */
export function invertSPD(M: number[][]): number[][] {
  const p = M.length;
  const A = M.map((row) => [...row]);
  const ridge = 1e-6;
  for (let i = 0; i < p; i++) A[i][i] += ridge;

  const L = choleskyDecompose(A);

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
