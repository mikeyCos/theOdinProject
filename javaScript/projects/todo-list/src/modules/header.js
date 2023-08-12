import importAll from './import-all.js';
import { addTask } from './task-controller.js';
import '../styles/header.css';

export default function buildHeader() {
    const headerElement = document.createElement('header');

    headerElement.appendChild(nav.render());

    // console.log(document.body.firstElementChild.firstChild)
    // document.body.insertBefore(headerElement, document.body.firstChild);
    // document.body.lastElementChild.appendChild(headerElement);
    document.body.firstElementChild.insertBefore(headerElement, document.body.firstElementChild.firstChild);
    nav.cacheDOM();
    nav.bindEvents();
}

const assets = {
    icons: importAll(require.context('../assets/icons', true, /\.svg$/)),
}

const nav = {
    cacheDOM: function() {
        this.btnMenu = document.querySelector('.btn-menu');
        this.btnAddTask = document.querySelector('.btn-add-task');
    },
    bindEvents: function() {

    },
    navLeft: [
        {element: 'button', class: 'btn-menu', childElement: 'img', src: assets.icons.files['menu.svg']},
        {element: 'button', class: 'btn-home', childElement: 'img', src: assets.icons.files['home.svg']},
        {element: 'input', class: 'input-search', placeholder: 'Search'}
    ],
    navRight: [
        {element: 'button', class: 'btn-add-task', childElement: 'img', src: assets.icons.files['add.svg']},
        // {element: 'button', class: 'bt-settingsn', childElement: 'img, src: null},
        {element: 'a', class: 'github', childElement: 'img', src: assets.icons.files['github-mark/github-mark-white.svg'], href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/todo-list', target: '_blank'}
    ],
    render: function() {
        const navElement = document.createElement('nav');

        navElement.id = 'navbar';

        const navLeftWrapper = document.createElement('div');
        const navRightWrapper = document.createElement('div');
        const navLeftContainer = document.createElement('div');
        const navRightContainer = document.createElement('div');

        navLeftWrapper.classList.add('nav-left');
        navRightWrapper.classList.add('nav-right');
        navLeftContainer.classList.add('container');
        navRightContainer.classList.add('container');

        this.navLeft.forEach((item) => {
            const navItem = document.createElement(item.element);
            navItem.classList.add(item.class);
            if ('placeholder' in item) {
                navItem.setAttribute('placeholder', item.placeholder);
            } else {
                const navIcon = document.createElement(item.childElement);
                navIcon.src = item.src;
                navItem.appendChild(navIcon);
            }
            navLeftContainer.appendChild(navItem);
        });

        this.navRight.forEach((item) => {
            const navItem = document.createElement(item.element);
            navItem.classList.add(item.class);
            if ('placeholder' in item) {
                navItem.setAttribute('placeholder', item.placeholder);
            } else {
                navItem.href = item.href;
                navItem.target = item.target;
                const navIcon = document.createElement(item.childElement);
                navIcon.src = item.src;
                navItem.appendChild(navIcon);
            }
            navRightContainer.appendChild(navItem);
        })


        navLeftWrapper.appendChild(navLeftContainer);
        navRightWrapper.appendChild(navRightContainer);
        navElement.appendChild(navLeftWrapper);
        navElement.appendChild(navRightWrapper);
        return navElement;
    }
}