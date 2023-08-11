import { project, pushTask } from './project-controller.js';

// add's a single task to a project
    // title, description, priority, due date
// is it possible to use createTask() for sub tasks?
const createTask = (title) => {
    let task = {}
    task.desc;
    task.dueDate;
    task.priority = 4;
    return Object.assign(
        {},
        project(title)
    )
}

const description = () => ({
    desc: (description) => { return description }
})

export function addTask() {
    const projectSelection = prompt('Enter project name you want to add task to.');
    const taskObj = createTask(prompt('Enter task title.'));
    pushTask(projectSelection, taskObj);
}