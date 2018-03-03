import * as vscode from 'vscode';
import { Node } from './node';

export class OutlineView implements vscode.TreeDataProvider<Node>{
	constructor(private tree: Node) {}

	/**
	 * An optional event to signal that an element or root has changed.
	 * This will trigger the view to update the changed element/root and its children recursively (if shown).
	 * To signal that root has changed, do not pass any argument or pass `undefined` or `null`.
	 */
	onDidChangeTreeData?: vscode.Event<Node | undefined | null>;

	getTreeItem(element: Node): vscode.TreeItem {
		let treeItem = new vscode.TreeItem(element.text);
		if (element.children.length) {
            treeItem.collapsibleState = vscode.TreeItemCollapsibleState.Expanded; //: vscode.TreeItemCollapsibleState.Collapsed;
        } else {
            treeItem.collapsibleState = vscode.TreeItemCollapsibleState.None;
}
		return treeItem;
	}

	getChildren(element?: Node): Thenable<Node[]> {
		if(element) {
			return Promise.resolve(element.children);
		}
		return Promise.resolve(this.tree.children);
	}
}