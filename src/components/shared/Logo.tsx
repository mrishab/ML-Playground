import { LogoGradients } from "./LogoGradients";
import { LogoGraphic } from "./LogoGraphic";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "size-7", size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ML Playground logo"
    >
      <LogoGradients />
      <LogoGraphic />
    </svg>
  );
}
