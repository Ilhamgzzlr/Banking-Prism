import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@types": path.resolve(__dirname, "./src/types"),
    },
  },
})
