import { defineConfig } from "vite";
import unocss from "unocss/vite";

export default defineConfig({
  root: "./playground",
  plugins: [unocss()],
});