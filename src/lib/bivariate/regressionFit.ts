import { computeSlopeAndR2 } from "./computeSlopeAndR2";

export interface RegressionFit {
  slope: number;
  intercept: number;
  r2: number;
  equation: string;
  trendlineX: number[];
  trendlineY: number[];
}

const EMPTY_FIT: RegressionFit = {
  slope: 0,
  intercept: 0,
  r2: 0,
  equation: "y = 0",
  trendlineX: [],
  trendlineY: [],
};

export function calculateLinearRegressionFit(
  x: number[],
  y: number[],
): RegressionFit {
  const n = Math.min(x.length, y.length);
  if (n < 2) return EMPTY_FIT;

  let sumX = 0;
  let sumY = 0;
  let minX = x[0];
  let maxX = x[0];
  for (let i = 0; i < n; i++) {
    sumX += x[i];
    sumY += y[i];
    if (x[i] < minX) minX = x[i];
    if (x[i] > maxX) maxX = x[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  const { slope, intercept, r2 } = computeSlopeAndR2(x, y, meanX, meanY, n);
  const sign = intercept >= 0 ? "+" : "-";
  const absB = Math.abs(intercept).toFixed(2);
  const equation = `y = ${slope.toFixed(2)}x ${sign} ${absB}`;

  return {
    slope,
    intercept,
    r2,
    equation,
    trendlineX: [minX, maxX],
    trendlineY: [slope * minX + intercept, slope * maxX + intercept],
  };
}
