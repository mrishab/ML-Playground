import type { LossPoint } from "@/types/loss";

export interface PlotDimensions {
  width: number;
  height: number;
  padLeft: number;
  padRight: number;
  padTop: number;
  padBottom: number;
}

export const DEFAULT_DIM: PlotDimensions = {
  width: 620,
  height: 240,
  padLeft: 52,
  padRight: 20,
  padTop: 16,
  padBottom: 36,
};

export interface ScaledPoint {
  x: number;
  y: number;
  step: number;
  loss: number;
  valLoss?: number;
  secondary?: number;
}

export function buildScales(
  history: LossPoint[],
  totalSteps: number,
  dim: PlotDimensions,
) {
  const maxStep = Math.max(totalSteps, history[history.length - 1]?.step ?? 1);
  const allLosses = history
    .map((h) => h.loss)
    .concat(
      history
        .map((h) => h.valLoss)
        .filter((v): v is number => typeof v === "number"),
    );

  const initialLoss = history[0]?.loss ?? 1;
  const initialValLoss = history[0]?.valLoss ?? initialLoss;
  const initialPeak = Math.max(initialLoss, initialValLoss);

  const rawMin = allLosses.length > 0 ? Math.min(...allLosses) : 0;
  const rawMax = allLosses.length > 0 ? Math.max(...allLosses, initialPeak) : 1;

  // Anchor minLoss at 0 for standard non-negative loss metrics
  const minLoss = rawMin < 0 ? rawMin * 1.1 : 0;
  // Anchor maxLoss with stable headroom so axis does not jump as loss decreases
  const maxLoss = rawMax > 0 ? rawMax * 1.08 : 1;

  const plotW = dim.width - dim.padLeft - dim.padRight;
  const plotH = dim.height - dim.padTop - dim.padBottom;

  const toX = (step: number) =>
    dim.padLeft + ((step - 1) / (maxStep - 1 || 1)) * plotW;
  const toY = (val: number) =>
    dim.padTop + (1 - (val - minLoss) / (maxLoss - minLoss || 1)) * plotH;

  return { toX, toY, minLoss, maxLoss, plotW, plotH, maxStep };
}
