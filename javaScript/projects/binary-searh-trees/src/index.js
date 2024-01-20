import Tree from './containers/tree';
import test from './components/test';
import './index.css';

window.Tree = Tree;
window.foo = window.Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(window.foo);

test.print();
document.body.appendChild(test.render());
