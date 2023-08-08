import './index.css';
// import createProject from './modules/controller-project.js';
// import projects from './modules/controller-project.js';
import createProject, { projects } from './modules/project-controller.js';

const mainController = (function() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = 'hello';
    element.classList.add('hello');
    btn.innerHTML = 'Create project';
    element.appendChild(btn);
    
    projects.push(createProject(window.prompt('Enter project name.')));
    projects.push(createProject(window.prompt('Enter another project name.')));
    console.log(projects);
    
    const projectSelection = window.prompt(`Enter project name you want to delete.`);
    
    projects.forEach(el => {
        console.log({ ...el });
        for (let key in el) {
            if (el[key] === projectSelection) {
                console.log(key);
                projects.splice(projects.indexOf(projectSelection), 1);
            }
        }
    })

    console.log(projects);

    document.body.appendChild(element);
})();

//main
    // 1. view all projects
    // 2. view all todos in each project
    // 3. expand a single todo to see/edit its details
    // 4. delete a todo

    //todo list item
        //create item button
        //renders form
            //title, required
            //description
            //due date
                //renders form
                    //default values
                        //today, tomorrow, no date
                    //calendar
                    //time
                    //cancel and save button
            //project label/tag
            //submit
        //delete
        //complete
        //reorder todo list item
        //change priority
    //create new todo list item

//todo list OBJECT
    //title
    //description
        //subtask
    //reminder
    //due date
    //time
    //prioirty

//webpack external library: date-fns
