import { formatNumber } from "@/lib/number";
import type { BivariateAnalysis } from "@/lib/bivariate";

export interface StatRow {
  metric: string;
  x: string | number;
  y: string | number;
}

export function buildStatsRows(analysis: BivariateAnalysis): StatRow[] {
  const { xStats, yStats } = analysis;
  return [
    { metric: "Observations (n)", x: xStats.count, y: yStats.count },
    {
      metric: "Mean",
      x: formatNumber(xStats.mean),
      y: formatNumber(yStats.mean),
    },
    {
      metric: "Std Deviation",
      x: formatNumber(xStats.std),
      y: formatNumber(yStats.std),
    },
    {
      metric: "Minimum",
      x: formatNumber(xStats.min),
      y: formatNumber(yStats.min),
    },
    {
      metric: "25th Percentile (Q1)",
      x: formatNumber(xStats.q25),
      y: formatNumber(yStats.q25),
    },
    {
      metric: "Median (50%)",
      x: formatNumber(xStats.median),
      y: formatNumber(yStats.median),
    },
    {
      metric: "75th Percentile (Q3)",
      x: formatNumber(xStats.q75),
      y: formatNumber(yStats.q75),
    },
    {
      metric: "Maximum",
      x: formatNumber(xStats.max),
      y: formatNumber(yStats.max),
    },
    {
      metric: "Interquartile Range (IQR)",
      x: formatNumber(xStats.iqr),
      y: formatNumber(yStats.iqr),
    },
  ];
}
