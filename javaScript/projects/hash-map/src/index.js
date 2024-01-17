import Hashmap from './containers/hashmap';
import test from './components/test';
import './index.css';

window.Hashmap = Hashmap;
window.foo = Hashmap();
console.log(window.foo);

const entries = [
  {
    key: 'firstKey',
    value: 'firstValue',
  },
  {
    key: 'secondKey',
    value: 'secondValue',
  },
  // { key: 'Aniruddha', value: '1' },
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

test.print();
document.body.appendChild(test.render());
