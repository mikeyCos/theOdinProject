import LinkedList from './containers/linked_list';
import test from './components/test';
import './index.css';

window.LinkedList = LinkedList;

test.print();
document.body.appendChild(test.render());
