import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/main.ts"],
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: false,
  noExternal: [/.*/],
  bundle: true,
  outDir: "dist",
  target: "node20",
  format: "cjs",
  platform: "node",
  treeshake: true,
  dts: false,
});
