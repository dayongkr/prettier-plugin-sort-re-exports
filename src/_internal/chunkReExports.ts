import { type ReExport } from "../preprocessor.js";

export function chunkReExports(reExportNodes: ReExport[]): ReExport[][] {
  const reExportChunks: ReExport[][] = [[reExportNodes[0]]];

  let prevNode: ReExport = reExportNodes[0];

  for (let i = 1; i < reExportNodes.length; i++) {
    const node = reExportNodes[i];

    if (prevNode.loc.end.line + 1 === node.loc.start.line) {
      reExportChunks[reExportChunks.length - 1].push(node);
    } else {
      reExportChunks.push([node]);
    }

    prevNode = node;
  }

  return reExportChunks;
}
