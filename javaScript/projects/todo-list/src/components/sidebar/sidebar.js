import importAll from '../../utilities/import-all';
import buildButton from '../buttons';
import buildProjectForm from '../projects_form';
import { buildList } from '../projects_list';
import { pubSub } from '../../containers/pubsub';

export default function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';
    sidebarWrapper.appendChild(sidebar.render());
    sidebar.cacheDOM(sidebarWrapper);
    sidebar.bindEvents();

    pubSub.subscribe('sidebar', sidebar.toggleSidebar);
    return sidebarWrapper;
}

const assets = {
    icons: importAll(require.context('../../assets/icons', false, /\.svg$/)),
}

const sidebar = {
    cacheDOM: function(container) {
        this.sidebar = container;
        // need to append list_projects to this.projectsContainer
        this.projectsContainer = this.sidebar.querySelector('#projects_container');
        this.anchorProjects = this.projectsContainer.querySelector('.nav_projects a');
        this.btnAddProject = container.querySelector('.btn_add_project');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', buildProjectForm);
        this.anchorProjects.addEventListener('click', this.publish);
    },
    render: function() {
        const sidebarContainer = document.createElement('div');

        const projectsContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        const anchor = document.createElement('a');

        sidebarContainer.classList.add('container');
        projectsContainer.id = 'projects_container';
        anchorWrapper.classList.add('nav_projects');

        anchor.textContent = 'Projects';
        anchor.href = '#projects';

        anchorWrapper.appendChild(anchor);
        anchorWrapper.appendChild(buildButton('add', 'project'));
        projectsContainer.appendChild(anchorWrapper);

        buildList.add('sidebar', projectsContainer);
        buildList.find(`sidebar`).init();

        sidebarContainer.appendChild(projectsContainer);
        return sidebarContainer;
    },
    toggleSidebar: function() {
        let sidebarElement = sidebar.sidebar;
        if (sidebarElement.style.display === 'none') {
            sidebarElement.style.display = '';
        } else {
            sidebarElement.style.display = 'none';
        }
    },
    publish: function(e) {
        pubSub.publish('content', e.target.parentElement);
    }
}