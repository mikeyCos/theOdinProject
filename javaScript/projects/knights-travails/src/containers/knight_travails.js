import Node from './node';
import LinkedList from './linked-list/linked-list';

const checkArguments = (start, end) => {
  //  need to check if arguments are array types
  const err = new Error();
  if (!start && !end) {
    err.message = 'Undefined arguments.';
  } else if (!start && end) {
    err.message = 'Undefined start argument.';
  } else if (start && !end) {
    err.message = 'Undefined end argument.';
  }

  if (err.message) throw err;
};

const moveKnight = (start, count, direction) => {
  //  what if knight goes off the board?
  //  knight can move 1 or 2 squares left/up or right/down
  //  count defines how many squares the knight will move horizontally/vertically
  //  direction defines which direction the knight will move, left/up or right/down
  let u = start;
  for (let i = 0; i < count; i += 1) {
    u = direction ? (u += 1) : (u -= 1);
  }
  if (u < 0 || u > 7) return null;
  return u;
};

const memo = [];
const generatePossibleMoves = (startX, startY, endX, endY) => {
  //  generates all legal moves for a knight
  if (startX === endX && startY === endY) {
    console.log('startX === endX && startY === endY');
    // return { end: [endX, endY] };
  }

  if (memo.find((item) => item.start[0] === startX && item.start[1] === startY))
    return memo.find((item) => item.start[0] === startX && item.start[1] === startY);

  const obj = { start: [startX, startY] };
  const moves = [];

  for (let i = 0; i < 2; i += 1) {
    //  vertical and horizontal moves
    //  moves 1-2 squares left/up or right/down
    for (let j = 0; j < 2; j += 1) {
      const vertDir = i % 2 !== 0; // true => up, false => down
      const horDir = j % 2 === 0; // true => right, false => left
      const newMoveV = [moveKnight(startX, 1, horDir), moveKnight(startY, 2, vertDir)];
      const newMoveH = [moveKnight(startX, 2, horDir), moveKnight(startY, 1, vertDir)];

      if (newMoveV.every((element) => element !== null)) {
        const objMove = { start: newMoveV };
        moves.push(objMove);
      }

      if (newMoveH.every((element) => element !== null)) {
        const objMove = { start: newMoveH };
        moves.push(objMove);
      }
    }
  }

  const midpoint = Math.floor(moves.length / 2);
  let movesLeftHalf = moves.slice(0, midpoint);
  let movesRightHalf = moves.slice(midpoint);

  memo.push(obj);

  movesLeftHalf = movesLeftHalf.map((item) =>
    generatePossibleMoves(item.start[0], item.start[1], endX, endY),
  );

  movesRightHalf = movesRightHalf.map((item) =>
    generatePossibleMoves(item.start[0], item.start[1], endX, endY),
  );

  obj.possibleMoves = movesLeftHalf.concat(movesRightHalf);
  return obj;
};

const findShortestPath = (root, endX, endY) => {
  // performs BFS to find object with it's value equal to endX/Y
  const shortestPaths = [];
  const queue = [];
  const visited = [];
  const startNode = new Node(root.start, 0, root.possibleMoves, null);
  let depth = 0;
  queue.push(startNode);
  while (queue.length > 0) {
    const dequeue = queue.shift();

    visited.push(dequeue);
    if (dequeue.value[0] === endX && dequeue.value[1] === endY) {
      // if dequeue's value equals end push dequeue into an array
      shortestPaths.push(dequeue);
      depth = dequeue.depth;
    }

    if (!queue.some((obj) => obj.depth === dequeue.depth) && depth > 0) {
      // if there are no more items in the queue with dequeue's depth
      // and depth is greater than 0
      return shortestPaths;
    }

    dequeue.possibleMoves.forEach((item) => {
      // check if node has been visited
      if (
        !visited.some((obj) => obj.value[0] === item.start[0] && obj.value[1] === item.start[1])
      ) {
        const newNode = new Node(item.start, dequeue.depth + 1, item.possibleMoves, dequeue);
        queue.push(newNode);
      }
    });
  }

  // no shortest path
  return null;
};

const printPath = (paths) => {
  /*
  => You made it in 3 moves!  Here's your path:
  [3,3]
  [4,5]
  [2,4]
  [4,3]
  */
  const phrase =
    paths.length === 1 ? `is only ${paths.length} permutation` : `are ${paths.length} permutations`;

  console.log(`There ${phrase}.`);
  if (paths) {
    paths.forEach((path) => {
      const numMoves = path.depth;
      // const coordinates = []; // per project spec
      const linkedList = new LinkedList();
      let node = path;
      while (node) {
        linkedList.prepend(node.value);
        // coordinates.unshift(node.value); // per project spec
        node = node.previous;
      }

      console.log(`=> You made it in ${numMoves} moves! Here is the shortest path:`);
      console.log(linkedList.toString());
      // coordinates.forEach((coordinate) => console.log(`[${coordinate}]`)); // per project spec
    });
  }
};

const knightMoves = (start, end) => {
  const startX = start[0];
  const startY = start[1];
  const endX = end[0];
  const endY = end[1];
  if (startX === endX && startY === endY) {
    console.log(
      'The starting and ending squares have the same coordinates. Use a different start or end.',
    );
  } else {
    const possibleMoves = generatePossibleMoves(startX, startY, endX, endY);
    const shortestPath = findShortestPath(possibleMoves, endX, endY);
    printPath(shortestPath);
  }
};

export default knightMoves;
