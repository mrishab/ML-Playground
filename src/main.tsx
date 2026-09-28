import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initConsoleLogger } from "@/lib/consoleLogger";
import App from "./App.tsx";

initConsoleLogger();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
