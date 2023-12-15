import test from './components/test';
import fibonacci from './containers/fibonacci';
import './index.css';

window.fibonacci = fibonacci; // testing
test.print();
document.body.appendChild(test.render());
