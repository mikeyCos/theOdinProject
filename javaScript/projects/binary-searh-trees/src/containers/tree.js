import mergeSort from './mergesort';
import Node from './node';

export default class Tree {
  // Accepts an array when initialized.
  // The Tree class should have a root attribute, which uses the return value of buildTree
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  #setRoot = (node) => {
    this.root = node;
  };

  prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  #sortedArrayToBST = (arr, start, end) => {
    if (start > end) return null;

    const midPoint = Math.floor((start + end) / 2);
    const rootNode = new Node(arr[midPoint]);
    rootNode.leftNode = this.#sortedArrayToBST(arr, start, midPoint - 1);
    rootNode.rightNode = this.#sortedArrayToBST(arr, midPoint + 1, end);
    // const childNodeOne = sortedArrayToBST(arr, start, midPoint - 1);
    // const childNodeTwo = sortedArrayToBST(arr, midPoint + 1, end);

    // if (childNodeOne) {
    //   if (rootNode.data < childNodeOne.data) {
    //     rootNode.rightNode = childNodeOne;
    //   } else if (rootNode.data > childNodeOne.data) {
    //     rootNode.leftNode = childNodeOne;
    //   }
    // }
    // console.log(rootNode);
    // if (childNodeTwo) {
    //   if (rootNode.data < childNodeTwo.data) {
    //     rootNode.rightNode = childNodeTwo;
    //   } else if (rootNode.data > childNodeTwo.data) {
    //     rootNode.leftNode = childNodeTwo;
    //   }
    // }

    return rootNode;
  };

  buildTree = (arr) => {
    // Takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
    // Turns it into a balanced binary tree full of Node objects appropriately placed
    // (don’t forget to sort and remove duplicates!).
    // The buildTree function should return the level-0 root node.
    const sortedArr = mergeSort(arr);
    return this.#sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
    // return sortedArrayToBST(arr, 0, arr.length - 1);
  };

  insertNode = (value) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    const newNode = new Node(value);
    if (this.root === null) {
      this.#setRoot(newNode);
    } else {
      let node = this.root;
      while (node) {
        if (node.data < value) {
          // go right
          if (node.rightNode === null) {
            node.rightNode = newNode;
          } else {
            node = node.rightNode;
          }
        } else if (node.data > value) {
          // go left
          if (node.leftNode === null) {
            node.leftNode = newNode;
          } else {
            node = node.leftNode;
          }
        } else {
          // duplicate found
          break;
        }
      }
    }
  };

  find = (value, node = this.root) => {
    // Accepts a value and returns the node with the given value.
    let nextNode = node;
    if (nextNode === null) return null;
    if (nextNode.data === value) return nextNode;

    if (node.data > value) nextNode = this.find(value, node.leftNode);
    if (node.data < value) nextNode = this.find(value, node.rightNode);
    return nextNode;
  };

  #predecessor = (value, node = this.root) => {
    // returns predecessor node of given value
    // how to refactor this?
    let nextNode = node;
    if (nextNode === null) return null;
    if (
      (nextNode.leftNode && nextNode.leftNode.data === value) ||
      (nextNode.rightNode && nextNode.rightNode.data === value)
    ) {
      return nextNode;
    }

    if (node.data > value) nextNode = this.#predecessor(value, nextNode.leftNode);
    if (node.data < value) nextNode = this.#predecessor(value, nextNode.rightNode);

    return nextNode;
    // if (this.root.data === value) return this.root;
    // let node = this.root;
    // while (node) {
    //   if (
    //     (node.leftNode && node.leftNode.data === value) ||
    //     (node.rightNode && node.rightNode.data === value)
    //   ) {
    //     break;
    //   }

    //   if (node.data > value) {
    //     // go left
    //     node = node.leftNode;
    //   } else if (node.data < value) {
    //     // go right
    //     node = node.rightNode;
    //   }
    // }
    // return node;
  };

  deleteNode = (value) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    // There will be several cases for delete, such as when a node has children or not.
    const targetNode = this.find(value);
    if (targetNode) {
      const { leftNode } = targetNode;
      const { rightNode } = targetNode;
      const parentNode = this.#predecessor(value);
      console.log(parentNode);
      if (leftNode && rightNode) {
        // has 2 children
        console.log(`targetNode has 2 children`);
        let successor = targetNode.rightNode;
        while (successor) {
          if (!successor.leftNode) break;
          successor = successor.leftNode;
        }
        console.log(successor);
        // successor.leftNode = leftNode;
        // const parentSuccessor = this.#predecessor(successor.data);

        // const tmp = parentSuccessor;
        // tmp.leftNode = null;
        // successor.rightNode = tmp;
        // console.log(parentSuccessor);
        // console.log(successor);
        // console.log(tmp);
        // if (parentNode.rightNode && parentNode.rightNode.data === value) {
        //   parentNode.rightNode = successor;
        // }

        // if (parentNode.leftNode && parentNode.leftNode.data === value) {
        //   parentNode.leftNode = successor;
        // }
      } else if (leftNode || rightNode) {
        // has 1 child
        console.log(`targetNode has 1 child`);
        // if (parentNode.rightNode && parentNode.rightNode.data === value)
        //   parentNode.rightNode = !leftNode ? rightNode : leftNode;
        // if (parentNode.leftNode && parentNode.leftNode.data === value)
        //   parentNode.leftNode = !rightNode ? leftNode : rightNode;
      } else {
        // leaf node, no children
        console.log(`targetNode has no children`);
        // if (parentNode.rightNode && parentNode.rightNode.data === value) parentNode.rightNode = null;
        // if (parentNode.leftNode && parentNode.leftNode.data === value) parentNode.leftNode = null;
        // if (this.root.data === value) this.root = null;
      }
    }
    this.prettyPrint(this.root);
  };

  levelOrder = (callback) => {
    // Accepts a random OPTIONAL callback function as its parameter
    // Traverse the tree in breadth-first level order and provide each node as an argument to the callback.
    // The callback will perform an operation on each node following the order in which they are traversed.
    // The method should return an array of values if no callback is given as an argument.
    // You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
    const arr = [];
    const queue = [];
    if (this.root) queue.push(this.root);
    while (queue.length > 0) {
      const dequeue = queue.splice(0, 1)[0];
      if (callback) {
        callback(dequeue);
      } else {
        arr.push(dequeue.data);
      }

      if (dequeue.leftNode) queue.push(dequeue.leftNode);
      if (dequeue.rightNode) queue.push(dequeue.rightNode);
    }

    return callback ? undefined : arr;
  };

  inOrder = (callback, node = this.root, arr = []) => {
    // left => root => right
    // elements of the array will be in order
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      this.inOrder(callback, node.leftNode, arr);
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }
      this.inOrder(callback, node.rightNode, arr);
    }

    return callback ? undefined : arr;
  };

  preOrder = (callback, node = this.root, arr = []) => {
    // root => left => right
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }

      this.preOrder(callback, node.leftNode, arr);
      this.preOrder(callback, node.rightNode, arr);
    }

    return callback ? undefined : arr;
  };

  postOrder = (callback, node = this.root, arr = []) => {
    // left => right => root
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      this.postOrder(callback, node.leftNode, arr);
      this.postOrder(callback, node.rightNode, arr);
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }
    }

    return callback ? undefined : arr;
  };

  height = (node) => {
    // Accepts a node and returns its height.
    // Height is defined as the number of edges in the longest path from a given node to a leaf node.
  };

  depth = (node) => {
    // Accepts a node and returns its depth.
    // Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    let nextNode = this.root;
    let depthNum = 0;
    while (nextNode) {
      if (nextNode.data !== node.data) {
        depthNum += 1;
        if (nextNode.data > node.data) {
          // go left
          nextNode = nextNode.leftNode;
        } else {
          // go right
          nextNode = nextNode.rightNode;
        }
      } else {
        break;
      }
    }

    return depthNum;
  };

  isBalanced = () => {
    // Checks if the tree is balanced.
    // A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
  };

  rebalance = () => {
    // Rebalances an unbalanced tree.
    // You’ll want to use a traversal method to provide a new array to the buildTree function.
  };

  // root = buildTree(sortedArray, 0, sortedArray.length - 1);
}
