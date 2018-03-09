import * as vscode from 'vscode';
import * as path from 'path';
import { Node } from './node';
import { MDModel } from './model';

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

		treeItem.command = {
			command: 'mdOutline.openSelection',
			title: '',
			arguments: [
				vscode.window.activeTextEditor,
				new vscode.Range(new vscode.Position(element.line, 0), new vscode.Position(element.line, element.length))
			]
		};
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