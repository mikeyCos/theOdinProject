import LinkedList from './containers/linked_list';
import test from './components/test';
import './index.css';

window.LinkedList = LinkedList;
window.foo = new LinkedList();
console.log(window.foo);

test.print();
document.body.appendChild(test.render());
