import importAll from '../../utilities/import-all';
import buildButton from '../buttons';
import buildProjectForm from '../projects_form';
import { projectController } from '../../containers/project-controller';
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
        this.anchorProjects = this.projectsContainer.querySelector('.nav_projects');
        this.btnAddProject = container.querySelector('.btn_add_project');
        // this.anchorInbox = this.sidebar.querySelector('.nav_inbox');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', buildProjectForm);
        this.anchorProjects.addEventListener('click', this.publish);
        // this.anchorInbox.addEventListener('click', this.publish);
    },
    render: function() {
        const sidebarContainer = document.createElement('div');

        projectController.setMiscProjects();
        const navMisc = document.createElement('div');
        buildList.add('misc', navMisc, projectController.misc);
        buildList.find(`misc`).init();

        // const navInbox = document.createElement('div');
        // buildList.add('inbox', navInbox, projectController.inbox);
        // buildList.find(`inbox`).init();

        const projectsContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        const projectsAnchor = document.createElement('a');

        sidebarContainer.classList.add('container');
        projectsContainer.id = 'projects_container';

        projectsAnchor.textContent = 'Projects';
        projectsAnchor.href = '#projects';
        projectsAnchor.classList.add('nav_projects')

        anchorWrapper.appendChild(projectsAnchor);
        anchorWrapper.appendChild(buildButton('add', 'project'));
        projectsContainer.appendChild(anchorWrapper);

        buildList.add('sidebar', projectsContainer, projectController.projects);
        buildList.find(`sidebar`).init();

        sidebarContainer.appendChild(navMisc);
        // sidebarContainer.appendChild(navInbox);
        // sidebarContainer.appendChild(navToday);
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
        pubSub.publish('content', e.currentTarget);
    }
}