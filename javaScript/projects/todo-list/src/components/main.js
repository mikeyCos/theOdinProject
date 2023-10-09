import buildProjects from '../components/projects';
import buildProjectTasks from '../components/project_tasks';
import { projectController } from '../containers/project_controller';
import { pubSub } from '../containers/pubsub';
import { buildList } from './projects_list';

export default function buildMain() {
    mainContent.init();
    const main = document.createElement('main');
    main.id = 'main_content';
    mainContent.cacheDOM(main);
    mainContent.render();
    mainContent.bindEvents();

    pubSub.subscribe('content', mainContent.switchContent);
    pubSub.subscribe('updateTabs', mainContent.updateTabs);
    return main;
}

const build = {
    projects: buildProjects,
    project: buildProjectTasks,
}

export const mainContent = {
    activeContent: null,
    activeTab: null,
    navTabs: {
        getAllAnchors: function() {
            return this.static.concat(this.dynamic);
        },
    },
    init: function() {
        window.onload = () => { 
            this.navTabs.static = [
                document.querySelector(`a[href='#inbox']`),
                document.querySelector(`a[href='#today']`),
                document.querySelector(`.nav_projects`),
            ];

            this.navTabs.dynamic = [
                ...buildList.find('sidebar').projectsListAnchors
            ];
            this.setActiveTab(this.navTabs.static[1]);
        };
    },
    updateTabs: function(anchors) {
        // updates navTabs.dynamic
        this.navTabs.dynamic = [...anchors];
    },
    cacheDOM: function(container) {
        this.main = container;
        this.mainOverlay = container.querySelector('.overlay_main_content');
    },
    render: function(key, uuid) {
        let content;
        if (!key) {
            content = build['project'](projectController.today[0].uuid);
        } else {
            this.main.lastChild.remove();
            content = build[key](uuid);
        }
        
        if (document.readyState === 'complete') {
            this.setActiveTab(content);
        }

        this.setActiveContent(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {
        this.updateTabs = this.updateTabs.bind(this);
        this.switchContent = this.switchContent.bind(this);
    },
    switchContent: function(e) {
        let renderKey = 'project';
        let uuid = null;
        if (e instanceof HTMLElement) {
            if (e.className.includes('today')) {
                // if home button is clicked
                    // renders the today section
                uuid = projectController.today[0].uuid;
            } else if (e.dataset.inboxUuid) {
                // if a project is the content and is deleted
                    // renders the inbox section
                uuid = e.dataset.inboxUuid;
            } else if (e.parentElement.dataset.uuid) {
                // renders respective project
                uuid = e.parentElement.dataset.uuid;
            } else {
                // renders projects section
                renderKey = 'projects';
            }
        } else if (e.uuid) {
            // new project created
            uuid = e.uuid;
        } else {
            uuid = projectController.inbox[0].uuid;
        }
        this.render(renderKey, uuid);
    },
    setActiveTab: function(tab) {
        this.activeTab ? this.activeTab.classList.remove('active') : null;
        if (tab.firstChild.tagName !== 'H1') {
            this.activeTab = tab;
        } else {
            this.activeTab = this.navTabs.getAllAnchors().find(anchor => 
                anchor.href.split('#')[1].includes(tab.firstChild.textContent.toLowerCase())
            );
        }
        this.activeTab.classList.add('active');
    },
    setActiveContent: function(content) {
        if (this.activeContent) {
            this.activeContent.classList.remove('active');
        }
        content.classList.add('active');
        this.activeContent = content;
    },
}