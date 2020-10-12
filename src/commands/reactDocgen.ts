import * as vscode from 'vscode';
import * as docgen from 'react-docgen-typescript';
import { Options } from "../types";

export async function reactDocgen(file: vscode.Uri, options: Options) {
  let componentDocs = docgen.parse(file.path, {
    savePropValueAsString: true,
    shouldExtractValuesFromUnion: true,
  });
  if (options.all || componentDocs.length <= 1) {
    return componentDocs;
  }

  const components = await vscode.window.showQuickPick(componentDocs.map(vo => ({
    label: vo.displayName,
    description: vo.description,
    detail: Object.keys(vo.props).join(' | '),
  })), {
    canPickMany: true
  }) || [];
  const set = new Set(components.map(vo => vo.label));
  return componentDocs.filter(vo => set.has(vo.displayName));
}
