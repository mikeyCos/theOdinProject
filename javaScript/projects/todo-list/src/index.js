import './index.css';
// import createProject from './modules/controller-project.js';
// import projects from './modules/controller-project.js';
import { addProject, removeProject } from './modules/project-controller.js';
import { addTask } from './modules/add-task.js';

const mainController = (function() {
    const content = {
        render: function() {

        },
        bindEvents: function() {

        }
    }

    const element = document.createElement('div');
    const addBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const addTaskBtn = document.createElement('button');

    addBtn.innerHTML = 'Create project';
    delBtn.innerHTML = 'Delete project';
    addTaskBtn.innerHTML = 'Add task';

    element.appendChild(addBtn);
    element.appendChild(delBtn);
    element.appendChild(addTaskBtn);


    addBtn.addEventListener('click', addProject);
    delBtn.addEventListener('click', removeProject);
    addTaskBtn.addEventListener('click', addTask);
    document.body.appendChild(element);
})();

//main
    // 1. view all projects
    // 2. view all todos in each project
    // 3. expand a single todo to see/edit its details
    // 4. delete a todo

    // todo list item
        // create item button
        // renders form
            // title, required
            // description
            // due date
                //renders form
                    // default values
                        // today, tomorrow, no date
                    // calendar
                    // time
                    // cancel and save button
            // project label/tag
            // submit
        // delete
        // complete
        // reorder todo list item
        // change priority
    // create new todo list item

// todo list OBJECT
    // title
    // description
        // subtask
    // reminder
    // due date
    // time
    // prioirty

// webpack external library: date-fns
