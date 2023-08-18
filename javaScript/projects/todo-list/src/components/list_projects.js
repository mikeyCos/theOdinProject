import { projects } from '../containers/project-controller.js';
import { sidebar } from '../components/sidebar/sidebar.js';
import buildButtonDelete from './button_delete.js';
import { removeProject } from '../containers/project-controller.js';
// renders list of projects
// each list item is clickable
    // project is opened 

export function buildProjectList() {
    
    sidebar.projectsContainer.appendChild(projectList.render());
    projectList.cacheDom();
    projectList.bindEvents();
}

const projectList = {
    listItem: {
        anchor: {
        
        },
        button: {

        }
    },
    cacheDom: function() {
        this.projectsList = document.querySelector('#projects_list');
        this.projectsListItems = this.projectsList.querySelectorAll('li');
        this.btnDeleteProject = this.projectsList.querySelectorAll('.btn_delete_project');
        console.log(this.btnDeleteProject);
    },
    bindEvents: function() {
        this.btnDeleteProject.forEach( button => {
            button.addEventListener('click', this.removeListItem);
        });
    },
    render: function() {
        if (this.projectsList) {
            this.projectsList.remove();
        }
        const list = document.createElement('ul');
        list.id = 'projects_list';
        for (let i = 0; i < projects.length; i++) {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            const anchorSpan = document.createElement('span');
            anchorSpan.textContent = projects[i].title;
            anchor.href = `#${projects[i]};`

            listItem.setAttribute(`data-uuid`, projects[i].uuid);
            const buttonSpan = document.createElement('span');
            
            buttonSpan.appendChild(buildButtonDelete('project'));
            anchor.appendChild(anchorSpan);
            listItem.appendChild(anchor);
            listItem.appendChild(buttonSpan);
            list.appendChild(listItem);
        }

        return list;
    },
    removeListItem: function(e) {
        const listItem = e.target.parentElement.parentElement.parentElement;
        console.log(`--------------------------`);
        console.log(`projects before remove()`);
        console.table(projects);
        removeProject(listItem.dataset.uuid);
        listItem.remove();
        console.log(`--------------------------`);
        console.log(`projects after remove()`);
        console.table(projects);
    }
}