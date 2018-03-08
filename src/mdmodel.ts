import * as vscode from 'vscode';
import { Node, NodeFactory } from './node';
import { EventEmitter } from 'events';


export class MDModel extends EventEmitter {
    private editor: vscode.TextEditor;
    private text: string[] = [];
    constructor() {
        super();
        this.refresh();
        vscode.window.onDidChangeActiveTextEditor(editor => this.refresh());
        vscode.workspace.onDidCloseTextDocument(document => this.refresh());
        vscode.workspace.onDidChangeTextDocument(event => this.refresh());
		vscode.workspace.onDidSaveTextDocument(document => this.refresh());
    }
    
    extractOutline(): Node {
        let root: Node = NodeFactory.createNode("", 0);
        if (this.text.length > 0) {
            let start_index = 0;
            this.parseHeader(root, start_index);
        }
        return root;
    }

    parseHeader(node:Node, index: number): number {
        for(let i=index; i<this.text.length;) {
            let line = this.text[i];
            if(line.search(/#+ /) === 0) {
                let header = line.replace(/#+ /, '');
                let level = line.length - 1 - header.length;
                
                if(level <= node.level) { return i;}
                
                let child = NodeFactory.createNode(header, level);
                node.addChild(child);
                i = this.parseHeader(child, ++i);
            } else {
                i++;
            }
        }
    }

    private refresh() {
        this.editor = vscode.window.activeTextEditor;
        if(this.editor && this.editor.document.languageId === "markdown") {
            this.text = this.editor.document.getText().split('\n');
        }
        this.emit("change");
    }
}