let projects = [];

// creates a project object
    // tasks property created upon object creation
export const project = (title) => {
    const tasks = [];
    return { title, tasks };
}

// idea, creates tasks property in project object
function createTasks() {
}

export function pushTask(project, text) {
    getProject(project).tasks.push(text);
    console.table(projects);
}

export function addProject() {
    // projects.push(createProject(prompt('Enter project name.')));
    projects.push(project(prompt('Enter project name.')));
    console.table(projects);
}

// complete/remove project
export function removeProject() {
    const projectSelection = prompt(`Enter project name you want to delete.`);
    projects.splice(getProjectIndex(projectSelection), 1);
}

// gets project's index from projects[];
function getProjectIndex(project) {
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
function getProject(project) {
    // const projectSelection = prompt(`Enter project name you want to search.`);
    console.log(projects[getProjectIndex(project)]);
    return projects[getProjectIndex(project)];
}