// import buildProjectsList from '../components/projects_list';
// import { buildList } from '../components/projects_list';
import { pubSub } from '../containers/pubsub';
import { projects, getProject } from '../containers/project-controller';
import buildButtonAdd from '../components/button_add';
import buildTaskForm from '../components/tasks_form';

// renders a project's page and it's tasks
// when we are at a project's page
    // we delete it from there or from the sidebar
        // change content to home
export default function buildProjectTasks(uuid) {
    console.log(`tasks.js running`);
    const project = getProject(uuid);
    projectTasks.project = getProject(uuid);
    console.log(project.tasks);
    const projectsContainer = document.createElement('div');
    const header = document.createElement('h1');
    const list = document.createElement('ul');
    
    projectsContainer.classList.add('task');
    list.classList.add('tasks_list');

    header.textContent = project.title;

    projectsContainer.appendChild(header);
    list.appendChild(projectTasks.render());
    projectTasks.cacheDOM(list)
    projectTasks.bindEvents();
    projectsContainer.appendChild(list);

    pubSub.subscribe('project', projectTasks.render);

    return projectsContainer
}

const projectTasks = {
    project: null,
    cacheDOM: function(container) {
        this.ulList = container;
        this.listContainer = this.ulList.firstChild;
        this.btnAddTask = this.ulList.querySelector('.btn_add_task')
        this.projectsListItems = this.ulList.querySelectorAll('li');
        console.log(this.ulList);
        console.log(this.listContainer);
        console.log(this.projectsListItems);
    },
    bindEvents: function() {
        this.btnAddTask.addEventListener('click', buildTaskForm);
        // this will need to generate a form
            // removes the button
    },
    render: function() {
        console.log(this.project);
        const listItems = document.createElement('div');

        for (let i = 0; i < this.project.tasks.length; i++) {
            const listItem = document.createElement('li');

            listItems.appendChild(listItem);
        }
        
        const listItem = document.createElement('li');
        // listItem.classList.add('');

        listItem.appendChild(buildButtonAdd('task', 'Add task'));
        listItems.appendChild(listItem);
        
        return listItems;
    },
}