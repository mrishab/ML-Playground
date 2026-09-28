import { useState } from "react";
import type { ScaledPoint } from "./lossPlotScales";

export function useLossPlotHover(points: ScaledPoint[], svgWidth: number) {
  const [hovered, setHovered] = useState<ScaledPoint | null>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    if (points.length === 0) return;
    const closest = points.reduce((prev, curr) =>
      Math.abs(curr.x - svgX) < Math.abs(prev.x - svgX) ? curr : prev,
    );
    setHovered(closest);
  };

  const handleMouseLeave = () => setHovered(null);

  return { hovered, handleMouseMove, handleMouseLeave };
}
