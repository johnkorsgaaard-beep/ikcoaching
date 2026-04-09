import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  const shreddedUrl =
    env.VITE_SHREDDED_LEADS_URL ||
    "https://www.shreddedapp.io/api/leads/inbound/lead_zgdatk3jyuql98dqsko5hkfw";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/inbound-lead": {
          target: shreddedUrl,
          changeOrigin: true,
          rewrite: () => "",
        },
      },
    },
  };
});
