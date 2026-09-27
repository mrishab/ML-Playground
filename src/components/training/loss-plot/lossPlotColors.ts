import type { AlgorithmKind } from "@/types/loss";

export type Palette = {
  primary: string;
  fill: string;
  secondary: string;
  val: string;
};

export const COLOR_PALETTES = {
  regression: {
    primary: "#0284c7",
    fill: "rgba(2, 132, 199, 0.12)",
    secondary: "#38bdf8",
    val: "#f97316",
  },
  classification: {
    primary: "#10b981",
    fill: "rgba(16, 185, 129, 0.12)",
    secondary: "#06b6d4",
    val: "#ec4899",
  },
  clustering: {
    primary: "#f43f5e",
    fill: "rgba(244, 63, 94, 0.12)",
    secondary: "#14b8a6",
    val: "#8b5cf6",
  },
} as const satisfies Record<AlgorithmKind, Palette>;
