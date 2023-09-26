import buildProjects from '../components/projects';
import buildProjectTasks from '../components/project_tasks';
import { projectController } from '../containers/project-controller';
import { pubSub } from '../containers/pubsub';

export default function buildMain() {
    const main = document.createElement('main');
    main.id = 'main_content';
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
    cacheDOM: function(container) {
        this.main = container;
    },
    render: function(key, uuid) {
        let content;
        if (!key) {
            content = build['project'](projectController.today[0].uuid);
        } else {
            this.main.firstChild.remove();
            content = build[key](uuid);
        }
        this.setActiveContent(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {
        this.switchContent = this.switchContent.bind(this);
    },
    switchContent: function(e) {
        let classSubstring = e.className.includes('delete') ? e.className.substring(e.className.indexOf('_') + 1, e.className.lastIndexOf('_')) : e.className.substring(e.className.lastIndexOf('_') + 1);
        let uuid = e.parentElement.dataset.uuid || e.dataset.inboxUuid;
        let renderKey = Object.keys(build).find(key => key === classSubstring);
        let args = ['project', uuid];

        if (renderKey && uuid) {
            // renders respective project
            this.setActiveTab(e);
            args[0] = renderKey;
        } else if (!renderKey && !uuid) {
            // if home button is clicked
                // renders the today section
            args[1] = projectController.today[0].uuid;
        } else if (classSubstring === 'delete') {
            // if a project is the content and is deleted,
                // renders the inbox section
            args[1] = projectController.inbox[0].uuid;
        } else {
            this.setActiveTab(e);
            args[0] = 'projects';
        }
        mainContent.render(args[0], args[1]);
    },
    setActiveTab: function(tab) {
        if (this.activeTab) {
            this.activeTab.classList.remove('active');
        }
        tab.classList.add('active');
        this.activeTab = tab;
    },
    setActiveContent: function(content) {
        if (this.activeContent) {
            this.activeContent.classList.remove('active');
        }
        content.classList.add('active');
        this.activeContent = content;
    }
}