import buildHome from '../components/home.js';
import buildProjects from '../components/projects.js';
export default function buildMain() {
    const main = document.createElement('main');
    main.id = 'main_content';
    mainContent.cacheDOM(main);

}

const build = {
    home: buildHome,
    projects: buildProjects,
}

export const mainContent = {
    activeContent: null,
    sub: function() {
        pubSub.subscribe('home', this.switchContent); // testing
    },
    cacheDOM: function(container) {
        this.main = container;
    },
    render: function(key) {
        let content;
        if (!key) {
            // content = build.home();
            content = build.buildProjects();
        } else {
            this.main.firstChild.remove();
            content = build[key]();
        }

        this.setACtiveTab(content);
        this.main.appendChild(content);
    },
    bindEvents: function() {

    },
    switchContent: function(e) {
        for (const key in build) {
            if (e.target.classList.contains(key)) {
                this.activeContent.classList.remove('active');
                this.render(key);
            }
        }
    },
    setActiveContent: function(content) {
        pubSub.subscribers.find(item => {
            // this will NOT work
            if (item.className === content.id) {
                this.activeContent = item;
                item.classList.add('active');
            }
        });
    },
}