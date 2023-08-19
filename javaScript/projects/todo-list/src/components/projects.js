export default function buildProjectList() {
    const projectsContainer = document.createElement('div');
    projectsContainer.id = 'home';

    const header = document.createElement('h1');
    header.textContent = 'PROJECTS';

    projectsContainer.appendChild(header);
    return projectsContainer
}