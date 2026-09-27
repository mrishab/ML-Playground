export function getCorrelationStrength(absR: number): string {
  if (absR >= 0.7) return "Strong";
  if (absR >= 0.4) return "Moderate";
  if (absR >= 0.2) return "Weak";
  return "Negligible";
}

export function getCorrelationDirection(r: number): string {
  if (Math.abs(r) < 0.05) return "Neutral";
  return r > 0 ? "Positive" : "Negative";
}
