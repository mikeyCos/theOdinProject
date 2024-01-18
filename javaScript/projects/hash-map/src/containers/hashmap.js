import LinkedList from './linked_list';

const HashMap = () => {
  let capacity = 16;
  const threshold = 0.75;
  let numEntries = 0;
  let loadFactor = numEntries / capacity;
  let arr = new Array(capacity).fill().map(() => new LinkedList());
  const hash = (key) => {
    // takes a value and produces a hash code with it.
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      // hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
      hashCode = BigInt(primeNumber) * BigInt(hashCode) + BigInt(key.charCodeAt(i));
    }

    const capacityBigInt = BigInt(capacity);
    hashCode = Number(hashCode % capacityBigInt);

    if (hashCode < 0 || hashCode >= capacityBigInt) {
      throw new Error('Trying to access index out of bound');
    }

    return hashCode;
    // return hashCode;
  };

  const entries = () => {
    // returns an array that contains each key, value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    const entriesArr = [];
    arr.forEach((item) => {
      if (item.size() > 0) {
        let node = item.head();
        while (node) {
          entriesArr.push([node.key, node.value]);
          // optional, an array of objects with key/value properties
          // entriesArr.push({ key: node.key, value: node.value });
          node = node.next;
        }
      }
    });

    return entriesArr;
  };

  const grow = (callback) => {
    capacity *= 2;
    numEntries = 0;
    const entriesArr = entries();
    arr = new Array(capacity).fill().map(() => new LinkedList());
    entriesArr.forEach((item) => {
      callback(item[0], item[1]);
      // optional, when using an array of objects with key/value properties
      // callback(item.key, item.value);
    });
  };

  const set = (key, value) => {
    // takes two arguments, the first is a key and the second is a value that is assigned to this key.
    // If a key already exists, then the old value is overwritten.
    // grow your buckets size when it needs to, by calculating if your bucket has reached the load factor.
    const index = hash(key);
    const bucket = arr[index];
    const linkedListIndex = bucket.find(key);
    if (bucket.size() === 0 || linkedListIndex === null) {
      bucket.append(key, value);
      numEntries += 1;
      loadFactor = numEntries / capacity;
    } else {
      const node = bucket.atIndex(linkedListIndex);
      node.value = value;
    }

    if (loadFactor > threshold) {
      // To grow our buckets,
      // we create a new buckets list that is double the size of the old buckets list,
      // then we copy all nodes over to the new buckets.
      grow(set);
    }
  };

  const get = (key) => {
    // takes one argument as a key and returns the value that is assigned to this key.
    // If key is not found, return null
    const index = hash(key);
    const bucket = arr[index];
    const linkedListIndex = bucket.find(key);
    const node = bucket.atIndex(linkedListIndex);
    return node ? node.value : null;
  };

  const has = (key) => {
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const index = hash(key);
    const bucket = arr[index];
    return bucket.contains(key);
  };

  const remove = (key) => {
    // takes a key as an argument.
    // If the given key is in the hash map, it should remove the entry with that key and return true.
    // If the key isn’t in the hash map, it should return false
    if (has(key)) {
      const index = hash(key);
      const bucket = arr[index];
      const linkedListIndex = bucket.find(key);
      bucket.removeAt(linkedListIndex);
      numEntries -= 1;
      return true;
    }
    return false;
  };

  const length = () => {
    // returns the number of stored keys in the hash map.
    return numEntries;
  };

  const clear = () => {
    // removes all entries in the hash map
    arr.forEach((item) => {
      while (item.size() > 0) {
        item.pop();
      }
    });
  };

  const keys = () => {
    // returns an array containing all the keys inside the hash map.
    const keysArr = [];
    arr.forEach((item) => {
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

  const values = () => {
    // returns an array containing all the values
    const valuesArr = [];
    arr.forEach((item) => {
      if (item.size() > 0) {
        let node = item.head();
        while (node) {
          valuesArr.push(node.value);
          node = node.next;
        }
      }
    });

    return valuesArr;
  };

  const indexOf = (key) => {
    // returns the index of the bucket that the key belongs to
    const index = hash(key);
    return has(key) ? index : 'Key does not exist';
  };

  const print = () => {
    console.log(arr);
  };

  return {
    hash,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    print,
    indexOf,
  };
};

export default HashMap;
