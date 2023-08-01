import MenuIcon from '../assets/icons/menu.svg';
import importAll from './images.js';

const navLinks = ['home', 'about', 'menu', 'contact'];

export default function buildHeader() {
    console.log(`navbar.js running`); //for debugging
    const headerElement = document.createElement('header');
    const heroWrapper = document.createElement('div');

    const heroTextWrapper = document.createElement('div');
    heroTextWrapper.classList.add('hero-text');
    const heading = document.createElement('h1');
    const headingText = document.createTextNode('Restaurant');
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
        
        const navMenu = document.createElement('button');
        navMenu.setAttribute('aria-pressed', false);
        const navMenuImg = new Image();
        navMenuImg.src = MenuIcon;
        navMenu.appendChild(navMenuImg);
    
        navMenu.classList.add('menu');

        navElement.id = 'navbar';
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
        navElement.appendChild(navContainer);
        this.cacheDOM(navMenu, navList);
        this.bindEvents();
        return navElement;
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


//images slideshow
const imageCarousel = {
    render: function() {
        const carouselWrapper = document.createElement('div');
        carouselWrapper.id = 'carousel';
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('container');

        // <div class="carousel-item item-0"><img class="" src="" loading="lazy"</div>
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        const carouselImg = document.createElement('img');
        carouselImg.src = `${this.images.images['pizza0.jpg']}`;

        const buttonBack = document.createElement('button');
        const buttonForward = document.createElement('button');
        // const images = importAll(require.context('../assets/images/', false, /\.jpg$/));
        // console.log(this.images.images['pizza0.jpg']);
        // console.log(images.imagesArr.length);
        // console.log(this.images.imagesArr[0])
        // for (let i = 0; i < this.images.imagesArr.length; i++) {
        //     for (let image in this.images.images) {
                
        //     }
        // }

        carouselItem.appendChild(carouselImg);
        carouselContainer.appendChild(carouselItem);
        carouselWrapper.appendChild(carouselContainer);
        return carouselWrapper;
    },
    cacheDOM: function() {

    },
    images: importAll(require.context('../assets/images/', false, /\.jpg$/)),
}