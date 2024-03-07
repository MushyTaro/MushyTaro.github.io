import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/reversi-scy/",
  plugins: [react()],
  server: {
    host: true,
  },
});
