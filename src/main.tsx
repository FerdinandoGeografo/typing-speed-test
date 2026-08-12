import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TypingSpeedTestProvider } from "./contexts/TypingSpeedTestContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TypingSpeedTestProvider>
      <App />
    </TypingSpeedTestProvider>
  </StrictMode>,
);
