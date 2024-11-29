import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

export default defineConfig({
  plugins: [react()],
  server: {
    https:
      // eslint-disable-next-line no-undef
      process.env.NODE_ENV === "development"
        ? {
            key: fs.readFileSync("./certs/localhost.key"),
            cert: fs.readFileSync("./certs/localhost.crt"),
          }
        : false,
    host: "localhost",
    port: 5173,
  },
});
