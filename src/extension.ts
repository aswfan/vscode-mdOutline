'use strict';

import * as vscode from 'vscode';
import { MDModel } from './mdmodel';
import { OutlineView } from './outline-view';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "md-outline" is now active!');
    
    let model = new MDModel(context);
    let outline = new OutlineView(model);

    vscode.window.registerTreeDataProvider("outline-view", outline);
}

export function deactivate() {
}