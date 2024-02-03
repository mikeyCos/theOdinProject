export default class Node {
  constructor(value, moves, next) {
    this.start = !value ? null : value;
    this.possibleMoves = !moves ? null : moves;
    this.next = !next ? null : next;
  }
}
