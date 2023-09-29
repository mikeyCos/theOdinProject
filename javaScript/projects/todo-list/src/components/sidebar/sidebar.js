import importAll from '../../utilities/import-all';
import buildButton from '../buttons';
import buildProjectForm from '../projects_form';
import { projectController } from '../../containers/project-controller';
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

    pubSub.subscribe('sidebar', sidebar.toggleSidebar);
    return sidebarWrapper;
}

const assets = {
    icons: importAll(require.context('../../assets/icons', false, /\.svg$/)),
}

const sidebar = {
    cacheDOM: function(container) {
        // window.addEventListener('load', (e) => console.log(document.querySelector('#main_content')))
        this.sidebar = container;
        this.sidebarWrapper = this.sidebar.querySelector('.sidebar_wrapper');
        // need to append list_projects to this.projectsContainer

        this.projectsContainer = this.sidebar.querySelector('#projects_container');
        this.anchorProjects = this.projectsContainer.querySelector('.nav_projects');
        this.btnAddProject = container.querySelector('.btn_add_project');
        // this.anchorInbox = this.sidebar.querySelector('.nav_inbox');
    },
    bindEvents: function() {
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.publish = this.publish.bind(this);
        this.btnAddProject.addEventListener('click', buildProjectForm);
        this.anchorProjects.addEventListener('click', this.publish, { capture: true });
        this.sidebar.addEventListener('click', this.toggleSidebar);
    },
    render: function() {
        // const sidebarWrapper = document.createElement('div');
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
        // sidebarWrapper.appendChild(sidebarContainer);
        return sidebarContainer;
        // return sidebarWrapper;
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
            pubSub.publish('dim', this.sidebar);
        }
    },
    publish: function(e) {
        e.stopImmediatePropagation();
        this.toggleSidebar();
        pubSub.publish('content', e.currentTarget);
    }
}