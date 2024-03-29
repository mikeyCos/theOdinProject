# Changelog
---
### 26 JAN 2024
- Changed `if` statements into `else if` clauses.
- Added additional comments in `tree` module.
- Added `console.log` inside each of the `forEach` loops in the `index` module for deleting all nodes in breadth-first-search and/or depth-first-search ordered arrays.
---
### 25 JAN 2024
- Fixed `deleteNode` method to delete when a node has two children, and correctly links nodes together if the node to delete is the root node.
- Added `throw new Error` to the following methods: `insertNode`/`find`/`deleteNode`/`height`/`depth`.
- Added `console.log` for the different ordered arrays in the `index` module.
- Added conditional statement in `rebalance` method to only rebalance the tree if the tree is unbalanced.
- Updated `README.md` file to include notes and instructions.
- Corrected directory name from `binary-searh-trees` to `binary-search-trees`.
---
### 24 JAN 2024
- Implemented the `height`/`isBalanced`/`rebalanced` methods.
- The `isBalanced` method utilizes the `height` method in it's body.
- The `rebalanced` method utilizes the `inOrder` method to rebuild a tree with an in-order array.
- Reconfigured the `depth`/`levelOrder` methods into recursive methods with a default parameter.
- The `delete` method currently does not work for deleting a node with two children.
- Created `arr` module create an array of `n` element filled with pseudo-random numbers.  
---
### 23 JAN 2024
- Fixed live preview link in `README.md`.
- Changed base case in `mergeSort()` function from `arr.length === 1` to `arr.length <= 1`.
- Reconfigured the `find`/`#predecessor` methods into recursive methods with a default parameter.
---
### 22 JAN 2024
- Fixed `inOrder`/`preOrder`/`postOrder` methods to perform callback function that is passed in; if there is no callback function, an array is returned with values placed in their respective order, otherwise `undefined` is returned.
- The method `levelOrder` appears to work as intended and makes use of a queue to traverse the tree in breadth-first level order.
- Implemented the `depth` method to count the number of edges from the root node.
- Configured `buildTree` into a wrapper function, so that any array passed in will be sorted first; `sortedArrayToBST` method does the tree building.
---
### 20 JAN 2024
- Created `mergesort` module and imported it into the `tree` module.
- An array passed into the `Tree` factory function will be sorted before running `buildTree`.
- A balanced binary search tree can now be created.
- Created a `predecessor` method that will return a predecessor node that will be utilized in the `delete` method.
- The `inOrder` method currently returns an ordered array.
---
### 19 JAN 2024
- Initiated `binary-search-trees` subdirectory.
- Created `tree` and `node` modules.
- `Tree` object is returned by using a factory function.
- Initiated `buildTree`/`insertNode`/`deleteNode`/`find`/`levelOrder`/`inOrder`/`preOrder`/`postOrder`/`height`/`depth`/`isBalanced`/`rebalance`/`prettyPrint` methods for the `Tree` object.
- The method `buildTree` current creates an unbalanced binary search tree.
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