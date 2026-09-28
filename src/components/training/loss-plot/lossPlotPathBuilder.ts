import type { LossPoint } from "@/types/loss";
import {
  buildScales,
  type PlotDimensions,
  type ScaledPoint,
} from "./lossPlotScales";

export function buildLossPaths(
  history: LossPoint[],
  totalSteps: number,
  dim: PlotDimensions,
) {
  const { toX, toY, minLoss, maxLoss, plotH, maxStep } = buildScales(
    history,
    totalSteps,
    dim,
  );

  const baselineY = dim.padTop + plotH;
  const points: ScaledPoint[] = history.map((pt) => ({
    x: toX(pt.step),
    y: toY(pt.loss),
    step: pt.step,
    loss: pt.loss,
    valLoss: pt.valLoss,
    secondary: pt.secondary,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const first = points[0];
  const last = points[points.length - 1];
  const areaPath =
    first && last
      ? `${linePath} L ${last.x.toFixed(1)} ${baselineY.toFixed(1)} L ${first.x.toFixed(1)} ${baselineY.toFixed(1)} Z`
      : "";

  const hasVal = history.some((h) => h.valLoss !== undefined);
  const valLinePath = hasVal
    ? history
        .map(
          (h, i) =>
            `${i === 0 ? "M" : "L"} ${toX(h.step).toFixed(1)} ${toY(h.valLoss ?? h.loss).toFixed(1)}`,
        )
        .join(" ")
    : null;

  return { points, linePath, areaPath, valLinePath, minLoss, maxLoss, maxStep };
}
