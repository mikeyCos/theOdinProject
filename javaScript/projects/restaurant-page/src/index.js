import './styles.css';
import AssetImage from './assets/test.jpg';
import buildHeader from './header.js';
import buildHome from './home.js';
import buildAbout from './about.js';
import buildMenu from './menu.js';
import buildContact from './contact.js';

const home = (function() {
    const build = {
        header: buildHeader,
        home: buildHome,
        about: buildAbout,
        menu: buildMenu,
        contact: buildContact,
    }

    const content = {
        activeTab: null,
        init: function() {
            build.header();
            this.cacheDOM();
            this.bindEvents();
            this.render();
        },
        cacheDOM: function() {
            this.contentContainer = document.querySelector('#content');
            this.navBar = document.querySelector('#navbar');
            this.navItems = Array.from(this.navBar.querySelectorAll('.container ul li'));
            console.log(this.contentContainer);
        },
        render: function(key) {
            let content;
            if (!key) {
                console.log('render running: no key'); //for debugging
                content = build.home();
                this.activeTab = content;
            } else {
                console.log(`render running: ${key}`); //for debugging
                this.activeTab.remove();
                content = build[key]();
                this.activeTab = content;
            }
            console.log(content); //for debugging
            this.contentContainer.appendChild(content);
        },
        bindEvents: function() {
            this.switchTab = this.switchTab.bind(this);
            this.navItems.forEach(item => item.addEventListener('click', this.switchTab));
        },
        switchTab: function(e) {
            console.log('switchTab running');
            for (const key in build) {
                if (e.target.className ===  key && this.activeTab.id !== e.target.className) {
                    this.render(key);
                }
            }
        },
    }
    //structure
        //nav
            //HOME ABOUT MENU CONTACT
        //header
            //h1
        //#content
            //changes based on current tab
        //footer

    content.init();
})();