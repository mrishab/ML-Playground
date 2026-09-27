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
      <defs>
        <linearGradient
          id="mlp-bg-grad"
          x1="2"
          y1="2"
          x2="30"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4F46E5" />
          <stop offset="0.5" stopColor="#0284C7" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
        <linearGradient
          id="mlp-play-grad"
          x1="13"
          y1="11"
          x2="22"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>

      {/* App Icon Container with Inset Rim */}
      <rect width="32" height="32" rx="8" fill="url(#mlp-bg-grad)" />
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="7.25"
        fill="none"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1"
      />

      {/* Neural Network Interconnects forming M */}
      <g
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        <line x1="8" y1="9.5" x2="14" y2="16" />
        <line x1="8" y1="22.5" x2="14" y2="16" />
        <line
          x1="8"
          y1="9.5"
          x2="8"
          y2="22.5"
          strokeOpacity="0.75"
          strokeWidth="1.8"
        />
        <line x1="14" y1="16" x2="23" y2="9.5" />
        <line
          x1="23"
          y1="9.5"
          x2="23"
          y2="22.5"
          strokeOpacity="0.75"
          strokeWidth="1.8"
        />
      </g>

      {/* Play Action Triangle in center */}
      <path
        d="M13.5 11.7C13.5 10.9 14.4 10.4 15.1 10.8L21.2 14.7C21.8 15.1 21.8 16.0 21.2 16.4L15.1 20.3C14.4 20.7 13.5 20.2 13.5 19.4V11.7Z"
        fill="url(#mlp-play-grad)"
      />

      {/* Synaptic Nodes */}
      <circle cx="8" cy="9.5" r="2" fill="white" />
      <circle cx="8" cy="22.5" r="2" fill="white" />
      <circle cx="23" cy="9.5" r="2" fill="white" />
      <circle cx="23" cy="22.5" r="2" fill="white" />
      <circle
        cx="14"
        cy="16"
        r="1.5"
        fill="#38BDF8"
        stroke="white"
        strokeWidth="0.8"
      />
    </svg>
  );
}
