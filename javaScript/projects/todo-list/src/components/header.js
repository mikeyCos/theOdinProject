import importAll from '../utilities/import-all.js';
import '../styles/header.css';

export default function buildHeader(app, content) {
    const headerElement = document.createElement('header');

    headerElement.appendChild(header.render());
    app.insertBefore(headerElement, content);
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

    },
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
    render: function() {
        const headerElement = document.createElement('nav');

        headerElement.id = 'navbar';

        const headerLeftWrapper = document.createElement('div');
        const headerRightWrapper = document.createElement('div');
        const headerLeftContainer = document.createElement('div');
        const headerRightContainer = document.createElement('div');

        headerLeftWrapper.classList.add('nav-left');
        headerRightWrapper.classList.add('nav-right');
        headerLeftContainer.classList.add('container');
        headerRightContainer.classList.add('container');

        this.headerLeft.forEach((item) => {
            const headerItem = document.createElement(item.element);
            headerItem.classList.add(item.class);
            if ('placeholder' in item) {
                headerItem.setAttribute('placeholder', item.placeholder);
            } else {
                const itemIcon = document.createElement(item.childElement);
                itemIcon.src = item.src;
                headerItem.appendChild(itemIcon);
            }
            headerLeftContainer.appendChild(headerItem);
        });

        this.headerRight.forEach((item) => {
            const headerItem = document.createElement(item.element);
            headerItem.classList.add(item.class);
            if ('placeholder' in item) {
                headerItem.setAttribute('placeholder', item.placeholder);
            } else {
                const itemIcon = document.createElement(item.childElement);
                itemIcon.src = item.src;
                headerItem.appendChild(itemIcon);
            }
            headerRightContainer.appendChild(headerItem);
        });


        headerLeftWrapper.appendChild(headerLeftContainer);
        headerRightWrapper.appendChild(headerRightContainer);
        headerElement.appendChild(headerLeftWrapper);
        headerElement.appendChild(headerRightWrapper);
        return headerElement;
    }
}