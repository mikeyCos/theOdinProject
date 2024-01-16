export default class Node {
  constructor(value, next) {
    this.value = !value ? null : value;
    this.next = !next ? null : next;
  }
}
