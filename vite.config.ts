import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(() => ({
  base: "/ML-Playground/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icon.svg"],
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15 MB
      },
      manifest: {
        name: "ML Playground",
        short_name: "ML Playground",
        description:
          "Machine Learning Playground - Train and compare ML models in browser",
        theme_color: "#4f46e5",
        background_color: "#09090b",
        display: "standalone",
        orientation: "any",
        icons: [
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
    }),
  ],
  resolve: {
    dedupe: [
      "@tensorflow/tfjs",
      "@tensorflow/tfjs-core",
      "@tensorflow/tfjs-backend-cpu",
      "@tensorflow/tfjs-backend-webgl",
      "@tensorflow/tfjs-converter",
      "@tensorflow/tfjs-data",
      "@tensorflow/tfjs-layers",
    ],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: "ES2020",
    chunkSizeWarningLimit: 15000,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "INVALID_ANNOTATION") {
          return;
        }
        warn(warning);
      },
    },
  },
  esbuild: {
    target: "ES2020",
  },
}));
