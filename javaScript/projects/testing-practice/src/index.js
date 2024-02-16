import './index.css';
import capitalize from './containers/capitalize';
import reverseString from './containers/reverseString';
import calculator from './containers/calculator';
import caesarCipher from './containers/caesarCipher';
import analyzeArray from './containers/analyzeArray';

const foo = analyzeArray([7, 4, 14, 7, 3, 15, 11, 4]);
console.log(foo);

console.log(caesarCipher('Beware the Ides of March', 7));
console.log(caesarCipher('RFC AYCQYP QFGDR', -2));
