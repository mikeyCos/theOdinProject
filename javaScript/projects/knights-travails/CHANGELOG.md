# Changelog
---
### 05 FEB 2024
- Created `knights_travails` Git branch.
- 
---
### 02 FEB 2024
- The `generatePossibleMoves` recursive function appears to construct an object with `start` and `possibleMoves` properties.
For example:
```
knightMoves([3,3],[0,0])
const possibleMoves = generatePossibleMoves(startX, startY, endX, endY);
```
will currently return:
```
{
  start: [3, 3]
  possibleMoves: [
    {start: [4, 1], possibleMoves: Array(6)},
    {start: [5, 2], possibleMoves: Array(8)},
    {start: [2, 1], possibleMoves: Array(6)},
    {start: [1, 2], possibleMoves: Array(6)},
    {start: [4, 5], possibleMoves: Array(8)},
    {start: [5, 4], possibleMoves: Array(8)},
    {start: [2, 5], possibleMoves: Array(8)}, 
    {start: [1, 4], possibleMoves: Array(6)}
  ]
}
```
- The `possibleMoves` object property is an array of possible moves of the `start` object property.
- Applied divide and conquer algorithm to recursively generate half of the subsequent possible moves.
- Noticed `possibleMoves` object property appears to never end.
---
### 01 FEB 2024
- Added more brainstorming comments.
- The `generatePossibleMoves` function will exceed the maximum call stack size.
- The `generatePossibleMoves` function utilizes memoization of possible moves of a starting point; if a starting point exists, it's possible moves have already been generated.
---
### 31 JAN 2024
- Added more brainstorming comments.
- Attempted to convert `generatePossibleMoves` function into a recursive function.
- AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH.
---
### 30 JAN 2024
- Added more brainstorming comments.
- Created `binary-search-tree` and `linked-list` subdirectories.
- Imported `LinkedList` and `Tree` into the `knight_travails` module.
---
### 29 JAN 2024
- Added more brainstorming comments.
- The `knightMoves` function will now record all possible first moves.
- Created `checkArguments` function that will validate inputs for the `knightMoves` function.
- Created `moveVertically` and `moveHorizontally` functions to move a knight within the game board size.
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