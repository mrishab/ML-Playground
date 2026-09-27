export function computeSlopeAndR2(
  x: number[],
  y: number[],
  meanX: number,
  meanY: number,
  n: number,
) {
  let num = 0;
  let den = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    den += dx * dx;
    ssTot += dy * dy;
  }
  const slope = den !== 0 ? num / den : 0;
  const intercept = meanY - slope * meanX;

  let ssRes = 0;
  for (let i = 0; i < n; i++) {
    const res = y[i] - (slope * x[i] + intercept);
    ssRes += res * res;
  }
  const r2 = ssTot !== 0 ? Math.max(0, 1 - ssRes / ssTot) : 0;
  return { slope, intercept, r2 };
}
