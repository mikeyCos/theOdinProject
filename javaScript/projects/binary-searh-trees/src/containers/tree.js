import mergeSort from './mergesort';
import Node from './node';

const Tree = (array) => {
  // Accepts an array when initialized.
  // The Tree class should have a root attribute, which uses the return value of buildTree
  const sortedArray = mergeSort(array);
  let root;
  let memo = {};
  const buildTree = (arr, start, end) => {
    // Takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
    // Turns it into a balanced binary tree full of Node objects appropriately placed
    // (don’t forget to sort and remove duplicates!).
    // The buildTree function should return the level-0 root node.
    if (start > end) return null;

    const midPoint = Math.floor((start + end) / 2);
    const rootNode = new Node(arr[midPoint]);
    rootNode.leftNode = buildTree(arr, start, midPoint - 1);
    rootNode.rightNode = buildTree(arr, midPoint + 1, end);

    return rootNode;
  };

  const insertNode = (value) => {
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
    // Implementation of these methods should traverse the tree and manipulate the nodes and their connections.
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
    const targetNode = find(value);
    const parentNode = predecessor(value);
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
    }
  };

  const levelOrder = (callback, node = root, arr = []) => {
    // Accepts a random OPTIONAL callback function as its parameter
    // Traverse the tree in breadth-first level order and provide each node as an argument to the callback.
    // The callback will perform an operation on each node following the order in which they are traversed.
    // The method should return an array of values if no callback is given as an argument.
    // You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list
    return `levelOrder()`;
  };

  const inOrder = (callback, node = root, arr = []) => {
    // left => root => right
    // elements of the array will be in order
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.

    if (node) {
      inOrder(callback, node.leftNode, arr);
      arr.push(node.data);
      inOrder(callback, node.rightNode, arr);
    }

    return arr;
  };

  const preOrder = (callback) => {
    // root => left => right
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.
  };

  const postOrder = (callback) => {
    // left => right => root
    // Accepts a random optional callback as a parameter.
    // Traverse the tree in their respective depth-first order and yield each node to the provided callback.
    // Return an array of values if no callback is given as an argument.
  };

  const height = (node) => {
    // Accepts a node and returns its height.
    // Height is defined as the number of edges in the longest path from a given node to a leaf node.
  };

  const depth = (node) => {
    // Accepts a node and returns its depth.
    // Depth is defined as the number of edges in the path from a given node to the tree’s root node.
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

  root = buildTree(sortedArray, 0, sortedArray.length - 1);
  return {
    root,
    buildTree,
    insertNode,
    deleteNode,
    find,
    inOrder,
    prettyPrint,
  };
};

export default Tree;
