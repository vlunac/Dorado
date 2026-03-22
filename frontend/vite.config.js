import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls to the FastAPI backend during development.
    // This means you call /api/... in your frontend and Vite forwards
    // them to http://localhost:8000/... — no CORS issues in dev.
    proxy: {
      "/auth":      { target: "http://localhost:8000", changeOrigin: true },
      "/startups":  { target: "http://localhost:8000", changeOrigin: true },
      "/investors": { target: "http://localhost:8000", changeOrigin: true },
      "/matches":   { target: "http://localhost:8000", changeOrigin: true },
      "/summaries": { target: "http://localhost:8000", changeOrigin: true },
    },
  },
});
