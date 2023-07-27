import MenuIcon from '../assets/icons/menu.svg';

const navLinks = ['home', 'about', 'menu', 'contact'];

export default function buildHeader() {
    console.log(`navbar.js running`); //for debugging
    const headerWrapper = document.createElement('header');
    const headerContainer = document.createElement('div');
    const heading = document.createElement('h1');
    const headingText = document.createTextNode('Restaurant');
    headerContainer.id = 'hero';

    const heroContainer = document.createElement('div');
    heroContainer.classList.add('container');

    heading.appendChild(headingText);
    headerContainer.appendChild(heading);
    headerWrapper.appendChild(headerContainer);

    headerWrapper.insertBefore(nav.render(), headerContainer);
    document.body.insertBefore(headerWrapper, document.body.firstChild);
}

const nav = {
    render: function() {
        const navWrapper = document.createElement('nav');
        const navContainer = document.createElement('div');
        
        const navMenu = document.createElement('button');
        navMenu.setAttribute('aria-pressed', false);
        const navMenuImg = new Image();
        navMenuImg.src = MenuIcon;
        navMenu.appendChild(navMenuImg);
    
        navMenu.classList.add('menu');

        navWrapper.id = 'navbar';
        navContainer.classList.add('container');
    
        const navList = document.createElement('ul');
        navList.classList.add('links');

        navLinks.forEach(item => {
            const navItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = '#';
            anchor.classList.add(item);
    
            const navItemText = document.createTextNode(item);
            anchor.appendChild(navItemText);
            navItem.appendChild(anchor);
            navList.appendChild(navItem);
        })
        navContainer.appendChild(navList);
        navContainer.appendChild(navMenu);
        navWrapper.appendChild(navContainer);
        this.cacheDOM(navMenu, navList);
        this.bindEvents();
        return navWrapper;
    },
    cacheDOM: function(btn, ul) {
        this.button = btn;
        this.menu = ul;
    },
    bindEvents: function() {
        this.toggleMenu = this.toggleMenu.bind(this);
        this.button.addEventListener('click', this.toggleMenu);
        this.menu.addEventListener('click', this.toggleMenu);
    },
    toggleMenu: function() {
        console.log(`toggleMenu firing`); //for debugging
        let isPressed = JSON.parse(this.button.getAttribute('aria-pressed')) == true || false;
        this.button.setAttribute('aria-pressed', !isPressed);
        let display;
        isPressed ? display = 'none' : display = 'grid';
        this.menu.style.display = display;
    },
}
