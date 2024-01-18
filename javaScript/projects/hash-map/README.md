# Readme
---
## Live preview: [Hash Map](https://mikeycos.github.io/theOdinProject/javaScript/projects/hash-map/dist)
---
### Ideas
1. Implement a user interface.
---
### Notes
*  The Hashmap factory function is declared globally in `index.js`.
* A Hashmap object named `foo` is declared globally in `index.js`.
---
### Instructions
1. Click on [Hash Map](https://mikeycos.github.io/theOdinProject/javaScript/projects/hash-map/dist)
2. Open browser's DevTools and go to the console.
3. In the browser's console:
  * Enter `const variableName = new HashMap()`.
  * The current available LinkedList methods:
    * `hash(key)`, takes a value and produces a hash code with it.
    * `entries()`, returns an array that contains each key, value pair. For example, `[[firstKey, firstValue], [secondKey, secondValue]]`.
    * `set(key, value)`, takes two arguments, the first is a key and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten.
    * `get(key)`, takes one argument as a key and returns the value that is assigned to this key. If key is not found, return null.
    * `has(key)`, takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    * `remove(key)`, If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    * `length()`, returns the number of stored keys in the hash map.
    * `clear()`, removes all entries in the hash map.
    * `keys()`, returns an array containing all the keys inside the hash map.
    * `values()`, returns an array containing all the values.
    * `indexOf(key)`, returns the index of the bucket that the key belongs to.