import './index.css';
import buildHeader from './modules/header.js';
import buildHome from './modules/home.js';
import buildAbout from './modules/about.js';
import buildMenu from './modules/menu.js';
import buildContact from './modules/contact.js';
import buildFooter from './modules/footer.js';

const home = (function() {
    const build = {
        header: buildHeader,
        home: buildHome,
        about: buildAbout,
        menu: buildMenu,
        contact: buildContact,
        footer: buildFooter,
    }

    const content = {
        activeTab: null,
        init: function() {
            build.header();
            this.cacheDOM();
            this.bindEvents();
            this.render();
            build.footer();

        },
        cacheDOM: function() {
            this.contentContainer = document.querySelector('#content');
            this.navBar = document.querySelector('#navbar');
            this.navItems = Array.from(this.navBar.querySelectorAll('.container ul li a'));
        },
        render: function(key) {
            let content;
            if (!key) {
                content = build.home();
            } else {
                this.contentContainer.firstChild.remove();
                content = build[key]();
            }
            this.setActiveTab(content);
            this.contentContainer.appendChild(content);
        },
        bindEvents: function() {
            this.switchTab = this.switchTab.bind(this);
            this.navItems.forEach(item => item.addEventListener('click', this.switchTab));
        },
        switchTab: function(e) {
            for (const key in build) {
                if (e.target.classList.contains(key) && !e.target.classList.contains('active')) {
                    this.activeTab.classList.remove('active');
                    this.render(key);
                }
            }
        },
        setActiveTab: function(content) {
            this.navItems.find(item => {
                if (item.className === content.id) {
                    this.activeTab = item;
                    item.classList.add('active');
                }
            });
        },
    }

    content.init();
})();