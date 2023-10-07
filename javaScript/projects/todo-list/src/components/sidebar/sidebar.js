import importAll from '../../utilities/import-all';
import buildButton from '../buttons';
import buildProjectForm from '../projects_form';
import { projectController } from '../../containers/project_controller';
import { buildList } from '../projects_list';
import { pubSub } from '../../containers/pubsub';
import '../../styles/sidebar.css';

export default function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';

    if (window.innerWidth > 768) {
        sidebarWrapper.classList.add('show');
    } else {
        sidebarWrapper.classList.add('hide');
    }

    sidebarWrapper.appendChild(sidebar.render());
    sidebar.cacheDOM(sidebarWrapper);
    sidebar.bindEvents();

    pubSub.subscribe('sidebar', sidebar.toggleSidebar); // published from projects_list.js
    return sidebarWrapper;
}

const assets = {
    icons: importAll(require.context('../../assets/icons', false, /\.svg$/)),
}

const sidebar = {
    cacheDOM: function(container) {
        this.sidebar = container;
        this.sidebarWrapper = this.sidebar.querySelector('.sidebar_wrapper');
        this.projectsContainer = this.sidebar.querySelector('#projects_container');
        this.anchorProjects = this.projectsContainer.querySelector('.nav_projects');
        this.btnAddProject = container.querySelector('.btn_add_project');

    },
    bindEvents: function() {
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.publish = this.publish.bind(this);
        this.btnAddProject.addEventListener('click', buildProjectForm);
        this.anchorProjects.addEventListener('click', this.publish, { capture: true });
        this.sidebar.addEventListener('click', this.toggleSidebar);
        this.callDimOverlay = this.callDimOverlay.bind(this);
        window.addEventListener('resize', this.callDimOverlay);
    },
    render: function() {
        const sidebarContainer = document.createElement('div');

        projectController.setMiscProjects();
        const navMisc = document.createElement('div');
        buildList.add('misc', navMisc, projectController.misc);
        buildList.find(`misc`).init();

        const projectsContainer = document.createElement('div');
        const anchorWrapper = document.createElement('div');
        const projectsAnchor = document.createElement('a');

        // sidebarWrapper.classList.add('sidebar_wrapper');
        sidebarContainer.classList.add('container');
        projectsContainer.id = 'projects_container';
        navMisc.classList.add('projects_misc_container');

        projectsAnchor.textContent = 'Projects';
        projectsAnchor.href = '#projects';
        projectsAnchor.classList.add('nav_projects')

        anchorWrapper.appendChild(projectsAnchor);
        anchorWrapper.appendChild(buildButton('add', 'project'));
        projectsContainer.appendChild(anchorWrapper);

        buildList.add('sidebar', projectsContainer, projectController.projects);
        buildList.find(`sidebar`).init();

        sidebarContainer.appendChild(navMisc);
        sidebarContainer.appendChild(projectsContainer);
        return sidebarContainer;
    },
    toggleSidebar: function(e) {
        if (e instanceof MouseEvent) {
            if (e.target === this.sidebar) {
                this.toggleSidebar();
            } 
        } else {
            
            if (this.sidebar.classList.contains('show')) {
                this.sidebar.classList.remove('show');
                this.sidebar.classList.add('hide');
            } else {
                this.sidebar.classList.remove('hide');
                this.sidebar.classList.add('show');
            }
            this.callDimOverlay()
        }
    },
    publish: function(e) {
        e.stopImmediatePropagation();
        if (window.innerWidth < 768) {
            this.toggleSidebar();
        }
        pubSub.publish('content', e.currentTarget);
    },
    callDimOverlay: function() {
        pubSub.publish('dim', this.sidebar);
    },
}