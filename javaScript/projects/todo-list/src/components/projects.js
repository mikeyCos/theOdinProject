import buildProjectsList from '../components/projects_list.js';

export default function buildProjects() {
    console.log(`projects.js running`);

    const projectsContainer = document.createElement('div');
    projectsContainer.id = 'projects';

    const header = document.createElement('h1');
    header.textContent = 'PROJECTS';

    projectsContainer.appendChild(header);
    projectsContainer.appendChild(buildProjectsList());
    return projectsContainer
}

const projects = {
    cacheDOM: function() {

    },
    bindEvents: function() {

    },
    render: function() {

    },
}