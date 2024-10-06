import { describe, it, expect } from "vitest";
import * as prettier from "prettier";

describe("plugin", () => {
  it("should sort re-exports", async () => {
    const code = `export { snakeCase } from "./string/snakeCase.ts";
export { camelCase } from "./string/camelCase.ts";
export { kebabCase } from "./string/kebabCase.ts";`;
    const expected = `export { camelCase } from "./string/camelCase.ts";
export { kebabCase } from "./string/kebabCase.ts";
export { snakeCase } from "./string/snakeCase.ts";
`;
    const prettiered = await prettier.format(code, {
      parser: "typescript",
      plugins: ["./dist/index.js"],
    });
    expect(prettiered).toBe(expected);
  });

  it("should sort re-exports each chunk", async () => {
    const code = `export { snakeCase } from "./string/snakeCase.ts";
export { camelCase } from "./string/camelCase.ts";
export { kebabCase } from "./string/kebabCase.ts";

export { foo } from "./foo.ts";
export { bar } from "./bar.ts";
export { baz } from "./baz.ts";`;
    const expected = `export { camelCase } from "./string/camelCase.ts";
export { kebabCase } from "./string/kebabCase.ts";
export { snakeCase } from "./string/snakeCase.ts";

export { bar } from "./bar.ts";
export { baz } from "./baz.ts";
export { foo } from "./foo.ts";
`;
    const prettiered = await prettier.format(code, {
      parser: "typescript",
      plugins: ["./dist/index.js"],
    });
    expect(prettiered).toBe(expected);
  });

  it("should sort re-exports with remaining comments", async () => {
    const code = `// comment
export { snakeCase } from "./string/snakeCase.ts";
export { camelCase } from "./string/camelCase.ts";
export { kebabCase } from "./string/kebabCase.ts";
// comment
export * from "./foo.ts";
export { bar } from "./bar.ts";
export { baz } from "./baz.ts";`;
    const expected = `// comment
export { camelCase } from "./string/camelCase.ts";
export { kebabCase } from "./string/kebabCase.ts";
export { snakeCase } from "./string/snakeCase.ts";
// comment
export { bar } from "./bar.ts";
export { baz } from "./baz.ts";
export * from "./foo.ts";
`;
    const prettiered = await prettier.format(code, {
      parser: "typescript",
      plugins: ["./dist/index.js"],
    });
    expect(prettiered).toBe(expected);
  });
});
