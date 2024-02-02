import LinkedList from './linked-list/linked-list';
import Tree from './binary-search-tree/binary-search-tree';
/*
Its basic move is two steps forward and one step to the side
or one step forward and two steps to the side. It can face any direction.

You can think of the board as having 2-dimensional coordinates.
Your function would therefore look like:
knightMoves([0,0],[1,2]) == [[0,0],[1,2]]

1. Think about the rules of the board and knight, and make sure to follow them.
2. For every square there is a number of possible moves,
choose a data structure that will allow you to work with them.
Don’t allow any moves to go off the board.
3. Decide which search algorithm is best to use for this case.
Hint: one of them could be a potentially infinite series.
4. Use the chosen search algorithm to find the shortest path between 
the starting square (or node) and the ending square.
Output what that full path looks like, e.g.:
> knightMoves([3,3],[4,3])
  => You made it in 3 moves!  Here's your path:
    [3,3]
    [4,5]
    [2,4]
    [4,3]
*/
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

const move = (start, count, direction) => {
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

let memo = [];

const generatePossibleMoves = (startX, startY, endX, endY) => {
  //   generates all legal moves for a knight
  //   how to get all possible moves from [startX, startY] to [endX, endY]?
  //   ignore already visited squares?
  //   recursive function?
  console.log(`startX: ${startX}, startY: ${startY}`);

  // create a node for startX-startY?
  // with a possibleMoves property?
  // console.log(memo.find((item) => item.startX === startX && item.startY === startY));
  if (memo.find((item) => item.startX === startX && item.startY === startY)) return [];
  const obj = { startX, startY };
  // if (startX === endX && startY === endY) return [];
  // if ((startX === null && startY === null) || (startX === undefined && startY === undefined))
  //   return [];
  // console.table(memo);
  // if (memo.find((item) => item[0] === startX && item[1] === startY)) return possibleMoves;

  let moves = [];

  for (let i = 0; i < 2; i += 1) {
    //  vertical and horizontal moves
    //  moves 1-2 squares left/up or right/down
    for (let j = 0; j < 2; j += 1) {
      const vertDir = i % 2 !== 0; // true => up, false => down
      const horDir = j % 2 === 0; // true => right, false => left
      const newMoveV = [move(startX, 1, horDir), move(startY, 2, vertDir)];
      const newMoveH = [move(startX, 2, horDir), move(startY, 1, vertDir)];
      // if newMoveV or newMoveH exists in memo
      //  do not push it into moves
      // const testA = memo.find((item) => item[0] === newMoveV[0] && item[1] === newMoveV[1]);
      // const testB = memo.find((item) => item[0] === newMoveH[0] && item[1] === newMoveH[1]);

      if (newMoveV.every((element) => element !== null)) {
        moves.push(newMoveV);
      }
      if (newMoveH.every((element) => element !== null)) {
        moves.push(newMoveH);
      }
    }
  }

  console.log(moves);
  obj.possible_moves = moves;
  memo.push(obj);
  console.log(obj);
  // need to generate possible moves for each possible move
  moves.forEach((item) => {
    generatePossibleMoves(item[0], item[1], endX, endY);
  });
  /*
  knightMoves([3, 3],[0, 0])
  0: [3, 3] => [[4, 1], [5, 2], [2, 1], [1, 2], [4, 5], [5, 4], [2, 5], [1, 4]]
  1: [4, 1] => [[6, 0], [2, 0], [5, 3], [6, 2], [3, 3], [2, 2]]
    0: [6, 0] => [[7, 2], [5, 2], [4, 1]]
      0: [7, 2] => [[6, 0], [5, 1], [6, 4], [5, 3]]
        0: [6, 0] => []
        1: [5, 1] => [[7, 0], [3, 0], [6, 3], [7, 2], [4, 3], [3, 2]]
          0: [7, 0] => [[6, 2], [5, 1]]
            0: [6, 2] => [[7, 0], [5, 0], [4, 1], [7, 4], [5, 4], [4, 3]]
            1: [5, 0] => ...
    1: [4, 1] => ...
    2: [6, 5] => ...
    3: [4, 5] => ...
    4: [3, 4] => ...
    5: [3, 2] => ...
    6: [7, 4] => ...
    7: [7, 2] => ...
  2: [5, 2] => ...
  3: [2, 1] => ...
  4: [1, 2] => ...
  5: [4, 5] => ...
  6: [5, 4] => ...
  7: [2, 5] => ...
  8: [1, 4] => ...
  */
  memo = [];
  return moves;
};

const knightMoves = (start, end) => {
  //  shows the shortest possible way to get from one square to another
  //  by outputting all squares the knight will stop on along the way.
  const startX = start[0];
  const startY = start[1];
  const endX = end[0];
  const endY = end[1];

  //  All possible moves need to be generated from the starting location
  //  Board size = 8 x 8
  //  Knight MUST stay on the board
  //    KnightLocation at [-1,2] is off the board
  //    KnightLocation <= [7, 7] && KnightLocation >= [0, 0]
  //  Start is a knight's original location
  //    The starting location will be the root node for a data structure
  //  End is a knight's final location
  //    The location the knight needs to get to from the starting location
  //  Generate an array possible moves from the starting location
  //    At most, there are 8 possible moves from a starting location
  //    At least, there are 2 possible moves from a starting location
  //  The generated possible moves are now new starting locations
  //    Recursively generate all possible from subsequent moves
  //    But until when?
  //    What is the base case?

  const possibleMoves = generatePossibleMoves(startX, startY, endX, endY);
  console.log(possibleMoves);

  // possibleMoves = possibleMoves.map((item) => {
  //   const foo = generatePossibleMoves(item[0], item[1], endX, endY);
  //   return foo;
  // });
  // console.log(possibleMoves);

  possibleMoves.forEach((item) => console.log(item));
  // possibleMoves = possibleMoves.map((item) => {
  //   const foo = generatePossibleMoves(item[0], item[1], endX, endY);
  //   return foo;
  // });
  // console.log(possibleMoves);
};

export default knightMoves;

const adjacencyMatrix = [
  /*
  [0, 1, 2, 3, 4, 5, 6, 7] */
  [0, 0, 0, 0, 0, 0, 1, 0], // 7
  [0, 0, 0, 0, 0, 1, 0, 1], // 6
  [0, 0, 0, 0, 1, 0, 1, 0], // 5
  [0, 0, 0, 1, 0, 1, 0, 0], // 4
  [0, 0, 1, 0, 1, 0, 0, 0], // 3
  [0, 1, 0, 1, 0, 0, 0, 0], // 2
  [1, 0, 1, 0, 0, 0, 0, 0], // 1
  [0, 1, 0, 0, 0, 0, 0, 0], // 0
];

const adjacencyList = [[1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6]];
// knightMoves([0,0],[7,7]) == [[0,0],[2,1],[4,2],[6,3],[4,4],[6,5],[7,7]]
/*

knights legal moves
**O   O**     O   O  
O       O   O**   **O

O*    *O    O      O
 *    *     *      *
 O    O     *O    O*

*/
