Tic Tac Toe
---
Live preview (https://mikeycos.github.io/theOdinProject/javaScript/projects/tic-tac-toe/)
---
### Changelog
29 JUN 2023 : `checkGameStatus` will check diagonal values in `gameboard[]` are the same and will return true if game is over, `this.gameboard.flat(1).every(e => e !== null)` checks if the `gameboard[]` is not filled with null values for draw instance, and begun adding variables and functions to `player` factory function.  
28 JUN 2023 : `checkGameStatus` will check if the horizontal and vertical values in the `gameboard[]` are the same.  
27 JUN 2023 : Restarted project, gameboard array is now an object's property, `this.gameboard.flat(1).map((e, index, element)` flattens the 2 dimensional array, `markboard` function checks if the clicked event is empty, and assigned `data-*` attributes to each list item to easily update `gameboard` array.  
26 JUN 2023 : Worked on module pattern for the gameBoard, module can render the current values of `_gameboard[]`, if no index given for `_render(index, marker)` then the function creates and appends a text node, and `Array.from(_spaces).indexOf(e.target)` stores the index of the clicked element.  
23 JUN 2023 : Skeleton HTML/CSS/JS files created.  