import LinkedList from './linked_list';

const Hashmap = () => {
  const capacity = 16;
  const threshold = 0.75;
  let numEntries = 0;
  const loadFactor = numEntries / capacity;
  const arr = new Array(capacity).fill().map(() => new LinkedList());
  console.log(arr);
  console.log(arr[0]);
  const hash = (key) => {
    // takes a value and produces a hash code with it.
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % capacity;
  };

  const set = (key, value) => {
    // takes two arguments, the first is a key and the second is a value that is assigned to this key.
    // If a key already exists, then the old value is overwritten.
    // grow your buckets size when it needs to, by calculating if your bucket has reached the load factor.
    // when to grow capacity?
    const index = hash(key);
    const bucket = arr[index];
    const linkedListIndex = bucket.find(key);
    if (bucket.size() === 0 || linkedListIndex === null) {
      bucket.append(key, value);
      numEntries += 1;
    } else {
      const node = bucket.atIndex(linkedListIndex);
      node.value = value;
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
  };

  const clear = () => {
    // removes all entries in the hash map
  };

  const keys = () => {
    // returns an array containing all the keys inside the hash map.
  };

  const values = () => {
    // returns an array containing all the values
  };

  const entries = () => {
    // returns an array that contains each key, value pair.
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
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
    print,
  };
};

export default Hashmap;
