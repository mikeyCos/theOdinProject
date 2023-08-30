import { projects, removeProject } from '../containers/project-controller';
import buildButtonDelete from './button_delete';
import { pubSub } from '../containers/pubsub';

const buildProjectsList = (type, container) => {
    let state = {
        container,
        type,
    }

    return Object.assign(
        {},
        projectList(state),
        )
}

export const buildList = {
    modules: [],
    add: function (type, container) {
        // need to check if the module exists already
        // if module exists, then update it's container
        // prevents similar modules to be added
        if (this.modules.some(module => module.type === type)) {
            this.find(type).container = container;
        } else {
            this.modules = [...this.modules, buildProjectsList(type, container)];
        }
    },
    find: function(type) {
        return this.modules.find(module => module.type === type);
    }
}

const projectList = (state) => ({
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
    },
    bindEvents: function() {
        this.removeListItem = this.removeListItem.bind(this);
        this.btnDeleteProject.forEach( button => {
            button.addEventListener('click', this.removeListItem);
        });

        this.projectsListAnchors.forEach( project => {
            project.addEventListener('click', this.publish);
        });
    },
    render: function() {
        const listItems = document.createElement('div');
        for (let i = 0; i < projects.length; i++) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            const anchorSpan = document.createElement('span');
            anchorSpan.textContent = projects[i].title;
            anchor.href = `#${projects[i].title};`

            listItem.setAttribute('data-uuid', projects[i].uuid);
            anchor.classList.add('nav_project');
            const buttonSpan = document.createElement('span');
            
            buttonSpan.appendChild(buildButtonDelete('project'));
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);
            listItem.appendChild(buttonSpan);

            listItems.appendChild(listItem);
        }

        if (this.listContainer) {
            this.listContainer.remove();
            this.ulList.appendChild(listItems);
            // changes content only when a new project is added
            if (this.projectsListItems.length < projects.length) {
                pubSub.publish('content', [...listItems.children].splice(-1).pop().firstChild);
            } else if (this.projectsListItems.length > projects.length ) {
                // console.log(`this.projectsListItems.length is > projects.length`);
                // alert('foo');
            }
            this.cacheDOM(this.ulList);
            this.bindEvents();
        }
        return listItems;
    },
    removeListItem: function(e) {
        const listItem = e.target.parentElement.parentElement.parentElement;
        listItem.remove();
        removeProject(listItem.dataset.uuid);
        buildList.modules.forEach(module => module.render());
    },
    publish: function(e) {
        console.log(`publish() running`);
        let className = e.target.parentElement.className;
        let itemUUID = e.target.parentElement.parentElement
        pubSub.publish('content', e.target.parentElement);
    },
    clearCache: function() {
        this.ulList = null;
        this.listContainer = null;
        this.projectsListItems = null;
        this.projectsListAnchors = null;
        this.btnDeleteProject = null;
    },
})

// const foobar = ['foo', 'bar'];
// const foo = foobar.find((element) => element !== 'bar');
// console.log(foo);