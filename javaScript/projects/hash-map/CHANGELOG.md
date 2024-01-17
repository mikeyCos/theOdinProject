# Changelog
---
### 18 JAN 2024
- 
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