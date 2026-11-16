import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { LightProvider } from "./context/LightContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LightProvider>
        <App />
      </LightProvider>
    </BrowserRouter>
  </StrictMode>
);
