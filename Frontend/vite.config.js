import { defineConfig } from "vite";

export default defineConfig({
  server: {
    https: {
      key: "./keys/localhost-key.pem",
      cert: "./keys/localhost-cert.pem",
    },
    host: true,
    port: 3000,
  },
  esbuild: {
    include: /\.[jt]sx?$/,
    exclude: [],
    loader: "jsx",
  },
});
