# Restaurant Page
---
Live preview: [Restaurant Page](https://mikeycos.github.io/theOdinProject/javaScript/projects/restaurant-page/dist)
---
### Ideas
1. Separate changelog into it's own file.
2. 
---
### Questions
1. Why do I need to run `npm run build` after running `npm run start` (i.e. webpack dev server)?  
2. Does the order of `appendChild` matter?
---
### Changelog
- 26 JUL 2023: All modules now render basic content, `contact.js` renders form items and sets the attributes for each input, and the hamburger menu can be closed if any of the links are clicked or if anywhere in the unordered list container is clicked.  
- 25 JUL 2023: Created `footer.js` to generate a footer, applied basic styles, `home.js` renders hours open/location/statement, and implemented a hamburger icon in `header.js`.  
- 24 JUL 2023: Created a JS file to return the content's for each tab, initialized `switchTab()` to loop through object keys and compare with clicked element's class name and calls `this.render(key)`, `activeTab` property added to `content{}` to keep track of what tab user is currently on, changed `./navbar.js` to `./header.js`.  
- 21 JUL 2023: Implemented boilerplate and initiated.  