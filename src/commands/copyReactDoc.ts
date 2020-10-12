import * as vscode from 'vscode';
import { reactDocgen } from './reactDocgen';
import { Options } from "../types";
import * as nls from 'vscode-nls';
import { docgenRender } from './docgenRender';

const localize = nls.loadMessageBundle();
export const copyReactDoc = async (file: vscode.Uri, options: Options) => {
  const componentDocs = await reactDocgen(file, options);
  try {
    await vscode.env.clipboard.writeText(docgenRender(componentDocs));
    const l = componentDocs.length;

    const message = l > 1
      ? localize('extension.copyReactDoc.showInformationMessage', 'Successfully copied {0} component documents', l)
      : localize('extension.copyReactDoc.showInformationMessage', 'Successfully copied {0} component document', l);
    // Display a message box to the user
    vscode.window.showInformationMessage(message);
  } catch (error) {
    vscode.window.showErrorMessage(error.message);
  }
};
