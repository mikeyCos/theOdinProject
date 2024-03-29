# Changelog
---
### 08 DEC 2023
- Updated README.md and removed the majority of `console.log()` throughout project.
---
### 07 DEC 2023
- Created three `font-face` at rules with three different font-weights, and refactored unit system buttons into one button.  
---
### 06 DEC 2023
- Created `footer.js` module to return a rendered node, created stylesheets for footer/error/loading modules, added slide left/right animations the unit systems buttons, updated the loading module to render a image instead of a heading, applied custom color variables throughout stylesheets, hovering over tab anchors will render feedback to users, the current tab will be in a different font color, and separated selectors for navbar images.  
---
### 05 DEC 2023
- The first `forecastday.hours` array is of length 0 when it is near the end of day, searched for a color palette and defined a root selector in `app.css`, removed `text-wrap: nowrap` from list item with weather condition text, and `formatDate()` can now return a 'shorten' date when a boolean is passed into the function.  
---
### 04 DEC 2023
- Refactored `tabs.js`/`main.js`/`header.js` modules to update `unitsystems.js` with the appropriate unit system and updated weather data when `.unit_systems_button` buttons are pressed or when a tab is clicked on, created CSS files `content`/`header`/`home`, added ternary operator to `formatTime.js` that checks if time string includes a dash, replaced `display: grid` with `display: flex` in `today.css`, stylized buttons of class `.unit_systems_button` to look like a toggle button, and added `text-wrap: nowrap` to specific container elements such as the span element containing the text `As of...`.  
---
### 01 DEC 2023
- Applied basic CSS layout properties for all tabs' stylesheets, buttons of class `.unit_systems_button` changes the unit system respectively, removed default export from `unitsystems.js` module, created `setUnitSystem()` function and `unitSystem` object in `unitsystems.js`, `setUnitSystem()` is called each time `submitForm()` runs in `header.js`, and the today tab currently renders whenever the 'metric/imperial' buttons are activated.  
---
### 30 NOV 2023
- Replaced `getDate()`/`getMonth()`/`getDate()` with `getUTC...` equivalents in `formatDate.js` module, created `unitsystems.js` module and imported for all three tab configuration files, created buttons for celsius (metric) and fahrenheit (imperial) on the navbar, created a placeholder method in `navbar.js` that records what button is clicked, and temporarily included sunrise and sunset properties in `today.config.js` module.  
---
### 29 NOV 2023
- Tab modules: today, hourly and forecast all initialize through object state, each tab module will gather and render specific values on the DOM, date is displayed one day off when time is close to the end of day, today module renders two sections: summary and details, all tab modules render the time stamp when the API data was last updated and the location, and `location.region` will occasionally return an empty string.  
---
### 28 NOV 2023
- Downloaded a progress activity icon to be used in loading module, hourly and today configuration modules now utilize state, object properities are now directly set in their respective object/variable properties, and `setArray()` in `hourly.config.js` now iterates with the reduce method and returns an array.  
---
### 27 NOV 2023
- Restarting project in new branch named `restart-weather-app`, and the `getWeather()` function in `api_controller.js` will run each time a different tab is clicked on (in other words, the weather data is updated each time a a tab is clicked on). 
---
### 24 NOV 2023
- Continued refactoring `hourly.config.js` module, the majority of object properties in `hourly.config.js` module are directly set with dot notation, `setValues()` in `hourly.config.js` only sets the values for the objects pushed into an array, and the array currently does not reset.  
---
### 23 NOV 2023
- Created `loading` module to render a loading screen while fetching data from [WeatherAPI](https://https://www.weatherapi.com/docs/), created `importAll.js` to import all icons from `/assets/icons`, added `condition` and `uv` object properties to `today.config.js` module, and loaded a variety of different Google symbols/icons.  
---
### 21 NOV 2023
- Created `todayController` inside `today.config.js` module to initialize object/properties and find/set object property values, currently the default exported object from `today.config.js` will have the following properties: `data`/`init()`/`location`/`setProperties()`, somewhat completed refactoring `today.config.js` module, added an `attributes` parameter to `createContentRows()`, and started refactoring `forecast.js` module to mirror `today.config.js` module.  
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