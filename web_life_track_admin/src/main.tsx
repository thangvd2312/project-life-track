import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Routes from "@/routes";
import "@/common/i18n";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Routes />
  </StrictMode>
);
