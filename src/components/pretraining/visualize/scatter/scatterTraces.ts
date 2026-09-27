import type { Data } from "plotly.js";
import { calculateLinearRegressionFit } from "@/lib/bivariate/regressionFit";

const CLASS_COLORS = ["#38bdf8", "#f43f5e", "#10b981", "#a855f7", "#f59e0b"];

export function buildScatterTraces(
  x: number[],
  y: (number | string)[],
  xLabel: string,
  yLabel: string,
  problemType: string | undefined,
  isDark: boolean,
): Data[] {
  if (problemType === "classification") {
    const classes = Array.from(new Set(y.map(String))).sort();
    return classes.map((cls, idx) => {
      const clsX = x.filter((_, i) => String(y[i]) === cls);
      const clsY = y.filter((val) => String(val) === cls);
      const color = CLASS_COLORS[idx % CLASS_COLORS.length];
      return {
        x: clsX,
        y: clsY,
        type: "scatter",
        mode: "markers",
        name: `${yLabel} = ${cls}`,
        marker: { color, size: 7, opacity: 0.8 },
        hovertemplate: `${xLabel}: %{x:.3f}<br>${yLabel}: ${cls}<extra></extra>`,
      };
    });
  }

  const numY = y.map(Number);
  const fit = calculateLinearRegressionFit(x, numY);
  const scatterTrace: Data = {
    x,
    y: numY,
    type: "scatter",
    mode: "markers",
    name: "Data Points",
    marker: { color: isDark ? "#4fc1ff" : "#0284c7", size: 6, opacity: 0.75 },
    hovertemplate: `${xLabel}: %{x:.3f}<br>${yLabel}: %{y:.3f}<extra></extra>`,
  };

  const trendlineTrace: Data = {
    x: fit.trendlineX,
    y: fit.trendlineY,
    type: "scatter",
    mode: "lines",
    name: `Fit: ${fit.equation} (R²=${(fit.r2 * 100).toFixed(1)}%)`,
    line: { color: "#f59e0b", width: 2.5 },
    hoverinfo: "name",
  };

  return [scatterTrace, trendlineTrace];
}
