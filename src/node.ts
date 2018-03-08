export class Node {
    constructor(public text: string,
                public level: number,
                public line: number,
                public length: number,
                public children: Node[],
                public value?: any) {}

    addChild(node: Node) { this.children.push(node); }
}

export class NodeFactory {
    static createNode(text: string, level: number, line: number, length: number) {
        return new Node(text, level, line, length, []);
    }
}