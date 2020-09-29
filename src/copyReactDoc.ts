import * as vscode from 'vscode';
import { markdownRender } from 'react-docgen-typescript-markdown-render';
import { reactDocgen } from './reactDocgen';
import { Options } from "./types";

export const copyReactDoc = async (file: vscode.Uri, options: Options) => {
  const componentDocs = await reactDocgen(file, options);
  try {
    await vscode.env.clipboard.writeText(markdownRender(componentDocs));
    const l = componentDocs.length;
    // Display a message box to the user
    vscode.window.showInformationMessage(l > 0 ? `Copy ${l} component document` : `Copy ${l} component documents`);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
};
