# Changelog
---
### 21 NOV 2023
- 
---
### 20 NOV 2023
- Attempted refactoring `today.config.js` module, `setText()` method not available for all object properties, and commented out starting code for `setProperties()`.  
---
### 17 NOV 2023
- Continued refactoring module `today.config.js`, `setProperties()` method in `today.config.js` sets properties one and two node-levels in objects, properties that exist in `UnitSystems` and `weatherData` objects will have a `setText()` method, min/max temperatures and wind details are displayed on one line, and numbered values are rounded up/down.  
---
### 16 NOV 2023
- Created helper module `formatTime.js` that will return a string of time formatted to 12 hour clock, object properties are 'called' directly in the `forecast.js` `render()` method, fixed `CHANGELOG.md` punctuation, and in the process of refactoring modules: `today.js` and `today.config.js`.  
---
### 15 NOV 2023
- Initialized modules: `forecast.config.js`, `hourly.config.js`, `createContentRows.js`, and `formatDate.js`, hourly weather is rendered, created a `helpers` directory, and the 3 day forecast is pushed into the property forecastday of `forecast.config.js`.  
---
### 14 NOV 2023
- A select few weather data properties render to the DOM for the today tab, created `today.config.js` module, and created `init()` method for `todayBuilder` that will initialized a value for `today.config.js`.  
---
### 13 NOV 2023
- 'Home' module is loaded on start, fixed API URL in `api_controller.js` from `http` to `https`, errors are now displayed on the DOM, created a navbar for tabs, tabs are displayed when a valid city or postal code is submitted, each tab: forecast/hourly/today can be switched and displayed on the DOM, and entering a new city or postal code will remove the previous content and render a new set of tabs.  
---
### 10 NOV 2023
- Implemented publisher and subscriber, continued to structure component directories, initialized modules: `forecast.js`, `hourly.js`, and `today.js`, and city/postal code can now be entered in input and the weather data object is logged in the console.  
---
### 09 NOV 2023
- Removed `server.js` and uninstalled `webpack-dev-server`, a header including a navigation bar are rendered, `forecast` will now be the default API mode, initialized empty `pubSub.js` module, `createElement.js` is a utility module that will return elements with a valid `tagName`, each component will be in their own directory, and `setAttributes()` method will loop through attributes provided in a component's config file and `textContent` will be set if the property exists in the attributes object.  
---
### 08 NOV 2023
- Initial commit for weather application, ran `git subtree add -P javaScript/projects/weather-app git@github.com:mikeyCos/module-webpack-starter.git main` in the terminal, used private repository `module-webpack-starter` as a starting point, `api_controller` initialized, `getData()` takes in a parameter that will set the value parameter for the URL in `fetch`, and temporarily created a global function to call `getData()` in the console.  
---
### 27 OCT 2023
- Initial `module-webpack-starter` structure created, ESLint and Prettier enabled for the module, configuration files for ESLint and Prettier created, `README.md` included with instructions and notes, placeholder directories created in components, and added `.eslintrc.json` to `.prettierignore`.  
---