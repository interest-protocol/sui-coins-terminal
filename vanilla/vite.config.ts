import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "SuiCoinsTerminal",
      formats: ["es", "umd"], // ES module and UMD formats
      fileName: (format) => `index.${format}.js`,
    },
  },
});
