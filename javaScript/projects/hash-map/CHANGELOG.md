# Changelog
---
### 18 JAN 2024
- Converted variables in the `hash` method into `BigInt` values.
- Added a `throw new Error` in the `hash` method to catch if a generated index is out of bounds of the array/capacity.
- Added optional code inside the `entries` method to create an array of objects instead; this will impact the `grow` method.
- Updated `indexOf` method to return the index of the bucket that the key belongs to, otherwise return `Key does not exist`.
- Updated the `LinkedList` class to use keys and values.
- Changed name of factory function `Hashmap` to `HashMap`.
- Created `hashset` module with `HashSet` class exported.
- Reconfigured the constructor for `Node` class to only initiate a `value` property when value is defined.
- Removed `prepend` and `insertAt` methods from the `LinkedList` class.
---
### 17 JAN 2024
- Implemented a private `grow` method, that will grow the hash map's capacity and copy the nodes into a new hash map.
- Implemented `clear` method that will pop each bucket's nodes.
- Implemented `keys` method that will return an array of all the keys inside the hash map.
- Implemented `values` method that will return an array of all values inside the hash map.
- Temporarily implemented `indexOf` method that takes a key parameter to return the result of `hash(key)`.
---
### 16 JAN 2024
- Created `linked_list` and `node` modules, and imported them into the `hashmap` module.
- A `Hashmap` object is initialized with 16 `LinkedList` objects inside an array.
- Implemented `get`/`has`/`remove` methods.
- Temporary `print` method created to log the array into the console.
---
### 14 JAN 2024
- Reformatted `CHANGELOG.md`.
- Updated instructions in `README.md`.
---
### 27 OCT 2023
- Initial `module-webpack-starter` structure created.
- ESLint and Prettier enabled for the module.
- Configuration files for ESLint and Prettier created.
- `README.md` included with instructions and notes.
- Placeholder directories created in components.
- Added `.eslintrc.json` to `.prettierignore`.  
---