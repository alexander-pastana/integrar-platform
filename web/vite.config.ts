import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    react(),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  build: {
    // Garante que o Vite vai buildar o app focado no lado do cliente (SPA)
    ssr: false,
  }
});