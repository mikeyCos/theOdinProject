# Todo List
---
Live preview: [Todo List](https://mikeycos.github.io/theOdinProject/javaScript/projects/todo-list/dist)
---
### Ideas
1. Form validator module.  
2. Update current url with respective anchor href; `window.location`.
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
- 17 SEP 2023: Created `init()` function inside `projectController` object to reassign project methods, `projectController.init()` is called in `storage.js` after getting localStorage item, 
- 15 SEP 2023: Refactored init and find functions in `task_form.js`, and created `storage.js` module to handle local storage.  
- 13 SEP 2023: Tasks can be added to 'Inbox', 'Inbox' is a project object and cannot be deleted, due date value format changed from `YYYY-MM-DD` to `DDD MMM DD YYYY` (2024-03-04 to Sun Mar 03 2024), tasks can can be moved to and from different projects, and 'Inbox' is added to the project selection.  
- 12 SEP 2023: Resolved priority default/selected value when switching from creating a new task and editing a present task, modal to create a new task works despite a project not being in 'focused', and a task can be created in non-focused project.  
- 11 SEP 2023: Tasks can be edited and inputs that were not originally filled can be submitted, the element containing the edited task is recorded when clicked and is reset whenever a new element is clicked on, select projects intialized and sets the 'active' project as the default selection option, and removed `tasks_form_edit.js` module.  
- 08 SEP 2023: User can pick a due date and priority for tasks upon task creation, priority's default value is 4, inputs for creating a task that are not required and those that are not filled are not recorded into it's object's properties (for example, if due date is not filled, that task does not have a due_date property), refactored add and delete button modules into one module, and each task can be clicked on and renders a form to edit it's content.  
- 05 SEP 2023: Both task forms can be canceled and closed, refactored the way projects and tasks can be created in the `project-controller.js` module, home is only rendered when an active project (it is displayed on the `main_content` container) is deleted, tasks can be added to their respective projects, and newly created tasks are dynamically rendered to the DOM (if the non-modal form is opened, tasks are appended to the container before the form.).  
- 30 AUG 2023: A project that is deleted from the sidebar while active on the `main_content` section will automatically set the `main_content` section to 'home', hard-coded tasks can be rendered for display, and imported `buildTasksForm()` into `header.js` module.
- 29 AUG 2023: Factory function created in `projects_list.js` to create an object for the sidebar and project modules, sidebar and project modules will have unique properties (ex, cached elements are restricted to their respective module), creating a project will change the `main_content` section to the newly created project, created `project_tasks.js` and `tasks_form.js` modules, and clicking the 'projects' anchor on the sidebar will render a list of projects on the `main_content` section (similar to the one show on the sidebar).  
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