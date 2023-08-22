import { projects } from '../containers/project-controller.js';
import buildButtonDelete from './button_delete.js';
import { removeProject } from '../containers/project-controller.js';
// renders list of projects
// each list item is clickable
    // project is opened 
export default function buildProjectsList() {
    const projectsContainer = document.createElement('div');
    const list = document.createElement('ul');

    projectsContainer.classList.add('projects');
    list.classList.add('projects_list');

    console.log('projectList.testa: ' + projectList.testa);
    console.log(projectList.testa);
    if (projectList.testa) {
        console.log(`projectList.testa exists`);
        projectList.ulList.remove();
    } else {
        console.log(`projectList.testa does NOT exists`);
        // list.appendChild(projectList.render());
        console.log(list);
    }
    // list.appendChild(projectList.render());
    projectList.cacheDOM(list);
    projectsContainer.appendChild(list);
    // projectList.bindEvents();
    
    return projectsContainer;
}

const projectList = {
    init: function() {
        this.render();
    },
    cacheDOM: function(container) {
        // this.projectsList = document.querySelector('.projects_list');
        this.ulList = container;
        this.testa = container.firstChild;
        this.projectsListItems = this.ulList.querySelectorAll('li');
        this.btnDeleteProject = this.ulList.querySelectorAll('.btn_delete_project');
        console.log(`cacheDOM() running`);
        console.log(this.ulList);
        console.log(this.testa);
        console.log(`cacheDOM() ending`)
    },
    bindEvents: function() {
        this.btnDeleteProject.forEach( button => {
            button.addEventListener('click', this.removeListItem);
        });
    },
    render: function() {
        // console.log(`projectList.render() is running`);
        // console.log('this.testa: ' + this.testa);
        // console.log(this.testa);
        const a = document.createElement('div');
        for (let i = 0; i < projects.length; i++) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            const anchorSpan = document.createElement('span');
            anchorSpan.textContent = projects[i].title;
            anchor.href = `#${projects[i].title};`

            listItem.setAttribute(`data-uuid`, projects[i].uuid);
            const buttonSpan = document.createElement('span');
            
            buttonSpan.appendChild(buildButtonDelete('project'));
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);
            listItem.appendChild(buttonSpan);

            a.appendChild(listItem);
        }
        return a;
    },
    removeListItem: function(e) {
        const listItem = e.target.parentElement.parentElement.parentElement;
        removeProject(listItem.dataset.uuid);
        listItem.remove();
    }
}