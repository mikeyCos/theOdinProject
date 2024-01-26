import Tree from './containers/tree';
import Arr from './containers/arr';
import Node from './containers/node';
import './index.css';

window.Node = Node;
window.Tree = Tree;
window.Arr = Arr;
const arrayA = Arr(20);
console.log(arrayA);
window.foo = new Tree(arrayA);
window.foo.prettyPrint();
console.log(`Is tree balanced: ${window.foo.isBalanced()}`);
console.log(`--------------------level order--------------------`);
console.log(window.foo.levelOrder());
console.log(`--------------------pre order--------------------`);
console.log(window.foo.preOrder());
console.log(`--------------------in order--------------------`);
console.log(window.foo.inOrder());
console.log(`--------------------post order--------------------`);
console.log(window.foo.postOrder());

const largeNumbers = new Array(20).fill().map(() => Math.floor(Math.random() * (200 - 100) + 100));
largeNumbers.forEach((num) => window.foo.insertNode(num));
console.log(`Is tree balanced: ${window.foo.isBalanced()}`);

window.foo.rebalance();
console.log(`After rebalance()`);
console.log(`Is tree balanced: ${window.foo.isBalanced()}`);
console.log(`--------------------level order--------------------`);
console.log(window.foo.levelOrder());
console.log(`--------------------pre order--------------------`);
console.log(window.foo.preOrder());
console.log(`--------------------in order--------------------`);
console.log(window.foo.inOrder());
console.log(`--------------------post order--------------------`);
console.log(window.foo.postOrder());

window.foo.prettyPrint();
// for deleting nodes with breadth-first-search and/or depth-first-search ordered arrays
const levelOrder = window.foo.levelOrder();
// levelOrder.forEach((num) => {
//   console.log(`-------------deleting node with value ${num}-------------`);
//   window.foo.deleteNode(num);
//   console.log(`-------------after deleteNode-------------`);
//   window.foo.prettyPrint();
//   console.log(`-------------before rebalance-------------`);
//   if (!window.foo.isBalanced()) window.foo.rebalance();
//   console.log(`-------------after rebalance-------------`);
//   window.foo.prettyPrint();
// });

const preOrder = window.foo.preOrder();
// preOrder.forEach((num) => {
//   console.log(`-------------deleting node with value ${num}-------------`);
//   window.foo.deleteNode(num);
//   console.log(`-------------after deleteNode-------------`);
//   window.foo.prettyPrint();
//   console.log(`-------------before rebalance-------------`);
//   if (!window.foo.isBalanced()) window.foo.rebalance();
//   console.log(`-------------after rebalance-------------`);
//   window.foo.prettyPrint();
// });

const inOrder = window.foo.inOrder();
// inOrder.forEach((num) => {
//   console.log(`-------------deleting node with value ${num}-------------`);
//   window.foo.deleteNode(num);
//   console.log(`-------------after deleteNode-------------`);
//   window.foo.prettyPrint();
//   console.log(`-------------before rebalance-------------`);
//   if (!window.foo.isBalanced()) window.foo.rebalance();
//   console.log(`-------------after rebalance-------------`);
//   window.foo.prettyPrint();
// });

const postOrder = window.foo.postOrder();
// postOrder.forEach((num) => {
//   console.log(`-------------deleting node with value ${num}-------------`);
//   window.foo.deleteNode(num);
//   console.log(`-------------after deleteNode-------------`);
//   window.foo.prettyPrint();
//   console.log(`-------------before rebalance-------------`);
//   if (!window.foo.isBalanced()) window.foo.rebalance();
//   console.log(`-------------after rebalance-------------`);
//   window.foo.prettyPrint();
// });
// console.log(window.foo.root);
