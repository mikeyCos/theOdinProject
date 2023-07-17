Library
---
# Ideas
1. Clicking book title expands book info.
2. Expand all button.
3. ISBN look up inside form.
4. Focus on the last item created.
---
Live preview: (https://mikeycos.github.io/theOdinProject/javaScript/projects/library/)
---
# Bugs
1. Sometimes, when the form is submitted and reopened the first/last input is validated. `e.stopImmediatePropagation();` Attached to multiple event handlers.
---
### Changelog
17 JUL 2023: Refactored `Book` object into a class and included the `toggleReadStatus` function inside the class notation.  
21 JUN 2023 : First input is focused when modal is opened then `modal.focus()` changes focus from the input to the modal, books that have been read will be assigned the class name `read`, set transition duration for book containers, `buttonAddNewBook.scrollIntoView()` after form is submitted with valid inputs.  
20 JUN 2023 : Pattern/minlength/custommaxlength applied to validation rules, imported Google fonts `Titillium Web / Pathway Extreme`, ISBN input is recorded as a number and removes dashes, changed color palette, for loops using `books.length` are subtracted by 1 and index starting at 0, link to Github repository included on header, and applied font properties to form and book containers.  
19 JUN 2023 : Removed borders for debugging, library children elements max size is 300px on mobile and 25% on screen sizes equal/above 768px wide, book elements now append before the `button-add-book` node, and added `fill` attribute for each validity icon in their respective svg fill.  
18 JUN 2023 : `createBookButtons` function now creates and appends an image tag, input validity styles are now altered by assigning a class name, and increased column size for books at media query breakpoint.  
17 JUN 2023 : Wrapped input elements inside a container, implemented a span element with class name `validity` that changes icon based on validity check, and updated querySelectors for validity event listeners.  
16 JUN 2023 : Applied CSS styles, researched and changed color schemes, replaced form button text with images, and rearranged form buttons.  
15 JUN 2023 : Refactored `addBookToLibrary()` function, `createBookButtons` now utilizes a for loop to create the buttons, buttons on each book container is wrapped in their own div containers that are both inside a div container, and experimenting with CSS properties.  
14 JUN 2023 : Validation happens after modal is opened, `Cancel` and when the modal is closed event listeners on input elements are removed, and the `toggleReadStatus()` function now references `Book.prototype.toggleReadStatus` and changes the read status for that book the button is assigned to.  
13 JUN 2023 : Refactored `displayBook()` function by dividing subsequent functions for each book's container creation, added a blur event to each form input, clicking on the reset button then clicking anywhere on the form will validate the first input element, tabbing when the form first appears will not activate the `blur` event listener.  
12 JUN 2023 : Created `validateInput` to perform a validity check for each input except the checkbox, `Add` (Submit) button does not validate all form inputs (`Array.prototype.every()` method immediately terminates at a falsy value), and `Reset` button needs to clear error messages.  
10 JUN 2023 : Read button changes text content and read property of Book, initial text created on nodes with `textContent` changed to `createTextNode`, and preparing validity check for required inputs.  
9 JUN 2023 : Possibly resolved myLibrary and books data-set check inside `displayBook()` function, remove button will now remove book object from array, and in the process implementing read status button to toggle if book has been read or not.  
8 JUN 2023 : Implemented cancel/reset buttons and messing around with `displayBook()` function to check if a book is already being displayed.  
7 JUN 2023 : Dialog element used with `showModal()` method, attached a click event to the dialog element when it is open to close dialog if `e.traget.tagName === 'DIALOG'`, `myLibrary` array will be manipulated on the DOM inside a div wrapper with a container inside and with a list element, and each key-value pair will be on their own 'row'.  
6 JUN 2023 : Initiated skeleton HTML/CSS/JS files and linked files together.  