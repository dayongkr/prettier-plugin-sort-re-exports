import { parse } from "@babel/parser";
import type { ParserOptions } from "prettier";
import type {
  ExportNamedDeclaration,
  ExportAllDeclaration,
} from "@babel/types";
import { chunkReExports } from "./_internal/chunkReExports.js";
import { getSortedCode } from "./_internal/getSortedCode.js";

export type ReExport = (ExportNamedDeclaration | ExportAllDeclaration) & {
  source: {
    value: string;
  };
  loc: {
    start: {
      line: number;
    };
    end: {
      line: number;
    };
  };
};

export function preprocessor<T>(code: string): string {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript"],
  });

  const reExportNodes = ast.program.body.filter(
    (node) =>
      (node.type === "ExportNamedDeclaration" ||
        node.type === "ExportAllDeclaration") &&
      node.source
  ) as ReExport[];

  if (reExportNodes.length <= 1) {
    return code;
  }

  const reExportChunks: ReExport[][] = chunkReExports(reExportNodes);
  return getSortedCode(code, reExportChunks);
}
