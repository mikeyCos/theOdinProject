import buildProjects from '../components/projects';
import buildProjectTasks from '../components/project_tasks';
import { projectController } from '../containers/project_controller';
import { pubSub } from '../containers/pubsub';

export default function buildMain() {
    const main = document.createElement('main');
    main.id = 'main_content';
    mainContent.init();
    mainContent.cacheDOM(main);
    mainContent.render();
    mainContent.bindEvents();

    pubSub.subscribe('content', mainContent.switchContent);

    return main;
}

const build = {
    projects: buildProjects,
    project: buildProjectTasks,
}

export const mainContent = {
    activeContent: null,
    activeTab: null,
    init: function() {
        window.onload = () => {
            this.anchors = document.querySelectorAll('a');
            this.setActiveTab([...this.anchors].find(anchor => anchor.href.includes(projectController.findActive().title.toLowerCase())));
        }
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
        this.setActiveContent(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {
        this.switchContent = this.switchContent.bind(this);
    },
    switchContent: function(e) {
        this.resetActiveTab();
        let classSubstring = e.className.includes('delete') ? e.className.substring(e.className.indexOf('_') + 1, e.className.lastIndexOf('_')) : e.className.substring(e.className.lastIndexOf('_') + 1);
        let uuid = e.parentElement.dataset.uuid || e.dataset.inboxUuid;
        let renderKey = Object.keys(build).find(key => key === classSubstring);
        let args = ['project', uuid];
        if (renderKey && uuid) {
            // renders respective project
            args[0] = renderKey;
            this.setActiveTab(e);
        } else if (!renderKey && !uuid) {
            // if home button is clicked
                // renders the today section
            args[1] = projectController.today[0].uuid;
            this.setActiveTab(e);
        } else if (classSubstring === 'delete') {
            // if a project is the content and is deleted,
                // renders the inbox section
            args[1] = projectController.inbox[0].uuid;
            this.setActiveTab([...this.anchors].find(anchor => anchor.href.includes(projectController.inbox[0].title.toLowerCase())));
        } else {
            args[0] = 'projects';
            this.setActiveTab(e);
        }
        mainContent.render(args[0], args[1]);
    },
    setActiveTab: function(tab) {
        this.resetActiveTab();
        const sidebarAnchor = [...this.anchors].find(anchor => 
            anchor.href === tab.href || anchor.href.includes(tab.className.split(' ')[1]));
        tab.classList.add('active');
        if (sidebarAnchor) {
            sidebarAnchor.classList.add('active');
            this.activeTab = [sidebarAnchor, tab];
        } else {
            this.activeTab = [tab];
        }
    },
    resetActiveTab: function() {
        if (this.activeTab) {
            this.activeTab.forEach(anchor => anchor.classList.remove('active'));
            this.activeTab = null
        }
    },
    setActiveContent: function(content) {
        if (this.activeContent) {
            this.activeContent.classList.remove('active');
        }
        content.classList.add('active');
        this.activeContent = content;
    },
}