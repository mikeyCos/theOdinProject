import importAll from '../utilities/import-all';'../utilities/import-all.js';
import { addProject } from '../containers/project-controller.js';
import '../styles/sidebar.css';

export default function buildSidebar(content) {
    const sidebarWrapper = document.createElement('div');
    sidebarWrapper.id = 'sidebar';
    sidebarWrapper.appendChild(sidebar.render());
    content.appendChild(sidebarWrapper);
    sidebar.cacheDOM();
    sidebar.bindEvents();
}

const assets = {
    icons: importAll(require.context('../assets/icons', true, /\.svg$/)),
}

const sidebar = {
    cacheDOM: function() {
        this.btnAddProject = document.querySelector('.btn-add-project');
    },
    bindEvents: function() {
        this.btnAddProject.addEventListener('click', addProject);
    },
    sections: {
        // placeholder: [
        //     {element: 'div', class: 'projects', childElement: 'a', content: 'Placeholder0',},
        //     {element: 'div', class: 'list', childElement: 'a', content: 'Placeholder1',}
        // ],
        projects: [
            {
                element: 'div',
                class: 'projects', 
                childElement: {
                    anchor: {element: 'a', href: '#projects', text: 'Projects'},
                    button: {element: 'button', src: assets.icons.files['add.svg']},
                },
            },
            {element: 'div', class: 'list', childElement: 'a', content: 'Lists',}
        ]
    },
    render: function() {
        const sidebarContainer = document.createElement('div');
        sidebarContainer.classList.add('container');

        for (let section in this.sections) {
            const wrapper = document.createElement('div');
            wrapper.classList.add(`wrapper-${section}`);
            this.sections[section].forEach(item => {
                const parentElement = document.createElement(item.element);
                parentElement.classList.add(`${section}-item`);
                let childElement;
                if (typeof item.childElement === 'object') {
                    for (let key in item.childElement) {
                        if (key === 'anchor') {
                            // creates anchor
                            childElement = document.createElement(item.childElement[key].element);
                            childElement.href = item.childElement[key].href;
                            childElement.textContent = item.childElement[key].text;
                        } else {
                            // creates button
                            childElement = document.createElement(item.childElement[key].element);
                            childElement.classList.add('btn-add-project');
                            const img = document.createElement('img');
                            img.src = item.childElement[key].src;
                            childElement.appendChild(img);
                        }
                        parentElement.appendChild(childElement);
                    }
                } else {
                    childElement = document.createElement(item.childElement);
                }
                parentElement.appendChild(childElement);
                wrapper.appendChild(parentElement);
            });
            sidebarContainer.appendChild(wrapper);
        }

        const list = document.createElement('ul');

        return sidebarContainer;
    }
}