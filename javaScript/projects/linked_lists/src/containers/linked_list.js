import Node from './node';

export default class LinkedList {
  #head = null;

  #tail = null;

  #size = 0;

  append(value) {
    // adds a new node containing value to the end of the list
    // what if the list is empty
    const node = new Node(value);
    if (this.#size === 0) {
      this.#head = node;
    } else {
      const tmp = this.#tail;
      tmp.next = node;
    }
    this.#tail = node;
    this.#size += 1;
  }

  prepend(value) {
    // adds a new node containing value to the start of the list
    const tmp = this.#head;
    this.#head = new Node(value, tmp);
    this.#size += 1;
  }

  size() {
    // returns the total number of nodes in the list
    return this.#size;
  }

  head() {
    // returns the first node in the list
    return this.#head;
  }

  tail() {
    // returns the last node in the list
    return this.#tail;
  }

  atIndex(n) {
    // returns the node at the given index
    let node = !this.#head ? 'Linked List is empty' : this.#head;
    let index = 0;
    while (node.next) {
      if (index === n) {
        break;
      }
      node = node.next;
      index += 1;
    }
    return node;
  }

  pop() {
    // removes the last element from the list
    if (this.#size > 0) {
      if (this.#size > 1) {
        const beforeLast = this.atIndex(this.#size - 2);
        beforeLast.next = null;
        this.#tail = beforeLast;
      } else {
        this.#tail = null;
        this.#head = null;
        delete this.atIndex(0);
      }
      this.#size -= 1;
    }
  }

  contains(query, obj = this.#head) {
    // returns true if the passed in value is in the list and otherwise returns false.
    if (obj) {
      return Object.values(obj).some((value) => {
        if (value === query) return true;
        if (value instanceof Object) return this.contains(value, query);
      });
    }
    return false;

    // if (obj) {
    //   for (let i = 0; i < Object.keys(obj).length; i += 1) {
    //     if (obj[Object.keys(obj)[i]] === query) return true;

    //     if (obj[Object.keys(obj)[i]] instanceof Object && this.contains(query, obj.next)) {
    //       return true;
    //     }
    //   }
    // }
    // return false;
  }

  find(query) {
    // returns the index of the node containing value, or null if not found
    // bug, still returns a popped node
    let node = this.#head;
    let index = this.#size === 0 ? null : 0;
    while (node && node.next) {
      if (node.value === query) {
        break;
      }
      index += 1;
      node = node.next;
    }
    return index;
  }

  toString() {
    // represents your LinkedList objects as strings,
    // so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    return this;
  }

  // Extra Credit Tip: When you insert or remove a node,
  // consider how it will affect the existing nodes.
  // Some of the nodes will need their nextNode link updated.
  insertAt(value, index) {
    // inserts a new node with the provided value at the given index
    return this;
  }

  removeAt(index) {
    // that removes the node at the given index
    const left = this.atIndex(index - 1);
    const target = this.atIndex(index);
    left.next = target.next;
    delete this.atIndex(index);
    // if (index + 1 === this.#size) this.#tail =
  }
}

/*
const foo = {
  head: {
    value: 'a',
    next: {
      value: 'b',
      next: {
        value: 'c',
        next: {
          value: 'd',
          tail: {
            value: 'e',
            next: null,
          },
        },
      },
    },
  },
};
*/
