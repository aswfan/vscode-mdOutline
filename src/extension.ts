'use strict';

import * as vscode from 'vscode';
import { MDModel } from './mdmodel';
import { OutlineView } from './outline-view';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "md-outline" is now active!');
    
    let model = new MDModel();
    let outline = new OutlineView(context, model);

    vscode.window.registerTreeDataProvider("mdOutline", outline);

    vscode.commands.registerCommand('mdOutline.openSelection', (editor: vscode.TextEditor, range: vscode.Range) => {
        editor.revealRange(range, vscode.TextEditorRevealType.Default);
        editor.selection = new vscode.Selection(range.start, range.end);
        vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup');
    });
}

export function deactivate() {
}