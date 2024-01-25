import Tree from './containers/tree';
import Arr from './containers/arr';
import test from './components/test';
import './index.css';

window.Tree = Tree;
window.Arr = Arr;
const arrayA = Arr(20);
window.foo = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// window.foo = window.Tree([1, 3, 4, 4, 5, 7, 7, 8, 9, 9, 23, 67, 324, 6345]);
window.bar = new Tree([20, 30, 32, 34, 36, 40, 50, 70, 60, 65, 80, 75, 85]);
window.par = new Tree(arrayA);
// making imbalanced BST
// window.bar.deleteNode(20);
// window.bar.insertNode(42);
// window.bar.insertNode(41);
// window.bar.prettyPrint(window.bar.root);
window.par.prettyPrint(window.par.root);

test.print();
