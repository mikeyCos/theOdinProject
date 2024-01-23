import mergeSort from './mergesort';
import Node from './node';

const Tree = (array) => {
  // Accepts an array when initialized.
  // The Tree class should have a root attribute, which uses the return value of buildTree
  let root;
  let memo = {};

  const sortedArrayToBST = (arr, start, end) => {
    if (start > end) return null;

    const midPoint = Math.floor((start + end) / 2);
    const rootNode = new Node(arr[midPoint]);
    rootNode.leftNode = sortedArrayToBST(arr, start, midPoint - 1);
    rootNode.rightNode = sortedArrayToBST(arr, midPoint + 1, end);
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

  const buildTree = (arr) => {
    // Takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
    // Turns it into a balanced binary tree full of Node objects appropriately placed
    // (don’t forget to sort and remove duplicates!).
    // The buildTree function should return the level-0 root node.
    const sortedArr = mergeSort(arr);
    return sortedArrayToBST(sortedArr, 0, sortedArr.length - 1);
    // return sortedArrayToBST(arr, 0, arr.length - 1);
  };

  const insertNode = (value) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    let node = root;
    const newNode = new Node(value);
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
  };

  const find = (value) => {
    // Accepts a value and returns the node with the given value.
    let node = root;
    while (node) {
      if (node.data > value) {
        // go left
        node = node.leftNode;
      } else if (node.data < value) {
        // go right
        node = node.rightNode;
      } else {
        break;
      }
    }
    return node;
  };

  const predecessor = (value) => {
    // returns predecessor node of given value
    // how to refactor this?
    let node = root;

    while (node) {
      if (node.data > value) {
        // go left
        node = node.leftNode;
      } else if (node.data < value) {
        // go right
        node = node.rightNode;
      } else {
        break;
      }

      if (
        (node.leftNode && node.leftNode.data === value) ||
        (node.rightNode && node.rightNode.data === value)
      ) {
        break;
      }
    }
    return node;
  };

  const deleteNode = (value) => {
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
    // There will be several cases for delete, such as when a node has children or not.

    let targetNode = find(value);
    const parentNode = predecessor(value);
    // let nodeLink =
    //   parentNode.leftNode && parentNode.leftNode.value === value
    //     ? parentNode.leftNode
    //     : parentNode.rightNode;
    const { leftNode } = targetNode;
    const { rightNode } = targetNode;
    console.log(targetNode);
    if (leftNode && rightNode) {
      // has 2 children
      console.log(`targetNode has 2 children`);
    } else if (leftNode || rightNode) {
      // has 1 child
      console.log(`targetNode has 1 child`);
    } else {
      // no children
      console.log(`targetNode has no children`);
      targetNode = null;
    }
  };

  const levelOrder = (callback) => {
    // Accepts a random OPTIONAL callback function as its parameter
    // Traverse the tree in breadth-first level order and provide each node as an argument to the callback.
    // The callback will perform an operation on each node following the order in which they are traversed.
    // The method should return an array of values if no callback is given as an argument.
    // You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
    const arr = [];
    const queue = [];
    if (root) queue.push(root);
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

  const inOrder = (callback, node = root, arr = []) => {
    // left => root => right
    // elements of the array will be in order
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      inOrder(callback, node.leftNode, arr);
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }
      inOrder(callback, node.rightNode, arr);
    }

    return callback ? undefined : arr;
  };

  const preOrder = (callback, node = root, arr = []) => {
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

      preOrder(callback, node.leftNode, arr);
      preOrder(callback, node.rightNode, arr);
    }

    return callback ? undefined : arr;
  };

  const postOrder = (callback, node = root, arr = []) => {
    // left => right => root
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      postOrder(callback, node.leftNode, arr);
      postOrder(callback, node.rightNode, arr);
      if (callback) {
        callback(node);
      } else {
        arr.push(node.data);
      }
    }

    return callback ? undefined : arr;
  };

  const height = (node) => {
    // Accepts a node and returns its height.
    // Height is defined as the number of edges in the longest path from a given node to a leaf node.
  };

  const depth = (node) => {
    // Accepts a node and returns its depth.
    // Depth is defined as the number of edges in the path from a given node to the tree’s root node.
    let nextNode = root;
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

  const isBalanced = () => {
    // Checks if the tree is balanced.
    // A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
  };

  const rebalance = () => {
    // Rebalances an unbalanced tree.
    // You’ll want to use a traversal method to provide a new array to the buildTree function.
  };

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  // root = buildTree(sortedArray, 0, sortedArray.length - 1);
  root = buildTree(array);
  return {
    root,
    buildTree,
    insertNode,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    depth,
    prettyPrint,
  };
};

export default Tree;
