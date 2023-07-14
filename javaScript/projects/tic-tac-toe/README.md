# Tic Tac Toe
---
Live preview (https://mikeycos.github.io/theOdinProject/javaScript/projects/tic-tac-toe/)
---
### Ideas
1. Implement minimax algorithm.
2. Undo and redo functionality.
3. Line strike through three in a row.
---
### Questions
1. Is it bad practice to cacheDom element before it exists while other elements do exist and then re-cacheDom?
2. Will rebinding events, on static elements, without removing them cause memory issues?
3. How do you translate the minimax algorithm into JavaScript?
4. Is it bad practice to have each object have their own `cacheDom`/`init`/`render` functions?
5. Why do I need to use an anonymous arrow function expression for `setTimeout()`?
---
### Changelog
14 JUL 2023: `gameMessage` is now an array, changed and removed width values from a variety of elements, added an animation to span elements when the gameboard is marked, added an animation to the header element, `gameboard.render()` adds a class corresponding to a player's marker, and attempted implementing minimax algorithm.  
13 JUL 2023: `scoreboardController` reworked to display who is the active player and displays score, imported Google Fonts Comfortaa and Roboto Mono, changed color palette of elements, and experimented with different width values.  
12 JUL 2023: Implemented a `scoreboardController` object that renders the scoreboard when a player wins and resets the scoreboard when the 'game mode' changes, renamed and added multiple classes to HTML elements, applied CSS grid to the container with class `container-button mode` and it's children, reverted to computer player making pseudo random moves, and span elements now get their text content updated.  
11 JUL 2023: Reevaluating `minimax` functionality, asked "how do we know what tree depth we are on based on the current gameboard. For Example, what if we only started the game? Are at depth 0? Now, if player X marks the board first, are we at depth 1?" and "Is the node argument in minimax(node, depth, maximizingPlayer) referring to the current gameboard?", and `makeMove` returns one move made by active player.  
10 JUL 2023: `setGameState` renamed to `getGameState` and returns a value, `checkGameStatus` renamed to `setGameSTatus`, `getPossibleMoves` gets all possible moves from the current game state and returns the the moves in an array, and `minimax` seems to run after the first conditional statement runs and returns the board.  
6 JUL 2023: Inserted span elements inside button elements and the span's textContent is updated, moved `computer()` onto it's own computer object, researched minimax algorithm, added property `gameState` to object `gameController`, and `checkGameStatus` refactored into to `checkGameStatus` and `setGameState` functions.  
5 JUL 2023: Inputs changes the player's name corresponding to the input's ID and it's value, `players.computer()` randomly selects an empty board element and activates `gameboard.markBoard()`, and issue discovered with winner message if the game is a draw.  
4 JUL 2023: `gameboard.init()` will always initialized the 3x3 two dimensional array, selecting option `Player Vs. Player` will render inputs for player one/two's names, selecting option `Player Vs. Computer` will remove the container with the name inputs, and `setAttributes()` sets attributes for label and inputs.  
3 JUL 2023: Organized `gameboard` object into two parts (`gameboard` and `gameController` objects), button elements inserted in each list item for accessibility, `gameController` renders text with winner's name, and HTML element displaying who won can be clicked to start a new round.  
30 JUN 2023 : `player` factory function only returns updateScore/getName/getMarker/win, `switchTurns` property changes `activePlayer` based on the current state of `activePlayer`, `reset` function created, and planning to refactor the `gameboard` object into smaller peices.  
29 JUN 2023 : `checkGameStatus` will check diagonal values in `gameboard[]` are the same and will return true if game is over, `this.gameboard.flat(1).every(e => e !== null)` checks if the `gameboard[]` is not filled with null values for draw instance, and begun adding variables and functions to `player` factory function.  
28 JUN 2023 : `checkGameStatus` will check if the horizontal and vertical values in the `gameboard[]` are the same.  
27 JUN 2023 : Restarted project, gameboard array is now an object's property, `this.gameboard.flat(1).map((e, index, element)` flattens the 2 dimensional array, `markboard` function checks if the clicked event is empty, and assigned `data-*` attributes to each list item to easily update `gameboard` array.  
26 JUN 2023 : Worked on module pattern for the gameBoard, module can render the current values of `_gameboard[]`, if no index given for `_render(index, marker)` then the function creates and appends a text node, and `Array.from(_spaces).indexOf(e.target)` stores the index of the clicked element.  
23 JUN 2023 : Skeleton HTML/CSS/JS files created.  