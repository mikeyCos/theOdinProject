import HashMap from './containers/hashmap';
import HashSet from './containers/hashset';
import test from './components/test';
import './index.css';

window.HashMap = HashMap;
window.foo = HashMap();
console.log(window.foo);

window.HashSet = HashSet;
window.bar = new HashSet();
console.log(window.bar);

const entries = [
  {
    key: 'firstKey',
    value: 'firstValue',
  },
  {
    key: 'secondKey',
    value: 'secondValue',
  },
  { key: 'thirdKey', value: 'thirdValue' },
  { key: 'fourthKey', value: 'fourtValue' },
  { key: 'fifthKey', value: 'fifthValue' },
  { key: 'sixthKey', value: 'sixthValue' },
  { key: 'seventhKey', value: 'seventhValue' },
  { key: 'eigthKey', value: 'eigthValue' },
  { key: 'ninthKey', value: 'ninthValue' },
  { key: 'tenthKey', value: 'tenthValue' },
  { key: 'eleventhKey', value: 'eleventhValue' },
  { key: 'twelvethKey', value: 'twelvethValue' },
  { key: 'thirteenthKey', value: 'thirteenthValue' },
  { key: 'fourteenthKey', value: 'fourteenthValue' },
];

entries.forEach((item) => window.foo.set(item.key, item.value));
window.foo.print();
entries.forEach((item) => window.bar.set(item.key, item.value));
window.bar.print();

test.print();
document.body.appendChild(test.render());
