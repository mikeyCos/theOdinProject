import { addProject, removeProject } from './project-controller.js';
import { addTask } from './task-controller.js';
import buildHeader from './header.js';
// import importAll from './import-all.js';


const build = {
    header: buildHeader,
}

export {
    addProject,
    removeProject,
    addTask,
    build,
}