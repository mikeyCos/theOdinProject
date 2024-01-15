import Node from './node';

export default class LinkedList {
  #head = null;

  #tail = null;

  #size = 0;

  append(value) {
    // adds a new node containing value to the end of the list
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
    const newNode = new Node(value, tmp);
    this.#head = newNode;
    if (this.#size === 0) {
      this.#tail = newNode;
    }
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

  contains(query) {
    // contains(query, obj = this.#head) {
    // returns true if the passed in value is in the list and otherwise returns false.

    return this.find(query) !== null;
    // if (obj) {
    //   return Object.values(obj).some((value) => {
    //     if (value === query) return true;
    //     if (value instanceof Object) return this.contains(value, query);
    //   });
    // }
    // return false;

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
    let node = this.#head;
    let index = !this.#head ? null : 0;
    while (node) {
      if (node.value === query) {
        break;
      } else if (!node.next) {
        // if query does not exist in linkedList
        index = null;
        break;
      }

      node = node.next;
      index += 1;
    }
    return index;
  }

  toString() {
    // represents your LinkedList objects as strings,
    // so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    let node = this.#head;
    let string = node ? '' : null;
    while (node) {
      string += `( ${node.value} ) -> `;
      if (!node.next) {
        string += `null`;
        break;
      }
      node = node.next;
    }
    return string;
  }

  // Extra Credit Tip: When you insert or remove a node,
  // consider how it will affect the existing nodes.
  // Some of the nodes will need their nextNode link updated.
  insertAt(value, index) {
    // inserts a new node with the provided value at the given index
    // does NOT work when index is greater than this.#size
    if ((index + 1 > this.#size && this.#size !== 0) || index < 0) {
      // if index is out of bounds of linkedList
      return;
    }

    if (index === 0) {
      this.prepend(value);
    } else if (index + 1 === this.#size) {
      this.append(value);
    } else {
      const newNode = new Node(value);
      const left = this.atIndex(index - 1);
      const right = this.atIndex(index + 1);
      left.next = newNode;
      newNode.next = right;
      this.#size += 1;
    }
  }

  removeAt(index) {
    // that removes the node at the given index
    // if index + 1 === size or size === 1, call this.pop();
    // if size > 1 and index === 0
    //  this.#head = this.atIndex(index + 1)
    if (index + 1 === this.#size || this.#size === 1) {
      this.pop();
      return;
    }

    if (this.#size > 1 && index === 0) {
      this.#head = this.atIndex(index + 1);
    } else {
      const left = this.atIndex(index - 1);
      const right = this.atIndex(index + 1);
      left.next = right;
    }

    this.#size -= 1;
  }
}
