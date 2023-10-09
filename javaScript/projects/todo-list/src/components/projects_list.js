import { projectController } from '../containers/project_controller';
import buildButton from './buttons';
import buildModalRemove from './modal_remove';
import { pubSub } from '../containers/pubsub';
import IconInbox from '../assets/icons/inbox.svg';
import IconToday from '../assets/icons/today.svg';
import IconProject from '../assets/icons/circle.svg';
import '../styles/projects.css';
import '../styles/projects_list.css';

const buildProjectsList = (type, container, array) => {
    let state = {
        container,
        type,
        array,
    }

    return Object.assign(
        {},
        projectsList(state),
        setIcons(state),
        )
}

export const buildList = {
    modules: [],
    add: function (type, container, array) {
        // need to check if the module exists already
        // if module exists, then update it's container
        // prevents similar modules to be added
        if (this.modules.some(module => module.type === type)) {
            this.find(type).container = container;
        } else {
            this.modules = [...this.modules, buildProjectsList(type, container, array)];
        }
    },
    find: function(type) {
        return this.modules.find(module => module.type === type);
    }
}

const projectsList = (state) => ({
    removeSelection: null,
    array: state.array,
    type: state.type,
    container: state.container,
    init: function() {
        const projectsContainer = document.createElement('div');
        const list = document.createElement('ul');
    
        projectsContainer.classList.add('projects');
        list.classList.add('projects_list');
        list.appendChild(this.render())
        this.cacheDOM(list);
        this.bindEvents();
        this.container.appendChild(list);
    },
    cacheDOM: function(container)  {    
        this.ulList = container;
        this.listContainer = this.ulList.firstChild;
        this.projectsListItems = this.ulList.querySelectorAll('li');
        this.projectsListAnchors = this.ulList.querySelectorAll('li a');
        this.btnDeleteProject = this.ulList.querySelectorAll('.btn_delete_project');
        if (this.type === 'sidebar') {
            pubSub.publish('updateTabs', this.projectsListAnchors);
        }
    },
    bindEvents: function() {
        this.removeProject = this.removeProject.bind(this);
        this.publish = this.publish.bind(this);
        pubSub.subscribe('removeProject', this.removeProject);
        this.btnDeleteProject.forEach(button => {
            button.addEventListener('click', this.removeProject);
        });

        this.projectsListAnchors.forEach( project => {
            project.addEventListener('click', this.publish);
        });
    },
    render: function() {
        const listItems = document.createElement('div');
        for (let i = 0; i < this.array.length; i++) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            const anchorSpan = document.createElement('span');
            const anchorImg = new Image();
            anchorImg.setAttribute('onload', 'SVGInject(this)');
            anchorSpan.textContent = this.array[i].title;
            anchor.href = `#${this.array[i].title.toLowerCase()}`;

            listItem.setAttribute('data-uuid', this.array[i].uuid);
            anchor.classList.add('nav_project');
            const buttonSpan = document.createElement('span');

            if (Object.keys(this.icons).find(a => a === this.array[i].title.toLowerCase())) {
                anchorImg.src = this.icons[Object.keys(this.icons).find(a => a === this.array[i].title.toLowerCase())]
            } else {
                anchorImg.src = this.icons['circle'];
            }
            
            anchor.appendChild(anchorImg);
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);

            if (state.type !== 'misc') {
                const deleteButton = buildButton('delete', 'project');
                deleteButton.setAttribute('data-inbox-uuid', projectController.inbox[0].uuid);
                buttonSpan.appendChild(deleteButton);
                listItem.appendChild(buttonSpan);
            }
            listItems.appendChild(listItem);
        }

        if (this.listContainer) {
            this.listContainer.remove();
            this.ulList.appendChild(listItems);
            // changes content to the newly project is added
            this.cacheDOM(this.ulList);
            this.bindEvents();
        }
        return listItems;
    },
    removeProject: function(e) {
        if (e instanceof MouseEvent) {
            const listItem = e.currentTarget.parentElement.parentElement;
            // sets removeSelection for 'sidebar' and 'content' modules
            buildList.modules.forEach(module => {
                if (module.type !== 'misc') {
                    module.removeSelection = [...module.projectsListItems].find(item => item.dataset.uuid === listItem.dataset.uuid);
                }
            });

            const projectUUID = listItem.dataset.uuid;
            buildModalRemove(projectController.find(projectUUID));
        } else {
            projectController.remove(e);
            // removes and resets removeSelection for 'sidebar' and 'content' modules 
            buildList.modules.forEach(module => {
                if (module.type !== 'misc' && module.removeSelection) {
                    module.removeSelection.remove();
                    module.removeSelection = null;
                }
            });
        }
    },
    publish: function(e) {
        e.preventDefault();

        pubSub.publish('content', e.currentTarget);
        if ((this.type === 'sidebar'|| this.type === 'misc') && window.innerWidth < 768) {
            pubSub.publish('hideSidebar');
        }
    },
    clearCache: function() {
        this.ulList = null;
        this.listContainer = null;
        this.projectsListItems = null;
        this.projectsListAnchors = null;
        this.btnDeleteProject = null;
    },
})

const setIcons = (state) => {
    let icons = {}

    if (state.type === 'misc') {
        icons.icons = { inbox: IconInbox, today: IconToday };
    } else {
        icons.icons = { circle: IconProject };
    }
    return icons;
}