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

    let cacheContainer;
    if (projectList.listContainer) {
        projectList.listContainer.remove();
        projectList.ulList.appendChild(projectList.render());
        cacheContainer = projectList.ulList;
    } else {
        list.appendChild(projectList.render());
        projectsContainer.appendChild(list);
        cacheContainer = list;
    }
    projectList.cacheDOM(cacheContainer);
    projectList.bindEvents();

    return projectsContainer;
}

const projectList = {
    cacheDOM: function(container) {
        this.ulList = container;
        this.listContainer = container.firstChild;
        this.projectsListItems = this.ulList.querySelectorAll('li');
        this.btnDeleteProject = this.ulList.querySelectorAll('.btn_delete_project');
    },
    bindEvents: function() {
        this.btnDeleteProject.forEach( button => {
            button.addEventListener('click', this.removeListItem);
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

            listItem.setAttribute(`data-uuid`, projects[i].uuid);
            const buttonSpan = document.createElement('span');
            
            buttonSpan.appendChild(buildButtonDelete('project'));
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);
            listItem.appendChild(buttonSpan);

            listItems.appendChild(listItem);
        }
        return listItems;
    },
    removeListItem: function(e) {
        const listItem = e.target.parentElement.parentElement.parentElement;
        removeProject(listItem.dataset.uuid);
        listItem.remove();
    },
}