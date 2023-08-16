import importAll from '../utilities/import-all.js';
import { toggleSidebar } from '../components/sidebar/sidebar.js';
// import '../styles/header.css';

export default function buildHeader(app, content) {
    const headerElement = document.createElement('header');
    headerElement.appendChild(header.render());
    app.insertBefore(headerElement, content);
    header.cacheDOM();
    header.bindEvents();
}

const assets = {
    icons: importAll(require.context('../assets/icons', true, /\.svg$/)),
}

const header = {
    cacheDOM: function() {
        this.btnMenu = document.querySelector('.btn-menu');
        this.btnAddTask = document.querySelector('.btn-add-task');
    },
    bindEvents: function() {
        this.btnMenu.addEventListener('click', toggleSidebar);
    },
    headerContent: {
        headerLeft: [
            {element: 'button', class: 'btn-menu', childElement: 'img', src: assets.icons.files['menu.svg']},
            {element: 'button', class: 'btn-home', childElement: 'img', src: assets.icons.files['home.svg']},
            {element: 'input', class: 'input-search', placeholder: 'Search'}
        ],
        headerRight: [
            {element: 'button', class: 'btn-add-task', childElement: 'img', src: assets.icons.files['add.svg']},
            // {element: 'button', class: 'bt-settingsn', childElement: 'img, src: null},
            {element: 'a', class: 'github', childElement: 'img', src: assets.icons.files['github-mark/github-mark-white.svg'], href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/todo-list', target: '_blank'}
        ],
    },
    render: function() {
        const headerElement = document.createElement('nav');
        headerElement.id = 'navbar';

        for (let section in this.headerContent) {
            const headerWrapper = document.createElement('div');
            const headerContainer = document.createElement('div');
            let wrapperClass;
            section === 'headerLeft' ? wrapperClass = 'nav-left' : wrapperClass = 'nav-right';
            headerWrapper.classList.add(wrapperClass);
            headerContainer.classList.add('container');

            this.headerContent[section].forEach((item) => {
                const headerItem = document.createElement(item.element);
                headerItem.classList.add(item.class);
                if ('placeholder' in item) {
                    headerItem.setAttribute('placeholder', item.placeholder);
                } else {
                    const itemIcon = document.createElement(item.childElement);
                    itemIcon.src = item.src;
                    headerItem.appendChild(itemIcon);
                }
                headerContainer.appendChild(headerItem);
                headerWrapper.appendChild(headerContainer);
            })
            headerElement.appendChild(headerWrapper);
        }
        return headerElement;
    }
}