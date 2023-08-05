import importAll from './images.js';

const assets = {
    icons: importAll(require.context('../assets/icons/', false, /\.svg$/)),
    github: importAll(require.context('../assets/github-mark', false, /\.svg$/)),
    images: importAll(require.context('../assets/images/', false, /\.jpg$/)),
}

const navLinks = ['home', 'about', 'menu', 'contact', 'github-mark.svg'];
// assets.github.images['github-mark.svg']

export default function buildHeader() {
    console.log(`navbar.js running`); //for debugging
    const headerElement = document.createElement('header');
    const heroWrapper = document.createElement('div');

    const heroTextWrapper = document.createElement('div');
    heroTextWrapper.classList.add('hero-text');
    const heading = document.createElement('h1');
    const headingText = document.createTextNode(`Exile's Pizza`);
    heroWrapper.id = 'hero';

    const heroContainer = document.createElement('div');
    heroContainer.classList.add('container');

    heroTextWrapper.appendChild(heading);
    heroWrapper.appendChild(heroContainer);
    heading.appendChild(headingText);
    heroContainer.appendChild(heroTextWrapper);
    heroContainer.appendChild(imageCarousel.render());
    headerElement.appendChild(heroWrapper);

    headerElement.insertBefore(nav.render(), heroWrapper);
    document.body.insertBefore(headerElement, document.body.firstChild);
}

const nav = {
    render: function() {
        const navElement = document.createElement('nav');
        const navContainer = document.createElement('div');

        navElement.id = 'navbar';
        navContainer.classList.add('container');
    
        const navList = document.createElement('ul');
        navList.classList.add('links');

        navLinks.forEach(item => {
            const navItem = document.createElement('li');
            const anchor = document.createElement('a');
            let href;
            let className;
    
            if (item.includes('svg')) {
                const githubIcon = document.createElement('img');
                anchor.setAttribute('target', '_blank');
                console.log(item)
                githubIcon.src = assets.github.images[item];
                anchor.appendChild(githubIcon);
                href = 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/restaurant-page';
                className = 'github';
            } else {
                const navItemText = document.createTextNode(item);
                anchor.appendChild(navItemText);
                href = `#${item}`;
                className = item;
            }
            anchor.href = href;
            anchor.classList.add(className);

            navItem.appendChild(anchor);
            navList.appendChild(navItem);
        })


        const logo = document.createElement('div');
        logo.id = 'logo';
        const logoLink = document.createElement('a');
        const logoLinkText = document.createTextNode(`Exile's Pizza`);
        logoLink.appendChild(logoLinkText);
        logo.appendChild(logoLink);
        navContainer.appendChild(logo);

        const navMenu = document.createElement('button');
        navMenu.setAttribute('aria-pressed', false);
        const navMenuImg = new Image();
        navMenuImg.src = assets.icons.images['menu.svg'];
        navMenu.appendChild(navMenuImg);
        navMenu.classList.add('btn-menu');
        navContainer.appendChild(navMenu);

        navContainer.appendChild(navList);
        navElement.appendChild(navContainer);
        this.cacheDOM(navMenu, navList);
        this.getWindowWidth();
        this.watchScreen();
        return navElement;
    },
    watchScreen: function() {
        this.getWindowWidth = this.getWindowWidth.bind(this);
        window.addEventListener('resize', this.getWindowWidth);
    },
    cacheDOM: function(btn, ul) {
        this.button = btn;
        this.menu = ul;
        this.toggleMenu = this.toggleMenu.bind(this);
    },
    bindEvents: function() {
        this.button.addEventListener('click', this.toggleMenu);
        this.menu.addEventListener('click', this.toggleMenu);
    },
    removeEvents: function() {
        this.button.removeEventListener('click', this.toggleMenu);
        this.menu.removeEventListener('click', this.toggleMenu);
    },
    toggleMenu: function() {
        let isPressed = JSON.parse(this.button.getAttribute('aria-pressed')) == true || false;
        this.button.setAttribute('aria-pressed', !isPressed);
        isPressed ? this.menu.classList.remove('active') : this.menu.classList.add('active');
    },
    getWindowWidth: function() {
        console.log(window.innerWidth);
        if (window.innerWidth > 768) {
            this.removeEvents();
        } else {
            this.bindEvents();
        }
    },
}

//images slideshow
const imageCarousel = {
    render: function() {
        const carouselWrapper = document.createElement('div');
        carouselWrapper.id = 'carousel';
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('container');

        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        const carouselImg = document.createElement('img');
        carouselImg.src = assets.images.images['pizza0.jpg'];

        const buttonBack = document.createElement('button');
        buttonBack.classList.add('btn-carousel', 'back');
        const imageBack = document.createElement('img');
        imageBack.src = assets.icons.images['chevron_left.svg'];
        buttonBack.appendChild(imageBack);

        const buttonForward = document.createElement('button');
        buttonForward.classList.add('btn-carousel', 'forward');
        const imageForward = document.createElement('img');
        imageForward.src = assets.icons.images['chevron_right.svg'];
        buttonForward.appendChild(imageForward);
        this.cacheDOM(carouselImg, buttonBack, buttonForward);

        carouselContainer.appendChild(buttonBack);
        carouselContainer.appendChild(buttonForward);

        carouselItem.appendChild(carouselImg);
        carouselContainer.appendChild(carouselItem);
        carouselWrapper.appendChild(carouselContainer);
        this.bindEvents();
        return carouselWrapper;
    },
    cacheDOM: function(image, ...buttons) {
        this.carouselImg = image;
        this.buttons = buttons;
    },
    bindEvents: function() {
        this.changeImage = this.changeImage.bind(this);
        [...this.buttons].forEach(button => button.addEventListener('click', this.changeImage));
    },
    changeImage: function(e) {
        console.log(`changeImage running`);
        let direction = e.target.parentElement.className.split(' ')[1];
        let imageIndex;
        for (let key in assets.images.images) {
            if (assets.images.images[key] === this.carouselImg.src) {
                imageIndex = Object.keys(assets.images.images).indexOf(key);
                break;
            }
        }

        let newIndex;        
        if (direction === 'forward') {
            if (imageIndex < Object.keys(assets.images.images).length - 1) {
                newIndex = imageIndex + 1;
            } else {
                newIndex = 0;
            }
        } else {
            if (imageIndex > 0) {
                newIndex = imageIndex - 1;
            } else {
                newIndex = Object.keys(assets.images.images).length - 1;
            }
        }

        this.carouselImg.src = assets.images.images[Object.keys(assets.images.images)[newIndex]];
    },
}