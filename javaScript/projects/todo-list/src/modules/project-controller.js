export let projects = [];

// creates a project object
    //tasks property created upon object creation
export default function createProject(title) {
    console.log(`controller-project.js running`);
    const tasks = [];
    return { title, tasks };
}