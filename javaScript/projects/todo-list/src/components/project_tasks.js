// import buildProjectsList from '../components/projects_list';
// import { buildList } from '../components/projects_list';
import { pubSub } from '../containers/pubsub';
import { projects, getProject } from '../containers/project-controller';
import buildButtonAdd from '../components/button_add';
import buildButtonDelete from '../components/button_delete';
import buildTaskForm from '../components/tasks_form';

// renders a project's page and it's tasks
// when we are at a project's page
    // we delete it from there or from the sidebar
        // change content to home
export default function buildProjectTasks(uuid) {
    console.log(`tasks.js running`); // for debugging
    const project = getProject(uuid);
    projectTasks.project = getProject(uuid);
    const projectsContainer = document.createElement('div');
    const header = document.createElement('h1');
    const list = document.createElement('ul');
    const listItem = document.createElement('li'); // rename?
    
    projectsContainer.classList.add('task');
    list.classList.add('tasks_list');

    header.textContent = project.title;

    projectsContainer.appendChild(header);
    list.appendChild(projectTasks.render());

    listItem.appendChild(buildButtonAdd('task', 'Add task'));
    list.appendChild(listItem);
    projectsContainer.appendChild(list);

    projectTasks.cacheDOM(list)
    projectTasks.bindEvents();
    pubSub.subscribe('project', projectTasks.render);

    return projectsContainer
}

const projectTasks = {
    project: null,
    cacheDOM: function(container) {
        this.ulList = container;
        this.listContainer = this.ulList.firstChild;
        this.btnAddTask = this.ulList.querySelector('.btn_add_task');
        this.btnDeleteTask = this.ulList.querySelectorAll('.btn_delete_task');
        this.projectsListItems = this.ulList.querySelectorAll('li');
        
        // console.log(this.ulList);
        // console.log(this.listContainer);
        // console.log(this.projectsListItems);
    },
    bindEvents: function() {
        this.removeTask = this.removeTask.bind(this);

        this.btnAddTask.addEventListener('click', (e) => { buildTaskForm(e) });
        this.btnDeleteTask.forEach(button => {
            button.addEventListener('click', this.removeTask);
        });
        // this will need to generate a form
            // removes the button
    },
    render: function() {
        // console.log(this.project);
        const listItems = document.createElement('div');

        for (let i = 0; i < this.project.tasks.length; i++) {
            const listItem = document.createElement('li');
            const listItemContainer = document.createElement('div');
            const taskName = document.createElement('h3');
            
            taskName.textContent = this.project.tasks[i].name;

            // need to create a button that complete tasks
            // listItemContainer.appendChild(buildButtonCheck)
            listItemContainer.appendChild(taskName);

            if (this.project.tasks[i].description !== undefined) {
                const taskDescription = document.createElement('p');
                taskDescription.textContent = this.project.tasks[i].description;
                listItemContainer.appendChild(taskDescription);
            }

            listItemContainer.appendChild(buildButtonDelete('task'));
            listItem.appendChild(listItemContainer);
            listItems.appendChild(listItem);
        }
        
        return listItems;
    },
    removeTask: function(e) {
        console.log('removeTask() running');
    }
}