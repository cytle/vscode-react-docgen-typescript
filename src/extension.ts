// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as docgen from 'react-docgen-typescript';
import { markdownRender } from 'react-docgen-typescript-markdown-render';

interface Options {
  all: boolean;
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-docgen-typescript" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  const reactDocgen = async (textEditor: vscode.TextEditor, options: Options) => {
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
    let componentDocs = docgen.parse(file.path, {
      savePropValueAsString: true,
    });
    if (!options.all && componentDocs.length > 1) {
      const components = await vscode.window.showQuickPick(componentDocs.map(vo => ({
        label: vo.displayName,
        description: vo.description,
        detail: Object.keys(vo.props).join(' | '),
      })), {
        canPickMany: true
      }) || [];
      const set = new Set(components.map(vo => vo.label));
      componentDocs = componentDocs.filter(vo => set.has(vo.displayName));
    }
    if (componentDocs.length === 0) {
      return;
    }
    textEditor.edit((edit) => {
      edit.replace(textEditor.selection, markdownRender(componentDocs));
      const l = componentDocs.length;
      // Display a message box to the user
      vscode.window.showInformationMessage(l > 0 ? `Insert ${l} component document`: `Insert ${l} component documents`);
    });
	};

  context.subscriptions.push(vscode.commands.registerTextEditorCommand('react-docgen-typescript.docgenAll', (textEditor) => reactDocgen(textEditor, { all: true })));
  context.subscriptions.push(vscode.commands.registerTextEditorCommand('react-docgen-typescript.docgen', (textEditor) => reactDocgen(textEditor, { all: false })));
}

// this method is called when your extension is deactivated
export function deactivate() {}
