
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  window.addEventListener("error", (event) => {
    console.error("[Global] Unhandled error:", event.error ?? event.message);
  });

  window.addEventListener("unhandledrejection", (event) => {
    console.error("[Global] Unhandled promise rejection:", event.reason);
  });

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element with id 'root' not found. Ensure your index.html contains <div id=\"root\"></div>.");
  }

  createRoot(rootElement).render(<App />);
