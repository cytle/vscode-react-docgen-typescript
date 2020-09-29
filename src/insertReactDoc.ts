import * as vscode from 'vscode';
import { markdownRender } from 'react-docgen-typescript-markdown-render';
import { reactDocgen } from './reactDocgen';
import { Options } from "./types";

export const insertReactDoc = async (textEditor: vscode.TextEditor, options: Options) => {
  // The code you place here will be executed every time your command is executed
  const [file] = await vscode.window.showOpenDialog({
    canSelectFiles: true,
    canSelectFolders: false,
    canSelectMany: false,
    filters: {
      TypeScript: ['ts', 'tsx'],
    },
  }) || [];
  if (!file) {
    return;
  }
  const componentDocs = await reactDocgen(file, options);
  textEditor.edit((edit) => {
    edit.replace(textEditor.selection, markdownRender(componentDocs));
    const l = componentDocs.length;
    // Display a message box to the user
    vscode.window.showInformationMessage(l > 0 ? `Insert ${l} component document` : `Insert ${l} component documents`);
  });
};
