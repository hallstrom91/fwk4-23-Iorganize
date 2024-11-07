import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@login": "/src/components/authentication/login",
      "@register": "/src/components/authentication/register",
      "@board": "/src/components/board",
      "@publicLayout": "/src/components/layout/public",
      "@privateLayout": "/src/components/layout/private",
      "@modal": "/src/components/modal",
      "@navbar": "/src/components/navigation/navbar",
      "@footer": "/src/components/navigation/footer",
      "@sidebar": "/src/components/navigation/sidebar",
      "@contexts": "/src/contexts",
      "@routes": "/src/routes",
      "@utils": "/src/utils",
    },
  },
});
