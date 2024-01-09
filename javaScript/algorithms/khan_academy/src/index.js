import test from './components/test';
import binarySearch from './containers/binary_search';
import selectionSort from './containers/selection_sort';
import insertSort from './containers/insert_sort';
import factorial from './containers/factorial';
import './index.css';

window.binarySearch = binarySearch;
window.selectionSort = selectionSort;
window.insertSort = insertSort;
window.factorial = factorial;
console.log('binary search');
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
console.log('selection sort');
console.log(selectionSort([-11, 9, 5, 3, -2, 4, 6, 0, 7, 8, -5]));
console.log('insert sort');
console.log(insertSort([-0.5, 4, 52, 35, -21, 49, 61, 10, 17, 22, -2]));
test.print();
document.body.appendChild(test.render());
