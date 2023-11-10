# Changelog
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