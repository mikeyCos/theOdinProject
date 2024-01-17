import Hashmap from './containers/hashmap';
import test from './components/test';
import './index.css';

window.Hashmap = Hashmap;
window.foo = Hashmap();
console.log(window.foo);

test.print();
document.body.appendChild(test.render());
