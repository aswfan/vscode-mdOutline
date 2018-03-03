import {TextEditor} from 'vscode';
import { Node, NodeFactory } from './node';


export class MDModel {
    private _editor: TextEditor;
    private text: string[];
    constructor(editor: TextEditor | undefined) {
        if(editor && editor.document.languageId === "markdown") {
            this._editor = editor;
            this.text = this._editor.document.getText().split('\n');
        }
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
        for(let i=index; i<this.text.length; i++) {
            let line = this.text[i];
            if(line.search(/#+ /) === 0) {
                let header = line.replace(/#+ /, '');
                let level = line.length - 1 - header.length;
                
                if(level <= node.level) { return i--;}
                
                let child = NodeFactory.createNode(header, level);
                node.addChild(child);
                i = this.parseHeader(child, ++i);
            }
        }
    }
}