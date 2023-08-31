// import buildProjectsList from '../components/projects_list';
import { buildList } from '../components/projects_list';
import { pubSub } from '../containers/pubsub';
import buildButtonAdd from '../components/button_add';
import buildProjectForm from '../components/projects_form';

export default function buildProjects() {
    console.log(`projects.js running`);

    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects');

    const header = document.createElement('h1');
    header.textContent = 'PROJECTS';

    projectsContainer.appendChild(header);
    projectsContainer.appendChild(projects.render());
    
    projects.cacheDOM(projectsContainer);
    projects.bindEvents();

    return projectsContainer
}

const projects = {
    cacheDOM: function(container) {
        this.btnAddProject = container.querySelector('.btn_add_project');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', buildProjectForm);
    },
    render: function() {
        const parentContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        anchorWrapper.classList.add('nav_projects');

        anchorWrapper.appendChild(buildButtonAdd('project', 'Add project'));
        
        parentContainer.appendChild(anchorWrapper);

        buildList.add('content', parentContainer);
        buildList.find('content').clearCache();
        buildList.find('content').init();
        // return anchorWrapper;
        return parentContainer;
    },
}