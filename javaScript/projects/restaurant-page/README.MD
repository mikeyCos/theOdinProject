# Restaurant Page
---
Live preview: [Restaurant Page](https://mikeycos.github.io/theOdinProject/javaScript/projects/restaurant-page/dist)
---
### Ideas
1. Separate changelog into it's own file.
2. Use ImageMinimizerWebpackPlugin.
3. :heavy_check_mark: Dynamic navigation bar that add/removes menu button and event listeners based on window width.
4. JS Form validation.
---
### Questions
1. Why do I need to run `npm run build` after stopping `npm run start` (i.e. webpack dev server)?  
2. Does the order of `appendChild` matter?
3. How am I able to use custom CSS variables defined in `index.css` in a different CSS file?
4. Does using `sup` element for cents considered a typographical convention?
---
### Changelog
- 04 JUL 2023: Removed `text-align: center` from `hero-text` selector, passed in `null` when creating food objects for appetizers, food price is split and cents is appended inside a `sup` element, `header.js` module now adds and removes a class longer instead of directly altering the navbar unordered list's style, discovered issue with overflowing navbar, and applied transitions and animations to a few containers.  
- 03 JUL 2023: Applied min-height property to a variety of selectors within the `#hero` container, removed the padding property from `#content` selector, downloaded Google Fonts (Nunito Sans and Teko), applied a variety of CSS properties to a variety of elements, resolved elements are overflowing in mobile viewport, and applied media query breakpoint for desktop layout.  
- 02 JUL 2023: Created separate CSS files for each module, implemented `setActiveTab` in `index.js` module to track current tab and add a class to the corresponding navigation item, `#content` section now takes up 100% viewport-height, and attempted to dynamically add/remove the navigation bar.  
- 01 JUL 2023: Z-index applied to navbar unordered list, implemented the ability to change the header's image using the forward/backward buttons, navbar will stick to page upon page scroll, imported uncompressed images, and set carousel image to take 100% of viewport-height.  
- 31 JUL 2023: Added headers to homepage, implemented the ability to import all images inside a repository, and initialized an early build of image carousel.  
- 28 JULL 2023: Refactored `menu.render` in `./menu.js` module and used the map method to iterate through an array of objects, and food objects are directly created inside an array.  
- 27 JUL 2023: Navigation anchor tags set to `display: block`, refractored `./menu.js` to render different food types and their respective details (works in console), imported images to be used in future build(s).  
- 26 JUL 2023: All modules now render basic content, `contact.js` renders form items and sets the attributes for each input, and the hamburger menu can be closed if any of the links are clicked or if anywhere in the unordered list container is clicked.  
- 25 JUL 2023: Created `footer.js` to generate a footer, applied basic styles, `home.js` renders hours open/location/statement, and implemented a hamburger icon in `header.js`.  
- 24 JUL 2023: Created a JS file to return the content's for each tab, initialized `switchTab()` to loop through object keys and compare with clicked element's class name and calls `this.render(key)`, `activeTab` property added to `content{}` to keep track of what tab user is currently on, changed `./navbar.js` to `./header.js`.  
- 21 JUL 2023: Implemented boilerplate and initiated.  