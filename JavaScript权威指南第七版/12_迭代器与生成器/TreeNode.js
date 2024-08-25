// 定义树节点
class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
}

// 定义递归生成器
function* traverse(node) {
    yield node.value;
    for (const child of node.children) {
        yield* traverse(child);
    }
}

// 创建一个树结构
const root = new TreeNode(1);
const child1 = new TreeNode(2);
const child2 = new TreeNode(3);
const grandchild1 = new TreeNode(4);
const grandchild2 = new TreeNode(5);

root.addChild(child1);
root.addChild(child2);
child1.addChild(grandchild1);
child2.addChild(grandchild2);

// 使用生成器遍历树结构
for (const value of traverse(root)) {
    console.log(value);
}