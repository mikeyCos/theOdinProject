import LinkedList from './linked_list';
import HashMap from './hashmap';

export default class HashSet {
  #capacity = 16;

  #threshold = 0.75;

  #numEntries = 0;

  #loadFactor = this.#numEntries / this.#capacity;

  #arr = new Array(this.#capacity).fill().map(() => new LinkedList());

  hash = (key) => {
    // takes a value and produces a hash code with it.
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      // hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      hashCode = BigInt(primeNumber) * BigInt(hashCode) + BigInt(key.charCodeAt(i));
    }

    const capacityBigInt = BigInt(this.#capacity);
    hashCode = Number(hashCode % capacityBigInt);

    if (hashCode < 0 || hashCode >= capacityBigInt) {
      throw new Error('Trying to access index out of bound');
    }

    return hashCode;
    // return hashCode;
  };

  #grow = () => {
    this.#capacity *= 2;
    this.#numEntries = 0;
    const keysArr = this.keys();
    console.log(keysArr);
    this.#arr = new Array(this.#capacity).fill().map(() => new LinkedList());
    keysArr.forEach((item) => {
      this.set(item);
    });
  };

  set = (key) => {
    // takes two arguments, the first is a key and the second is a value that is assigned to this key.
    // If a key already exists, then the old value is overwritten.
    // grow your buckets size when it needs to, by calculating if your bucket has reached the load factor.
    const index = this.hash(key);
    const bucket = this.#arr[index];
    const linkedListIndex = bucket.find(key);
    if (bucket.size() === 0 || linkedListIndex === null) {
      bucket.append(key);
      this.#numEntries += 1;
      this.#loadFactor = this.#numEntries / this.#capacity;
    }

    if (this.#loadFactor > this.#threshold) {
      // To grow our buckets,
      // we create a new buckets list that is double the size of the old buckets list,
      // then we copy all nodes over to the new buckets.
      this.#grow();
    }
  };

  get = (key) => {
    // Takes one argument as a key and returns the node corresponding to the key.
    // If key is not found, return null.
    const index = this.hash(key);
    const bucket = this.#arr[index];
    const linkedListIndex = bucket.find(key);
    const node = bucket.atIndex(linkedListIndex);
    // return !node ? null : node;
    if (node) {
      return !node.value ? node : node;
    }
    return null;
  };

  has = (key) => {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const index = this.hash(key);
    const bucket = this.#arr[index];
    return bucket.contains(key);
  };

  remove = (key) => {
    // takes a key as an argument.
    // If the given key is in the hash map, it should remove the entry with that key and return true.
    // If the key isn’t in the hash map, it should return false
    if (this.has(key)) {
      const index = this.hash(key);
      const bucket = this.#arr[index];
      const linkedListIndex = bucket.find(key);
      bucket.removeAt(linkedListIndex);
      this.#numEntries -= 1;
      return true;
    }
    return false;
  };

  length = () => {
    // returns the number of stored keys in the hash map.
    return this.#numEntries;
  };

  clear = () => {
    // removes all entries in the hash map
    this.#arr.forEach((item) => {
      while (item.size() > 0) {
        item.pop();
      }
    });
  };

  keys = () => {
    // returns an array containing all the keys inside the hash map.
    const keysArr = [];
    this.#arr.forEach((item) => {
      if (item.size() > 0) {
        let node = item.head();
        while (node) {
          keysArr.push(node.key);
          node = node.next;
        }
      }
    });

    return keysArr;
  };

  indexOf = (key) => {
    // returns the index of the bucket that the key belongs to
    const index = this.hash(key);
    return this.has(key) ? index : 'Key does not exist';
  };

  print = () => {
    console.log(this.#arr);
  };
}
