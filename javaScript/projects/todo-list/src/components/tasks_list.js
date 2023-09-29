import { projectController } from '../containers/project-controller';
import buildButton from '../components/buttons';
import buildModalRemove from '../components/modal_remove';
import buildTasksForm from '../components/tasks_form';
import { pubSub } from '../containers/pubsub';
import '../styles/tasks_list.css';

export const tasksList = {
    removeSelection: null,
    btnDeleteTask: [],
    init: function() {
        this.render = this.render.bind(this);
        this.resetOldTask = this.resetOldTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        pubSub.subscribe('addTask', this.render);
        pubSub.subscribe('updateTask', this.render);
        pubSub.subscribe('resetOldTask', this.resetOldTask);
        pubSub.subscribe('removeTask', this.removeTask);
        this.project = projectController.findActive()
        this.listContainer = this.render();
        this.project.tasks.forEach(task => {
            this.render(task)
        });
        return this.listContainer;
    },
    oldTask: null,
    project: null,
    cacheDOM: function() {
        this.listContainer = this.listContainer;
        // this.btnDeleteTask = this.listContainer.querySelectorAll('.btn_delete_task');
        this.projectsListItems = this.listContainer.querySelectorAll('li');
    },
    bindEvents: function(...args) {
        this.removeTask = this.removeTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        args.forEach(element => {
            if (element.getAttribute('type')) {
                if (element.className.includes('delete')) {
                    element.addEventListener('click', this.removeTask, true);
                } else {
                    element.addEventListener('click', this.completeTask)
                }
            } else {
                element.addEventListener('click', this.editTask);
            }
        });
        // this will need to generate a form
            // removes the button
    },
    render: function(task) {
        if (task) {
            const listItemWrapper = document.createElement('div');
            const listItemContainer = document.createElement('div');
            const listItem = document.createElement('li');
            const taskContent = document.createElement('div');
            const taskName = document.createElement('h3');
            const priority = document.createElement('p');
            const taskRadio = buildButton('radio', 'task');
            
            const taskActions = document.createElement('div');

            listItemWrapper.setAttribute('role', 'button');
            listItem.setAttribute('data-uuid', task.uuidTask);
            listItem.setAttribute('data-uuid-proj', task.uuidProj);
            listItemContainer.classList.add('container');
            taskContent.classList.add('task_list_item_content');
            listItem.classList.add('task_list_item');
            taskActions.classList.add('task_actions');
            taskName.classList.add('task_name');
            taskName.textContent = task.name;

            priority.classList.add('task_priority');
            priority.textContent = `Priority ${task.priority}`;

            taskRadio.firstElementChild.classList.add(`priority_${task.priority}`)

            listItemContainer.appendChild(taskRadio);
            taskContent.appendChild(taskName);
            
            if (task.description !== undefined) {
                const taskDescription = document.createElement('p');
                taskDescription.classList.add('task_description');
                taskDescription.textContent = task.description;
                taskContent.appendChild(taskDescription);
            }

            if (task.due_date !== undefined || task.due_time !== undefined) {
                const dateTimeWrapper = document.createElement('div');
                let dateTimeText;
                const date = new Date(`${task.due_date}T00:00:00`);
                const time = new Date(`1-2-1000 ${task.due_time}`)
                const timeProperties = { hour: 'numeric', minute: 'numeric', hour12: true }
                if (task.due_date && !task.due_time) {
                    dateTimeText = date.toDateString();
                } else if (!task.due_date && task.due_time) {
                    dateTimeText = time.toLocaleString('en-us', timeProperties);
                } else {
                    dateTimeText = `${date.toDateString()} ${time.toLocaleString('en-us', timeProperties)}`;
                }
                dateTimeWrapper.classList.add('task_due_date_time')
                const dateTimeButton = buildButton('date', 'task', dateTimeText)
                dateTimeWrapper.appendChild(dateTimeButton);
                taskContent.appendChild(dateTimeWrapper);
            }

            // taskContent.appendChild(priority);

            const buttonDelete = buildButton('delete', 'task');
            const buttonEdit = buildButton('edit', 'task');
            taskActions.appendChild(buttonDelete);
            taskActions.appendChild(buttonEdit);

            listItemContainer.appendChild(taskContent);
            listItemContainer.appendChild(taskActions);
            listItem.appendChild(listItemContainer);

            listItemWrapper.appendChild(listItem);
            // this.btnDeleteTask.push(button)
            this.bindEvents(buttonDelete, taskRadio, listItemWrapper);

            if (!this.oldTask) {
                console.log(`this.oldTask = ${this.oldTask}`);
                this.listContainer.appendChild(listItemWrapper);
            } else {
                this.oldTask.replaceWith(listItemWrapper);
                this.oldTask = null;
            }
            // updating task
                // need to only append at that task's index
        } else {
            return document.createElement('div');
        }
        // when the task form inside the list is open and a new task is added
            // the task list grows while the task form is open
    },
    completeTask: function(e) {
        e.stopImmediatePropagation();
        console.log(`completetask() running from tasks_list.js`);
        const listItem = e.currentTarget.parentElement.parentElement;
        this.removeSelection = listItem;
        this.removeTask();
    },
    removeTask: function(e) {
        console.log(`removeTask() in tasks_list.js is running`)
        // create a modal to confirm removal
        console.log(e);
        if (e instanceof MouseEvent) {
            e.stopImmediatePropagation();
            const listItem = e.currentTarget.parentElement.parentElement.parentElement;
            this.removeSelection = listItem;
            let uuidTask = listItem.dataset.uuid;
            buildModalRemove(this.project.findTask(uuidTask));  
        // } else if (e) {
        } else if (this.removeSelection) {
            // this.project.removeTask(e);
            this.project.removeTask(this.removeSelection.dataset.uuid);
            this.removeSelection.parentElement.remove();
            this.removeSelection = null;
        } else {
            // if (this.project.title !== 'Today') {
                this.oldTask.remove();
            // }
            this.oldTask = null;
        }
    },
    editTask: function(e) {
        console.log(`editTask() from tasks_list.js is running`);
        this.oldTask = e.currentTarget;
        buildTasksForm(e);
    },
    resetOldTask: function(oldTask) {
        console.log(`resetOldTask() from tasks_list.js is running`);
        if (this.oldTask) {
            // debugger
            this.oldTask = null
        } else if (oldTask) {
            this.oldTask = oldTask;
        }
    }
}