import test from './components/test';
import binarySearch from './containers/binary_search';
import selectionSort from './containers/selection_sort';
import insertSort from './containers/insert_sort';
import factorial from './containers/factorial';
import palindrome from './containers/palindrome';
import pow from './containers/power';
import fibonacci from './containers/fibonacci';
import quickSort from './containers/quick_sort';

import doBFS from './containers/bfs';

import './index.css';

window.binarySearch = binarySearch;
window.selectionSort = selectionSort;
window.insertSort = insertSort;
window.factorial = factorial;
window.palindrome = palindrome;
window.pow = pow;
window.fibonacci = fibonacci;
window.quickSort = quickSort;

window.doBFS = doBFS;

const arrayA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const arrayB = [-11, 9, 5, 3, -2, 4, 6, 0, 7, 8, -5];
console.log('binary search');
console.log(`binarySearch(${arrayA}, 5)`);
console.log(`binarySearch(arrayA, 5) = ${binarySearch(arrayA, 5)}`);
console.log('selection sort');

console.log(selectionSort(arrayB));
console.log('insert sort');
console.log(insertSort([-0.5, 4, 52, 35, -21, 49, 61, 10, 17, 22, -2]));
console.log('factorial');
console.log(factorial(10));
console.log('palindrome');
console.log(palindrome('rotor'));
console.log('pow');
console.log(pow(2, -1));
console.log('fibonacci');
console.log(fibonacci(5));
console.log('quick sort');
console.log(quickSort([9, 7, 5, 11, 12, 2, 14, 3, 10, 6]));

const adjList = [[1], [0, 4, 5], [3, 4, 5], [2, 6], [1, 2], [1, 2, 6], [3, 5], []];
const bfsInfo = doBFS(adjList, 3);

for (let i = 0; i < adjList.length; i += 1) {
  console.log(
    `vertex ${i}: distance = ${bfsInfo[i].distance}, predcessor = ${bfsInfo[i].predecessor}`,
  );
}

test.print();
document.body.appendChild(test.render());
