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
  textEditor.edit((edit) => {
    edit.replace(textEditor.selection, markdownRender(componentDocs));
    const l = componentDocs.length;

		const message = localize('extension.insertReactDoc.showInformationMessage', '成功插入{0}个组件文档', l);
    // Display a message box to the user
    vscode.window.showInformationMessage(message);
  });
};
