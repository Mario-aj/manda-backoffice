import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../manda/openapi/staff-api.json",
  // Nested so the generator never touches src/shared/api/generated/index.ts
  // — the hand-written facade importing from here. See openapi/README.md.
  output: "src/shared/api/generated/.gen",
  plugins: [
    {
      name: "@hey-api/typescript",
      enums: { mode: "javascript", case: "snake_case" },
    },
  ],
});
