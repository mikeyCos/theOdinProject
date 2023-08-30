export const projects = [];
// creates a project object
    // tasks property created upon object creation
const project = (title) => {
    const tasks = [];
    const addTask = (name, description) => tasks.push(task(name, description));
    const uuid = crypto.randomUUID();
    return { title, tasks, uuid };
}

const task = (name, description) => {
    return { name, description };
}

projects.push(project('test1'));

// idea, creates tasks property in project object
function createTasks() {
}

// const task = (name, description) => {
//     getProject(uuid).tasks.push(task(name, description));
//     console.table(projects);
// }

// creates project and pushes it to projects[]
export const addProject = (inputs) => {
    console.log(`addProject() running`)
    for (let prop in project()) {
        for (let input of inputs) {
            if (input.id === prop) {
                projects.push(project(input.value));
            }
        }
    }
}

// complete/remove project
export const removeProject = (uuid) => {
    // const projectSelection = prompt(`Enter project name you want to delete.`);
    // projects.splice(getProjectIndex(projectSelection), 1);
    projects.splice(getProjectIndex(uuid), 1);
}

// gets project's index from projects[] based on project name
const getProjectIndex = (uuid) => {
    for (const index in projects) {
        for (const key in projects[index]) {
            if (key === 'uuid' && projects[index][key] === uuid) {
                return index;
            }
        }
    }
}

// gets project object
// do I need this function?
export const getProject = (uuid) => {
    return projects[getProjectIndex(uuid)];
}

export const test = () => {
    console.log(`test() running from project-controller.js`);
}