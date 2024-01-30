import knightMoves from './containers/knight_travails';
import test from './components/test';
import './index.css';

window.knightMoves = knightMoves;

test.print();
document.body.appendChild(test.render());
