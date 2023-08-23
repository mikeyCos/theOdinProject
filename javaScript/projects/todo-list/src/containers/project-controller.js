// creates a project object
    // tasks property created upon object creation
const project = (title) => {
    const tasks = [];
    const uuid = crypto.randomUUID();
    return { title, tasks, uuid };
}

export const projects = [project('test1')];

// idea, creates tasks property in project object
function createTasks() {
}

const pushTask = (project, text) => {
    getProject(project).tasks.push(text);
    console.table(projects);
}

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
const getProject = (project) => {
    return projects[getProjectIndex(project)];
}

