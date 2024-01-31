export default class Node {
  constructor(data) {
    this.leftNode = null;
    this.rightNode = null;
    this.data = data !== null ? data : null;
  }
}
