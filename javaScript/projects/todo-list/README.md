# Todo List
---
Live preview: [Todo List](https://mikeycos.github.io/theOdinProject/javaScript/projects/todo-list/dist)
---
### Ideas
1. [Penpot Concept]()
2. Placeholder2
---
### Questions
1. How do we distinguish a single step versus a single responsibility?
2. How to find the depth of object properties and use the depth value to tranverse through object properties?
---
### Changelog
- 14 AUG 2023: Restructured files into different file names and directories (i.e. components, containers, ultilities), render function in `sidebar.js` iterates through objects and checks if `childElement` property is an object, and created `form_project.js` to provide a form for users to create a project.
- 11 AUG 2023: A header element with content now renders in `index.js` when `main.init()` is called, removed `barrel.js` and imported/exported modules as needed, template now generates a generic container inside the body's first element, header content appended inside body's first element, and sidebar element appended inside `#content_main` container.  
- 10 AUG 2023: Tried to implement a recursive function to find project with project name, added `barrel.js` to import and export all modules as needed, and created `import-all.js` module to help import all of provided file type.  
- 09 AUG 2023: Replaced `project.forEach` with for in loop, implemented the ability to add a task based on project's name, and experimented with assigning a new object property to an existing object.  
- 08 AUG 2023: Removed `print.js` module, created `project-controller.js` module, a project object can be created and pushed into an array of projects (console), and a project can be deleted from the array of projects based on the project's title (console).  
- 07 AUG 2023: Initial commit, webpack installed and configured, template HTML intialized, pseudo code added in `index.js`, and brainstorming project ideas.  