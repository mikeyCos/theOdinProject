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
  // need to check if arguments are array types
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

const moveVertically = (yStart, count, direction) => {
  // what if knight goes off the board?
  // knight can move 1 or 2 squares up or down
  // count defines how many squares the knight will move vertically
  // direction defines which direction the knight will move, up or down
  let y = yStart;
  for (let i = 0; i < count; i += 1) {
    y = direction ? (y += 1) : (y -= 1);
  }

  if (y < 0 || y > 7) return null;
  return y;
};

const moveHorizontally = (xStart, count, direction) => {
  // what if knight goes off the board?
  // knight can move 1 or 2 squares left or right
  // count defines how many squares the knight will move horizontally
  // direction defines which direction the knight will move, left or right
  let x = xStart;
  for (let i = 0; i < count; i += 1) {
    x = direction ? (x += 1) : (x -= 1);
  }
  if (x < 0 || x > 7) return null;
  return x;
};

const knightMoves = (start, end) => {
  // shows the shortest possible way to get from one square to another
  // by outputting all squares the knight will stop on along the way.
  checkArguments(start, end);
  let x = start[0];
  let y = start[1];

  const possibleMoves = [];

  for (let i = 0; i < 2; i += 1) {
    // vertical moves
    const vertDir = i % 2 !== 0;
    for (let j = 0; j < 2; j += 1) {
      const horDir = j % 2 === 0;
      const move = [moveHorizontally(x, 1, horDir), moveVertically(y, 2, vertDir)];
      if (move[0] && move[1]) possibleMoves.push(move);
    }
  }

  for (let i = 0; i < 2; i += 1) {
    // horizontal moves
    const horDir = i % 2 !== 0;
    for (let j = 0; j < 2; j += 1) {
      const vertDir = j % 2 === 0;
      const move = [moveHorizontally(x, 2, horDir), moveVertically(y, 1, vertDir)];
      if (move[0] && move[1]) possibleMoves.push(move);
    }
  }

  console.table(possibleMoves);
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
