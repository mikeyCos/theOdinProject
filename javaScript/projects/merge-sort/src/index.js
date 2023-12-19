import test from './components/test';
import fibonacci from './containers/fibonacci';
import mergeSort from './containers/mergesort';
import sumMultiples from './containers/sumMultiples';
import fibonacciEven from './containers/fibonacci_even';
import './index.css';

window.fibonacci = fibonacci; // testing
window.mergeSort = mergeSort; // testing
window.sumMultiples = sumMultiples;
window.fibonacciEven = fibonacciEven;
test.print();
document.body.appendChild(test.render());
