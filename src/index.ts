import { type Plugin } from "prettier";
import parserBabel from "prettier/parser-babel";
import parserTypescript from "prettier/parser-typescript";
import { preprocessor } from "./preprocessor.js";

const { parsers: babelParsers } = parserBabel;
const { parsers: typescriptParsers } = parserTypescript;

const plugin = {
  parsers: {
    babel: { ...babelParsers.babel, preprocess: preprocessor },
    typescript: { ...typescriptParsers.typescript, preprocess: preprocessor },
  },
} satisfies Plugin;

export default plugin;
