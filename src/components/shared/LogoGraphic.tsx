import { LogoNeuralNet } from "./LogoNeuralNet";

export function LogoGraphic() {
  return (
    <>
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
      <LogoNeuralNet />
      <path
        d="M13.5 11.7C13.5 10.9 14.4 10.4 15.1 10.8L21.2 14.7C21.8 15.1 21.8 16.0 21.2 16.4L15.1 20.3C14.4 20.7 13.5 20.2 13.5 19.4V11.7Z"
        fill="url(#mlp-play-grad)"
      />
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
    </>
  );
}
