export default class Node {
  constructor(key, value, next) {
    this.key = !key ? null : key;
    if (value) {
      this.value = value;
    }
    this.next = !next ? null : next;
  }
}
