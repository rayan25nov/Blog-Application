import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      inlineDynamicImports: true,
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
