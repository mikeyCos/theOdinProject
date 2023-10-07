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
        this.inputSearch = container.querySelector('.input_search');
    },
    bindEvents: function() {
        this.publish = this.publish.bind(this);
        this.animateNav = this.animateNav.bind(this);
        this.btnMenu.addEventListener('click', this.publish);
        this.btnHome.addEventListener('click', this.publish);
        this.btnAddTask.addEventListener('click', buildTasksForm);
        this.inputSearch.addEventListener('search', this.search);
        pubSub.subscribe('animate_nav', this.animateNav); //testing
    },
    headerContent: {
        headerLeft: [
            {
                element: 'button',
                attributes: {
                    className: 'btn_menu',
                },
                childElement: 'img',
                src: assets.icons.files['menu.svg'],
            },
            {
                element: 'button',
                attributes: {
                    className: 'btn_home today',
                },
                childElement: 'img',
                src: assets.icons.files['home.svg'],
            },
            {
                element: 'input',
                attributes: {
                    className: 'input_search',
                    type: 'search',
                },
                placeholder: 'Search',
            }
        ],
        headerRight: [
            {
                element: 'button',
                attributes: {
                    className: 'btn_add_task',
                },
                childElement: 'img',
                src: assets.icons.files['add.svg']
            },
            // {element: 'button', class: 'bt-settingsn', childElement: 'img, src: null},
            {
                element: 'a',
                attributes: {
                    className: 'github',
                    href: 'https://github.com/mikeyCos/theOdinProject/tree/main/javaScript/projects/todo-list',
                    target: '_blank',
                },
                childElement: 'img',
                src: assets.icons.files['github-mark/github-mark-white.svg'],
            }
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
                Object.assign(headerItem, item.attributes);
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
            });
            headerElement.appendChild(headerWrapper);
        }
        return headerElement;
    },
    publish: function(e) {
        const btn = e.currentTarget;
        const className = e ? e.currentTarget.className : null;
        let subscriber;
        if (className && className.includes('home')) {
            subscriber = 'content';
        } else {
            // if (this.btnMenu.classList.contains('rotate')) {
            //     this.btnMenu.classList.remove('rotate')
            // } else {
            //     this.btnMenu.classList.add('rotate');
            // }
            // btn.classList.add('rotate');
            // setTimeout(() => {
            //     btn.classList.remove('rotate');
            // }, "300");
            // this.animateMenu();
            subscriber = 'sidebar'
        }
        pubSub.publish(subscriber, e.currentTarget);
    },
    search: function() {
        window.open(
            'https://www.youtube.com/watch?v=UVA7MDQr1Nc',
            '_blank'
        );
    },
    animateNav: function(e) {
        if (e) {

        } else {
            if (this.btnMenu.classList.contains('rotate')) {
                this.btnMenu.classList.remove('rotate');
            } else {
                // setTimeout(() => this.btnMenu.classList.add('rotate'), 5000);
                this.btnMenu.classList.add('rotate');
            }
        }
    }
}