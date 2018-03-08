import * as vscode from 'vscode';
import * as path from 'path';
import { Node } from './node';
import { MDModel } from './mdmodel';

export class OutlineView implements vscode.TreeDataProvider<Node>{
	private _onDidChangeTreeData: vscode.EventEmitter<Node | null> = new vscode.EventEmitter<Node | null>();
	readonly onDidChangeTreeData: vscode.Event<Node | null> = this._onDidChangeTreeData.event;

	constructor(private context: vscode.ExtensionContext, private model: MDModel) {
		this.model.on("change", () => this.refresh());
	}

	getTreeItem(element: Node): vscode.TreeItem {
		let treeItem = new vscode.TreeItem(element.text);
		if (element.children.length) {
            treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Expanded; //: vscode.TreeItemCollapsibleState.Collapsed;
        } else {
            treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
		}

		// treeItem.command = {
		// 	command: 'extension.openJsonSelection',
		// 	title: '',
		// 	arguments: [new vscode.Range(this.editor.document.positionAt(valueNode.offset), this.editor.document.positionAt(valueNode.offset + valueNode.length))]
		// };
		treeItem.iconPath = this.getIcon(element);
		return treeItem;
	}

	getChildren(element?: Node): Thenable<Node[]> {
		if(element) {
			return Promise.resolve(element.children);
		}
		return Promise.resolve(this.model.extractOutline().children);
	}

	private refresh() {
		this._onDidChangeTreeData.fire();
	}

	private getIcon(node: Node): any {
		return this.context.asAbsolutePath(path.join('resources', `h${node.level}.svg`));
}
}