export default class Node {
  constructor(key, value, next) {
    this.key = !key ? null : key;
    this.value = !value ? null : value;
    this.next = !next ? null : next;
  }
}
