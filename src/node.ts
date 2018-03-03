export class Node {
    constructor(public text: string,
                public level: number,
                public children: Node[],
                public value?: any) {}

    addChild(node: Node) { this.children.push(node); }
}

export class NodeFactory {
    static createNode(text: string, level: number) {
        return new Node(text, level, []);
    }
}