import projectController from '../containers/project_controller';

// gets items from localStorage
export function setProjects() {
  projectController.projects = localStorage.getItem('projects')
    ? JSON.parse(localStorage.getItem('projects'))
    : [];
  projectController.inbox = localStorage.getItem('inbox')
    ? JSON.parse(localStorage.getItem('inbox'))
    : projectController.inbox;
  projectController.init();
}

// sets items in localStorage
export function populateStorage() {
  localStorage.setItem('projects', JSON.stringify(projectController.projects));
  localStorage.setItem('inbox', JSON.stringify(projectController.inbox));
}
