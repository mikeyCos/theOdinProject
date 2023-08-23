import { projects } from '../../containers/project-controller.js';
import importAll from '../../utilities/import-all.js';
import buildButtonAdd from '../button_add.js';
import buildProjectForm from '../projects_form.js';
import buildProjectsList from '../projects_list.js';

export default function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';
    sidebarWrapper.appendChild(sidebar.render());
    sidebar.cacheDOM(sidebarWrapper);
    sidebar.bindEvents();
    return sidebarWrapper;
}

const assets = {
    icons: importAll(require.context('../../assets/icons', false, /\.svg$/)),
}

export const sidebar = {
    cacheDOM: function(container) {
        this.sidebar = container;
        // need to append list_projects to this.projectsContainer
        this.projectsContainer = this.sidebar.querySelector('.projects_container');
        this.anchorProjects = this.projectsContainer.querySelector('.nav_projects a');
        this.btnAddProject = container.querySelector('.btn_add_project');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', buildProjectForm);
    },
    render: function() {
        const sidebarContainer = document.createElement('div');

        const projectsContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        const anchor = document.createElement('a');

        sidebarContainer.classList.add('container');
        projectsContainer.classList.add('projects_container');
        anchorWrapper.classList.add('nav_projects');

        anchor.textContent = 'Projects';
        anchor.href = '#projects';

        anchorWrapper.appendChild(anchor);
        anchorWrapper.appendChild(buildButtonAdd('project'));
        projectsContainer.appendChild(anchorWrapper);
        projectsContainer.appendChild(buildProjectsList());

        sidebarContainer.appendChild(projectsContainer);
        return sidebarContainer;
    },
}

// adds/removes class that changes sidebar's display
export function toggleSidebar(e) {
    let sidebarElement = sidebar.sidebar;
    if (sidebarElement.style.display === 'none') {
        sidebarElement.style.display = '';
    } else {
        sidebarElement.style.display = 'none';
    }
}