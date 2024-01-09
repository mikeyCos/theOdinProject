import test from './components/test';
import fibs from './containers/fibonacci';
import mergeSort from './containers/mergesort';
import sumMultiples from './containers/sumMultiples';
import fibsEven from './containers/fibonacci_even';
import primeLargest from './containers/prime_largest';
import './index.css';

window.fibs = fibs; // testing
window.mergeSort = mergeSort; // testing
window.sumMultiples = sumMultiples;
window.fibsEven = fibsEven;
window.primeLargest = primeLargest;
test.print();
document.body.appendChild(test.render());
