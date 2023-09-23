import { projectController } from '../containers/project-controller';

// getItem from localStorage
export function setProjects() {
    console.log(`setProjects() running from storage.js`);
    projectController.projects = localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [];
    projectController.inbox = localStorage.getItem('inbox') ? JSON.parse(localStorage.getItem('inbox')) : projectController.inbox;
    // projectController.today = localStorage.getItem('today') ? JSON.parse(localStorage.getItem('today')) : projectController.today;
    // console.log(projectController.projects);
    // console.log(projectController.allProjects);
    // console.log(projectController.today);
    projectController.init();
    // console.log(projectController.projects);
    // console.log(projectController.allProjects);
}

// setItem in localStorage
export function populateStorage() {
    console.log(`populateStorage() running from storage.js`);
    localStorage.setItem('projects', JSON.stringify(projectController.projects));
    localStorage.setItem('inbox', JSON.stringify(projectController.inbox));
    // localStorage.setItem('today', JSON.stringify(projectController.today));
    // console.log(localStorage.getItem('projects'));
    // console.log(localStorage.getItem('inbox'));
}