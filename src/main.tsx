import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./appProvider/AppProvider.tsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider >
        <MantineProvider>
        <App />
        </MantineProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
