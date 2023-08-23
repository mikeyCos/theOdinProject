# Todo List
---
Live preview: [Todo List](https://mikeycos.github.io/theOdinProject/javaScript/projects/todo-list/dist)
---
### Ideas
1. Form validator module.  
---
### Questions
1. How do we distinguish a single step versus a single responsibility?
2. How to find the depth of object properties and use the depth value to tranverse through object properties?
3. Is it worth creating modules for individual elements (ex, button elements)?
4. Does exporting/importing a module use memory? If so, how?
5. Is it less efficient removing/adding an element than updating the element's contents? For example, adding and removing `#projects_list`.  
6. What is the point, if any, using an object literal pattern when using ES6 modules?
---
### Changelog
- 22 AUG 2023: Temporarily(?) fixed the ability to add/delete projects to the sidebar, and elements in `cacheDOM()` from `projects_list.js` are preventing each parent container being unique.  
- 21 AUG 2023: Attempting to update project list after it has been created within `projects_list.js` module, and renamed `form_` `form`/`projects``.js` to `projects_form.js`.  
- 18 AUG 2023: Removed `/template`, refactored `app.js` so that `#todo_app`/`#content`/header/sidebar/and main are appended to `document.body` at the start, and created `pubSub.js` module to link events together.  
- 17 AUG 2023: Created a `button_delete.js` module that returns a button with a class name `btn_delete_project/task`, a project is assigned a random UUID during initialization, user can create a project and delete a project from the DOM, and clicking the 'tash' button will delete the project from the DOM and remove it's counterpart in the `projects[]` by their corresponding UUID.  
- 16 AUG 2023: The `btnMenu` button can now change the sidebar's display to none or an empty string, `btn-add-project` now creates/deletes a dialog element containing a form element, and `submitForm()` defined in `formProject` object.  
- 15 AUG 2023: Restarted project, refactored `header.js` into one forEach loop, `toggleSidebar()` included in `sidebar.js` and is imported into `header.js`, created `button_add.js` module that exports `buildButtonAddProject()` and the function returns a add task/project button, and `.btn-menu` is bound to `toggleSidebar()`.  
- 14 AUG 2023: Restructured files into different file names and directories (i.e. components, containers, ultilities), render function in `sidebar.js` iterates through objects and checks if `childElement` property is an object, and created `form_project.js` to provide a form for users to create a project.
- 11 AUG 2023: A header element with content now renders in `index.js` when `main.init()` is called, removed `barrel.js` and imported/exported modules as needed, template now generates a generic container inside the body's first element, header content appended inside body's first element, and sidebar element appended inside `#content_main` container.  
- 10 AUG 2023: Tried to implement a recursive function to find project with project name, added `barrel.js` to import and export all modules as needed, and created `import-all.js` module to help import all of provided file type.  
- 09 AUG 2023: Replaced `project.forEach` with for in loop, implemented the ability to add a task based on project's name, and experimented with assigning a new object property to an existing object.  
- 08 AUG 2023: Removed `print.js` module, created `project-controller.js` module, a project object can be created and pushed into an array of projects (console), and a project can be deleted from the array of projects based on the project's title (console).  
- 07 AUG 2023: Initial commit, webpack installed and configured, template HTML intialized, pseudo code added in `index.js`, and brainstorming project ideas.  