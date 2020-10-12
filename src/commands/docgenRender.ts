import { ComponentDoc } from 'react-docgen-typescript';
import { markdownRender, renderers } from 'react-docgen-typescript-markdown-render';
import * as vscode from 'vscode';

export const docgenRender = (componentDocs: ComponentDoc[]) => markdownRender(componentDocs, {
  renderer: renderers.aliMaterialRenderer,
  language: vscode.workspace.getConfiguration('vscode-react-docgen-typescript').get('renderLanguage')
});
