import * as vscode from 'vscode';
import { Node } from './node';
import { MDModel } from './mdmodel';

export class OutlineView implements vscode.TreeDataProvider<Node>{
	private _onDidChangeTreeData: vscode.EventEmitter<Node | null> = new vscode.EventEmitter<Node | null>();
	readonly onDidChangeTreeData: vscode.Event<Node | null> = this._onDidChangeTreeData.event;

	constructor(private model: MDModel) {
		this.model.on("change", () => this.refresh());
	}

	getTreeItem(element: Node): vscode.TreeItem {
		let treeItem = new vscode.TreeItem(element.text);
		if (element.children.length) {
            treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed; //: vscode.TreeItemCollapsibleState.Expanded;
        } else {
            treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
}
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
}