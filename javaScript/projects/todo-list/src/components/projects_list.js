// import { projects, removeProject, getProject } from '../containers/project-controller';
import { projectController } from '../containers/project-controller';
import buildButton from './buttons';
import { pubSub } from '../containers/pubsub';

const buildProjectsList = (type, container) => {
    let state = {
        container,
        type,
    }

    return Object.assign(
        {},
        projectsList(state),
        )
}

// rename to buildProjectsList (?)
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

const projectsList = (state) => ({
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
        // window.addEventListener("load", (event) => {
        //     const test = document.querySelector('#main_content');
        //     console.log(test);
        //     console.log(this);
        //     console.log("page is fully loaded");
            
        // });

        // onload = (event) => {
        //     console.log(`test`);
        // };
        // this.test = document.querySelector('#main_content');
    },
    bindEvents: function() {
        this.removeProject = this.removeProject.bind(this);
        this.btnDeleteProject.forEach(button => {
            button.addEventListener('click', this.removeProject);
        });

        this.projectsListAnchors.forEach( project => {
            project.addEventListener('click', this.publish);
        });
    },
    render: function() {
        const listItems = document.createElement('div');
        for (let i = 0; i < projectController.projects.length; i++) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            const anchorSpan = document.createElement('span');
            anchorSpan.textContent = projectController.projects[i].title;
            anchor.href = `#${projectController.projects[i].title};`

            listItem.setAttribute('data-uuid', projectController.projects[i].uuid);
            anchor.classList.add('nav_project');
            const buttonSpan = document.createElement('span');
            
            buttonSpan.appendChild(buildButton('delete', 'project'));
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);
            listItem.appendChild(buttonSpan);

            listItems.appendChild(listItem);
        }

        if (this.listContainer) {
            this.listContainer.remove();
            this.ulList.appendChild(listItems);
            // changes content to the newly project is added
            if (this.projectsListItems.length < projectController.projects.length && this.type === 'sidebar') {
                pubSub.publish('content', [...listItems.children].splice(-1).pop().firstChild);
            }
            this.cacheDOM(this.ulList);
            this.bindEvents();
        }
        return listItems;
    },
    removeProject: function(e) {
        const listItem = e.target.parentElement.parentElement.parentElement;
        const projectUUID = listItem.dataset.uuid;
        listItem.remove();
        // if there is no active project
        // OR the project's uuid we want to remove is the same as the current active project's uuid
            // update the content to the homepage
        if (projectController.findActive() === undefined || projectUUID === projectController.findActive().uuid) {
            pubSub.publish('content', e.target.parentElement);
        }
        projectController.remove(projectUUID);
        buildList.modules.forEach(module => module.render());
    },
    publish: function(e) {
        // console.log(`publish() running`); // for debugging
        let className = e.target.parentElement.className;
        let projectUUID = e.target.parentElement.parentElement.dataset.uuid
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