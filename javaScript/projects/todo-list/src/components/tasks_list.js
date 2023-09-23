import { projectController } from '../containers/project-controller';
import buildButton from '../components/buttons';
import buildModalRemove from '../components/modal_remove';
import buildTasksForm from '../components/tasks_form';
import { pubSub } from '../containers/pubsub';

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
        // buttons to implement
            // checkbox, appended before heading
            // due date
            // priority
        if (task) {
            const listItemWrapper = document.createElement('div');
            const listItem = document.createElement('li');
            const listItemContainer = document.createElement('div');
            const taskName = document.createElement('h3');
            const priority = document.createElement('p');
            const radioTask = buildButton('radio', 'task');

            listItemContainer.appendChild(radioTask);
            listItemWrapper.setAttribute('role', 'button');
            listItem.setAttribute('data-uuid', task.uuidTask);
            listItem.setAttribute('data-uuid-proj', task.uuidProj);
            listItem.classList.add('task_list_item');
            taskName.classList.add('task_name');
            taskName.textContent = task.name;
            priority.classList.add('task_priority');
            priority.textContent = `Priority ${task.priority}`;
            listItemContainer.appendChild(taskName);
            
            if (task.description !== undefined) {
                const taskDescription = document.createElement('p');
                taskDescription.classList.add('task_description');
                taskDescription.textContent = task.description;
                listItemContainer.appendChild(taskDescription);
            }

            if (task.due_date !== undefined || task.due_time !== undefined) {
                const dateTimeWrapper = document.createElement('p');
                dateTimeWrapper.classList.add('task_due_date_time')
                // format MMM DD YYYY
                    // from 2024-03-04 to Sun Mar 03 2024
                    // Sun Mar 03 2024 10:00
                if (task.due_date !== undefined) {
                    const date = new Date(`${task.due_date}T00:00:00`);
                    const dueDate = document.createElement('span');
                    dueDate.classList.add('task_due_date');
                    if (task.due_time === undefined) {
                        dueDate.textContent = date.toDateString();
                    } else {
                        dueDate.textContent = `${date.toDateString()} `
                    }
                    dateTimeWrapper.appendChild(dueDate);
                }

                if (task.due_time !== undefined) {
                    const dueTime = document.createElement('span');
                    dueTime.classList.add('task_due_time');
                    dueTime.textContent = task.due_time;
                    dateTimeWrapper.appendChild(dueTime);
                }
                listItemContainer.appendChild(dateTimeWrapper);
            }


            listItemContainer.appendChild(priority);

            const button = buildButton('delete', 'task');
            listItemContainer.appendChild(button);
            listItem.appendChild(listItemContainer);
            listItemWrapper.appendChild(listItem);
            this.btnDeleteTask.push(button)
            this.bindEvents(button, radioTask, listItemWrapper);

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
        console.log(e.currentTarget.parentElement.parentElement);
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
            const listItem = e.currentTarget.parentElement.parentElement;
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