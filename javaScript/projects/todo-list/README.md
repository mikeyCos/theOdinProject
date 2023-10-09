# Todo List
---
Live preview: [Todo List](https://mikeycos.github.io/theOdinProject/javaScript/projects/todo-list/dist)
---
### Ideas
1. Form validator module.  
2. Update current url with respective anchor href; `window.location`.
3. :heavy_check_mark: Change time representation from 24-hour clock to 12-hour clock.
4. Button for editing date/time.
5. Edit project name.
6. :heavy_check_mark: Rewrite priority selection into a list with a hidden input.
7. Undo task completed.
8. Render/show sidebar when screen is resized at breakpoint.
9. Prevent Inbox from rendering when the last project is deleted while the content on the projects tab.
10. Need to refactor `projectController.projects` to be able to set active.
---
### Questions
1. How do we distinguish a single step versus a single responsibility?
2. How to find the depth of object properties and use the depth value to tranverse through object properties?
3. Is it worth creating modules for individual elements (ex, button elements)?
4. Does exporting/importing a module use memory? If so, how?
5. Is it less efficient removing/adding an element than updating the element's contents? For example, adding and removing `#projects_list`.  
6. What is the point, if any, using an object literal pattern when using ES6 modules?
7. Is there a way to style all elements except for elements with SVG childs?
---
### About
Project: Todo List

Hello world,

However, a few weeks in, I wanted to give up on this project despite being able to create/delete projects and tasks in the console. At the time, I did not know how to structure my modules and allow certain modules to communicate with each other. At first, I wanted to export and import specific object properties instead of the entire object itself, because, I have designed almost all my modules with object literal pattern. With this in mind, I thought about going away with object literal patterns since I will be using ES6 modules and, in that case, I can import and export functions and variables at will. However, importing and exporting multiple functions/variables into and from multiple ES6 modules did not make sense to me and I thought about how I can lose track where those imports/exports are being made.

In a call for help, I turned to the TOP's Discord server for help and someone recommended a collector design pattern. I also saw that a few TOP members were trying to implment a publish/subscribe design pattern. Both of these design patterns ended up being a huge leap forward. 

My `projectController.js` module takes a similar shape to the collector design pattern and, like a few other modules, I use state to create projects and tasks. The state of projects and tasks grant each object unique control to their respective properties. So each project is unique to their own self and each task created is unique to their respective project; unless we move a task to/from a project. The `projectController` object has methods and properties can only be accessed from itself. This means, project objects cannot use methods associated from the `projectController` despite creating project objects from the `projectController`. 

The publish/subscribe pattern allowed me to limit importing/exporting objects to/from another. In this sense, I was able to keep some objects inside their own ES6 module while letting another module use that object's subscribed method. For example, in `tasks_list.js`, `this.removeTask` is subscribed with the name `removeTask`. When a task is removed a 'confirmation' form-modal is created and when the form-modal is submitted, then `removeTask` is published with an argument (the task's UUID). Now, we are back in `tasks_list.js` module with `this.removeTask(task's UUID)`, the task is removed from it's respective project and from the DOM.

I decided to use the collector pattern and state management(?) for other sections of the Todo List. For example, a projects' list can be on multiple parts of the sidebar and on the content section. On the sidebar, Inbox and Today is one list of projects and below that consists of a list of projects a user has created; Inbox and Today projects cannot be deleted by user. If a user clicks on the 'projects' element on the sidebbar, then another projects list (same list on the sidebar, consisting of projects a user has created) will be rendered on the `main_content` section. Each section is saved in an array inside the `buildList` object found in the `projects_list.js` module. If that type of section already exists in the array, we reset only the container, otherwise, we create a new array item.

The `tasks_form.js` is another ES6 module that heavily relies on state because depending on what button is clicked a form-modal or a form-non-modal element is created, and both types of forms can simultaneously exist on the DOM while being unique. However, only one form-non-modal an exist, because state determines if the form is going to be for editing/updating a task or creating a new task. The `formInputs` object returns it's `inputs` object property. Depending on the state, the form input values either initialized or not. If those values are not initialized, the submit button will have a class of `btn_submit_task` whereas the former will hook a submit button with a class of `btn_update_task`; both buttons are independently assigned to the `formButtons` property of the `inputs` object. In the end, the `formChildren` property object from the `inputs` object is assigned to the `formTask` object.

I was afraid of implementing localStorage, because it was new. Initially, I was populating storage each time a project/task is added/removed. Even though this is still the case, all projects are being diverted to one array; `allProjects` in `projectController`. When all projects are diverted into `allProjects`, that is when localStorage is updated. LocalStorage was mind-blowing because now I can submit data, save it in local and retrieve it.

More weeks went by and my despair subsided. Now, curiousity took over to the point of implementing more than what is required for the project. I used [todoist](https://todoist.com/) by Doist Inc. as inspiration and adopted some of the features from their application; such as, the inbox, today, sidebar projects section, clicking the home button goes to the today section, a newly created project will be rendered on the main content section, inbox will be rendered when the project on the main content section is deleted (for example, viewing and deleting a project will render the inbox section), deleting a project/task will render a popup, custom select element for choosing a task's priority/project, and the ability to add/move tasks to/from different projects.

Enough is enough! I intentionally told myself "I need to stop adding more features" or else I would never finish the project. One of the last implementations I did was using [SVGInject](https://github.com/iconfu/svg-inject). This allowed me to easily apply CSS properties to SVG elements versus using a filter property on IMG elements. This is really cool how img tags are transformed into svg tags after the image is loaded; does the `onload` attribute slow down a page's loading performance. Another implementation I feel accomplished about are the custom selection elements for task's priority/project. In short, I wanted colored icons next to priority/project options and a way to show what is currently selected. 

What is funny, is that I never implemented a way to edit a project's details; only for tasks, I did. The search input is only there for show and jokes, and I messily divided the `toggleSidebar` functions into two. `hideSidebar` and `showSidebar` both call `this.callDimOverlay()` and `pubSub.publish('animate_nav)` because swiping left/right will call either `hideSidebar/showSidebar`.

Now, I can go on and on with details about the project. I am relieved, glad and scared that I have come to state where I can put down the Todo List project and continue TOP's curriculum. There have been moments where I wanted to give up and I am trying to focus where I was weeks or months ago than comparing to where I am versus others. Wherever you are in your journey, keep going!