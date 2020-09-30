import * as vscode from 'vscode';
import { markdownRender } from 'react-docgen-typescript-markdown-render';
import { reactDocgen } from './reactDocgen';
import { Options } from "../types";
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

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
  if (componentDocs.length === 0) {
    return;
  }
  textEditor.edit((edit) => {
    edit.replace(textEditor.selection, markdownRender(componentDocs));
    const l = componentDocs.length;

    const message = l > 1
      ? localize('extension.insertReactDoc.showInformationMessage', 'Successfully inserted {0} component documents', l)
      : localize('extension.insertReactDoc.showInformationMessage', 'Successfully inserted {0} component document', l);
    // Display a message box to the user
    vscode.window.showInformationMessage(message);
  });
};
