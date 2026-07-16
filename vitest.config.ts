import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    globals: false,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      include: [
        "src/lib/content/**/*.ts",
        "src/lib/request-ip.ts",
      ],
      thresholds: {
        lines: 70,
        functions: 85,
        branches: 40,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
