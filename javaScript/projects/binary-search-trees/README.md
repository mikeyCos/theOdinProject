# Readme
---
## Live preview: [Binary Search Trees](https://mikeycos.github.io/theOdinProject/javaScript/projects/binary-search-trees/dist)
---
### Ideas
1. Implement a user interface.
---
### About
Project: Binary Search Trees

---
### Notes
* The `Arr` factory function takes a number as an argument, creates an array of length number and generates psuedo-random numbers into each array element.
* The `Arr` factory function is declared globally in `index.js`.
* The `Node` class is declared globally in `index.js`.
* The `Tree` class is declared globally in `index.js`.
* An `Tree` object named `foo` is declared globally in `index.js` with an array of 20 psuedo-random numbers passed into the constructor.
* The initial state of the `foo` binary tree is printed out into the browser's console.
* All ordered, `levelOrder`/`preOrder`/`inOrder`/`postOrder` arrays are logged into the browser's console.
* Another array of 20 pseudo-random numbers between 100 and 200 and those values are inserted into the binary tree.
---
### Instructions
1. Click on [Binary Search Trees](https://mikeycos.github.io/theOdinProject/javaScript/projects/binary-search-trees/dist)
2. Open browser's DevTools and go to the console.
3. In the browser's console:
  * Enter `const variableName = new Tree()`.
  * The current available LinkedList methods:
    * `buildTree`, takes an array of data and turns it into a balanced binary tree full of Node objects appropriately placed. Data is sorted and duplicates are not stored. The buildTree function should return the level-0 root node.
    * `insertNode`, accepts a value, traverses the tree, and inserts a new node as a leaf node.
    * `deleteNode`, accepts a value, traverses the tree, and deletes a node with the given value. Relinks and/or unlinks nodes as needed.
    * `find`, accepts a value and returns the node with the given value.
    * `levelOrder`, accepts a random optional callback function as its parameter. Traverses the tree in breadth-first level order and provide each node as an argument to the callback. As a result, the callback will perform an operation on each node following the order in which they are traversed. Returns an array of values if no callback is given as an argument.
    * `inOrder`, traverses the tree in inorder order; traverse left subtree, visit root, traverse right subtree.
    * `preOrder`, traverses the tree in preorder order; visit root, traverse left subtree, traverse right subtree.
    * `postOrder`, traverses the tree in postorder order; traverse left subtree, traverse right subtree, visit root.
    * `height`, accepts a node and returns its height. Height is defined as the number of edges in the longest path from a given node to a leaf node.
    * `depth`, accepts a node and returns its depth. Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    * `isBalanced`,  checks if the tree is balanced. A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
    * `rebalance`, rebalances an unbalanced tree.