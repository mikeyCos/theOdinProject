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
    cacheDOM: function(container) {
        this.main = container;
    },
    render: function(key, uuid) {
        let content;
        if (!key) {
            // content = build.home();
            content = build.projects();
        } else {
            console.log(this.main);
            console.log(this.main.firstChild);
            this.main.firstChild.remove();
            content = build[key](uuid);
        }
        // this.setActiveContent(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {
        this.switchContent = this.switchContent.bind(this);
    },
    switchContent: function(e) {
        let classSubstring = e.className.substring(e.className.lastIndexOf('_') + 1);
        let uuid = e.parentElement.dataset.uuid;
        
        console.log(e);
        this.activeContent = e;
        for (const key in build) {
            if (key === classSubstring) {
                console.log(`key: ${key}`); // for debugging
                this.activeContent.classList.remove('active');
                // this.setActiveContent(e);
                mainContent.render(key, uuid);
            }
        }
    },
    setActiveContent: function(content) {
        // pubSub.subscribers.find(item => {
        //     // this will NOT work
        //     // if (item.className === content.id) {
        //     //     this.activeContent = item;
        //     //     item.classList.add('active');
        //     // }
        // });

        // for (let key in pubSub.subscribers) {
            // console.log(key); // for debugging
        // }

        content.classList.add('active');
        this.activeContent = content;
        console.log(content);
    },
}