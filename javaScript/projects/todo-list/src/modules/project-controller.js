const projects = [];

// creates a project object
    // tasks property created upon object creation
export const project = (title) => {
    const tasks = [];
    return { title, tasks };
}

// idea, creates tasks property in project object
function createTasks() {
}

export const pushTask = (project, text) => {
    getProject(project).tasks.push(text);
    console.table(projects);
}

export const addProject = () => {
    const obj = project(prompt('Enter project name.'));
    projects.push(obj);
    console.table(projects);
}

// complete/remove project
export const removeProject = () => {
    const projectSelection = prompt(`Enter project name you want to delete.`);
    projects.splice(getProjectIndex(projectSelection), 1);
}

// gets project's index from projects[];
//     need to recursively go through the objects and their keys
//     for subtasks within subtasks within tasks within project
//     project > task > subtask > subtask > subtask
const getProjectIndex = (project) => {
    for (const index in projects) {
        for (const key in projects[index]) {
            if (projects[index][key] === project) {
                return projects.indexOf(projects[index]);
            }
        }
    }
}

// gets project object
// do I need this function?
const getProject = (project) => {
    return projects[getProjectIndex(project)];
}