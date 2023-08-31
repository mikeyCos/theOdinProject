import buildHome from '../components/home';
import buildProjects from '../components/projects';
import buildProjectTasks from '../components/project_tasks';
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
    home: buildHome,
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
            // content = build.home();
            content = build.projects();
        } else {
            // console.log(this.main);
            // console.log(this.main.firstChild);
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
        console.log(e);
        // need to refactor this
        let classSubstring = e.className.includes('delete') ? e.className.substring(e.className.indexOf('_') + 1, e.className.lastIndexOf('_')) : e.className.substring(e.className.lastIndexOf('_') + 1);
        let uuid = e.parentElement.dataset.uuid;

        for (const key in build) {
            if (key === classSubstring) {
                this.setActiveTab(e);
                mainContent.render(key, uuid);
            } else if (classSubstring === 'delete' && this.activeContent.classList.contains('task')) {
                mainContent.render('home');
            }
        }
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