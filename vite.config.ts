import { defineConfig } from "vite";
import { copyFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  optimizeDeps: { exclude: ["pyodide"] },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    }
  },
  plugins: [
    {
      name: "vite-plugin-pyodide",
      generateBundle: async () => {
        const assetsDir = "dist/assets";
        await mkdir(assetsDir, { recursive: true });
        const files = [
          "pyodide-lock.json",
          "pyodide.asm.js",
          "pyodide.asm.wasm",
          "python_stdlib.zip",
        ];
        const modulePath = fileURLToPath(import.meta.resolve("pyodide"));
        for (const file of files) {
          await copyFile(
            join(dirname(modulePath), file),
            join(assetsDir, file),
          );
        }
      },
    },
  ],
});