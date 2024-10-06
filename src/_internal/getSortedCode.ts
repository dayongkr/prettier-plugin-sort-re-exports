import { ReExport } from "../preprocessor.js";

export function getSortedCode(code: string, chunks: ReExport[][]) {
  const splited = code.split("\n");
  const result = splited.slice();

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkStartIndex = chunk[0].loc.start.line - 1;

    chunk.sort((a, b) => a.source.value.localeCompare(b.source.value));

    for (let j = 0; j < chunk.length; j++) {
      const node = chunk[j];
      const nodeStartIndex = node.loc.start.line - 1;
      const nodeEndIndex = node.loc.end.line - 1;

      const nodeCode = splited.slice(nodeStartIndex, nodeEndIndex + 1);

      for (let k = 0; k < nodeCode.length; k++) {
        result[chunkStartIndex + j + k] = nodeCode[k];
      }
    }
  }

  return result.join("\n");
}
