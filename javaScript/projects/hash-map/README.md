# Readme
---
## Live preview: [Hash Map](https://mikeycos.github.io/theOdinProject/javaScript/projects/hash-map/dist)
---
### Ideas
1. Implement a user interface.
2. Implement to add/remove a value property for nodes in a `HashSet` object.
---
### Questions
1. Is it possible to extend functions from a factory function into a class?
---
### About
Project: Hash Map

Hello world,

This hash map (hash table), project has been a delight to build. Coming from the previous project, linked list, helped build the associative array of linked lists; I am glad to build a project on top of a previous project - project-ception?

I was scared going into this project because it is a new data structure I had no idea how to build from scratch. At first, I was stuck on how to initialize the associative array and, if at all, what needs to be initialized in the array? For a time, it made sense that the array needs to be empty but assigned a length. I figured the empty spots in the array are the buckets that will be filled with an object with key/value properties. Now, if another object needed to be added at an index with an existing object, then a linked list is created, those objects are appended to the newly created linked list, and the linked list is inserted at the index where the previous object was located.

Later in my thought process, I figure why not initialize linked list objects in the array rather than later when another key/value pair is added to an index that already has an entry in it. This is when I was reminded how arrow functions without a block body will implicitly return what is after the arrow, `=>`. For whatever reason, I thought `array.fill().map((item) => item = new LinkedList());` would work without any errors. Although this works, a linting error is thrown, `no-param-reassign`. Since arrow functions implicitly return what is after the arrow, then the parameter field can be left empty and anything on the right side of the arrow will be assigned to an array element.

One aspect of the hash function that I still do not fully understand is this line `hashCode = BigInt(primeNumber) * BigInt(hashCode) + BigInt(key.charCodeAt(i));`. Before implementing this line of code, my original problem involved `hashCode = primeNumber * hashCode + key.charCodeAt(i);` and for any string key that was very long, then an index of 0 was returned. In other words, a collision occurred more frequently at the index of 0 for the associative array. Little did I know, the hashCode was becoming a big number really fast, especially when each iteration of the for-loop multiplies a prime number of 31 by the hash code plus the char code of the letter at key's respective index.

I was hinted to look into `BigInt`, and I thought converting the hash code into a `BigInt` after the for-loop would resolve the problem. I tried 
```
hashCode = BigInt(hashCode);
const tmp = BigInt(capacity);
return Number (hashCode % capacity)
```
That did not resolve the issue and my attention was thrown toward the variables inside the for-loop. This is where `hashCode = BigInt(primeNumber) * BigInt(hashCode) + BigInt(key.charCodeAt(i));` fixed the problem with the hash function returning 0 consistently with big string keys. I looked into [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) on MDN and realized JavaScript does not really interpret big numbers precisely. The safest maximum number that can be used in JavaScript is `Number.MAX_SAFE_INTEGER = 9007199254740991`. Now, when you increment this number by 1 for the very first time, nothing seems to happen. Incrementing it again, finally increments to number from `9007199254740991` to `9007199254740992`, but incrementing it further does not seem to do anything again.
```
let foo = Number.MAX_SAFE_INTEGER;
foo++ // returns 9007199254740991
foo++ // returns 9007199254740992
foo++ // returns 9007199254740992
```

Furthermore, if extra numbers were typed after `9007199254740991` the numbers seem to automatically changed into zeroes. For example,
```
let foo = 9007199254740991293829323
foo // returns 9.007199254740991e+24
```
Notice after the digit 1 of the number `9007199254740991`, the numbers `293829323` are automatically turned into zeroes; very strange! Back to how `BigInt` resolve the issue, well, at least how I suspect it is resolved. I suspect since the numbers are increasing exponentially, then the number essentially becomes consistently divisible by 2. An extreme example, `523434357 * 384573991229` returns `201299239817875260000`. Again, it appears that zeroes replace numbers that are supposed to be after the digit `6`. Using `BigInt()` on big numbers will allow JavaScript to continue adding digits to the number. Using the same previous numbers but as `BigInt` numbers, `523434357n * 384573991229n` will return `201299239817875254753n`. In order to perform arithmetic operations with `BigInt` numbers, all other variables will need to be converted into a `BigInt` number; [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).


Enough talk about `BigInt`, I utilize the following linked list methods in the `HashMap` object: `.head()`/`.find()`/`atIndex()`/`.contains()`/`removeAt`. I figured, why remake these methods, when they are already available. Since I used a factory function instead of a `class`, I needed to use a callback function for the `grow` method because `grow` is defined before the `set` method and the `grow` method is called inside the `set method` only if the `loadFactor` is greater than the `threshold`.

As far as the extra credit goes, I used `class` instead of a factory function, removed the `entries()` and `values()` methods, and remove any mention of `node.value`. Since a `HashSet` object only involves keys, I reconfigured the `Node` constructor to assign `this.value` only if a value is exists.

I am glad this project got me to go on a rabbit hole for numbers in JavaScript, dynamically grow a data structure, remind me what can happen with arrow functions, and build upon a previous project. 

To failing forward, cheers!
---
### Notes
* This HashMap object handles keys of type strings.
* The HashMap factory function is declared globally in `index.js`.
* A HashMap object named `foo` is declared globally in `index.js`.
* The HashSet class is declared globally in `index.js`.
* A HashSet object named `bar` is declared globally in `index.js`.
---
### Instructions
### Hash Map
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
---
### Hash Set
1. Click on [Hash Map](https://mikeycos.github.io/theOdinProject/javaScript/projects/hash-map/dist)
2. Open browser's DevTools and go to the console.
3. In the browser's console:
  * Enter `const variableName = new HashSet()`.
  * The current available LinkedList methods:
    * `hash(key)`, takes a key and produces a hash code with it.
    * `set(key)`, takes a key and appends it to a linked list based on the hash code.
    * `get(key)`, takes one argument as a key and returns the node corresponding to the key. If key is not found, return null.
    * `has(key)`, takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    * `remove(key)`, If the given key is in the hash map, it should remove the node with that key and return true. If the key isn’t in the hash map, it should return false.
    * `length()`, returns the number of stored keys in the hash map.
    * `clear()`, removes all entries in the hash map.
    * `keys()`, returns an array containing all the keys inside the hash map.
    * `indexOf(key)`, returns the index of the bucket that the key belongs to.