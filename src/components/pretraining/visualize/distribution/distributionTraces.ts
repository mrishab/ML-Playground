import type { Data } from "plotly.js";
import { getQuantile } from "@/lib/stats";

const PALETTE = ["#4fc1ff", "#4ade80", "#facc15", "#f87171", "#c084fc"];

export function buildDistributionTraces(
  x: number[],
  y: (number | string)[],
  problemType?: string,
): Data[] {
  if (problemType === "classification") {
    const classes = Array.from(new Set(y.map(String))).sort();
    return classes.map((cls, idx) => ({
      type: "box",
      name: `Class: ${cls}`,
      y: x.filter((_, i) => String(y[i]) === cls),
      boxpoints: "outliers",
      marker: { color: PALETTE[idx % PALETTE.length], size: 4 },
      line: { color: PALETTE[idx % PALETTE.length], width: 1.5 },
    }));
  }

  const sortedX = [...x].sort((a, b) => a - b);
  const q1 = getQuantile(sortedX, 0.25);
  const q2 = getQuantile(sortedX, 0.5);
  const q3 = getQuantile(sortedX, 0.75);

  const bins = [
    { name: `Q1: ≤${q1.toFixed(1)}`, pred: (v: number) => v <= q1 },
    {
      name: `Q2: ${q1.toFixed(1)}-${q2.toFixed(1)}`,
      pred: (v: number) => v > q1 && v <= q2,
    },
    {
      name: `Q3: ${q2.toFixed(1)}-${q3.toFixed(1)}`,
      pred: (v: number) => v > q2 && v <= q3,
    },
    { name: `Q4: >${q3.toFixed(1)}`, pred: (v: number) => v > q3 },
  ];

  const numY = y.map(Number);
  return bins.map((bin, idx) => ({
    type: "box",
    name: bin.name,
    y: numY.filter((_, i) => bin.pred(x[i])),
    boxpoints: "outliers",
    marker: { color: PALETTE[idx % PALETTE.length], size: 4 },
    line: { color: PALETTE[idx % PALETTE.length], width: 1.5 },
  }));
}
