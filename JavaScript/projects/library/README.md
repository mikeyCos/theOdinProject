#Library
---
Live preview: (https://mikeycos.github.io/theOdinProject/JavaScript/projects/library/)
---
### Changelog
13 JUN 2023 : Refactored `displayBook()` function by dividing subsequent functions for each book's container creation, added a blur event to each form input, clicking on the reset button then clicking anywhere on the form will validate the first input element, tabbing when the form first appears will not activate the `blur` event listener.  
12 JUN 2023 : Created `validateInput` to perform a validity check for each input except the checkbox, `Add` (Submit) button does not validate all form inputs (`Array.prototype.every()` method immediately terminates at a falsy value), and `Reset` button needs to clear error messages.  
10 JUN 2023 : Read button changes text content and read property of Book, initial text created on nodes with `textContent` changed to `createTextNode`, and preparing validity check for required inputs.  
9 JUN 2023 : Possibly resolved myLibrary and books data-set check inside `displayBook()` function, remove button will now remove book object from array, and in the process implementing read status button to toggle if book has been read or not.  
8 JUN 2023 : Implemented cancel/reset buttons and messing around with `displayBook()` function to check if a book is already being displayed.  
7 JUN 2023 : Dialog element used with `showModal()` method, attached a click event to the dialog element when it is open to close dialog if `e.traget.tagName === 'DIALOG'`, `myLibrary` array will be manipulated on the DOM inside a div wrapper with a container inside and with a list element, and each key-value pair will be on their own 'row'.  
6 JUN 2023 : Initiated skeleton HTML/CSS/JS files and linked files together.  