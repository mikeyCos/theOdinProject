import importAll from '../utilities/import-all';
import { pubSub } from '../containers/pubsub'; // connect .btn_home to mainContent.switchContent
import buildTasksForm from '../components/tasks_form';
import '../styles/header.css';

export default function buildHeader(app, content) {
    const headerElement = document.createElement('header');
    headerElement.appendChild(header.render());
    header.cacheDOM(headerElement);
    header.bindEvents();
    return headerElement;
}

const assets = {
    icons: importAll(require.context('../assets/icons', true, /\.svg$/)),
}

const header = {
    cacheDOM: function(container) {
        this.btnMenu = container.querySelector('.btn_menu');
        this.btnHome = container.querySelector('.btn_home');
        this.btnAddTask = container.querySelector('.btn_add_task');
    },
    bindEvents: function() {
        this.btnMenu.addEventListener('click', this.publish);
        this.btnHome.addEventListener('click', this.publish); // testing
        this.btnAddTask.addEventListener('click', buildTasksForm);
    },
    headerContent: {
        headerLeft: [
            {element: 'button', class: 'btn_menu', childElement: 'img', src: assets.icons.files['menu.svg']},
            {element: 'button', class: 'btn_home', childElement: 'img', src: assets.icons.files['home.svg']},
            {element: 'input', class: 'input_search', placeholder: 'Search'}
        ],
        headerRight: [
            {element: 'button', class: 'btn_add_task', childElement: 'img', src: assets.icons.files['add.svg']},
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
            section === 'headerLeft' ? wrapperClass = 'nav_left' : wrapperClass = 'nav_right';
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
                    itemIcon.setAttribute('onload', 'SVGInject(this)');
                    headerItem.appendChild(itemIcon);
                }
                headerContainer.appendChild(headerItem);
                headerWrapper.appendChild(headerContainer);
            })
            headerElement.appendChild(headerWrapper);
        }
        return headerElement;
    },
    publish: function(e) {
        let className = e.currentTarget.parentElement.className;
        let subscriber;
        if (className.includes('home')) {
            subscriber = 'content';
        } else {
            subscriber = 'sidebar'
        }
        pubSub.publish(subscriber, e.target.parentElement);
    }
}