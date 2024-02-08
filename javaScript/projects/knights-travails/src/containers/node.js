export default class Node {
  constructor(value, depth, possibleMoves, previous) {
    this.value = value;
    this.depth = depth;
    this.possibleMoves = possibleMoves;
    this.previous = previous;
  }
}
