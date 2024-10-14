import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  preview: {
    port: 1234,
  },
  server: {
    port: 1234,
  },
});
