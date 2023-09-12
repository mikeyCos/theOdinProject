import { projectController } from '../containers/project-controller';
import buildButton from '../components/buttons'
// import buildTasksForm from '../components/tasks_form_edit';
import buildTasksForm from '../components/tasks_form';
import { pubSub } from '../containers/pubsub';

export const tasksList = {
    btnDeleteTask: [],
    init: function() {
        this.render = this.render.bind(this);
        this.resetOldTask = this.resetOldTask.bind(this);
        pubSub.subscribe('addTask', this.render);
        pubSub.subscribe('updateTask', this.render);
        pubSub.subscribe('resetOldTask', this.resetOldTask); // testing
        this.project = projectController.findActive()
        this.listContainer = this.render();
        this.project.tasks.forEach(task => this.render(task));
        return this.listContainer;
    },
    oldTask: null,
    project: null,
    cacheDOM: function() {
        this.listContainer = this.listContainer;
        // this.btnDeleteTask = this.listContainer.querySelectorAll('.btn_delete_task');
        this.projectsListItems = this.listContainer.querySelectorAll('li');
        // console.log(this.projectsListItems);
    },
    bindEvents: function(...args) {
        this.removeTask = this.removeTask.bind(this);
        this.editTask = this.editTask.bind(this);
        // args.forEach(element => console.log(element));
        args.forEach(element => {
            if (element.getAttribute('type')) {
                element.addEventListener('click', this.removeTask, true);
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
            
            if (task.due_date !== undefined) {
                // need to render it 
                const dueDate = document.createElement('p');
                dueDate.classList.add('task_due_date');
                dueDate.textContent = task.due_date;
                listItemContainer.appendChild(dueDate);
            }

            listItemContainer.appendChild(priority);

            const button = buildButton('delete', 'task');
            listItemContainer.appendChild(button);
            listItem.appendChild(listItemContainer);
            listItemWrapper.appendChild(listItem);
            this.btnDeleteTask.push(button)
            this.bindEvents(button, listItemWrapper);

            console.log(this.oldTask) // for debugging
            if (!this.oldTask) {
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
    removeTask: function(e) {
        e.stopImmediatePropagation();
        console.log(`removeTask() in tasks_list.js is running`)

        const listItem = e.currentTarget.parentElement.parentElement;
        const listItemWrapper = listItem.parentElement;
        let uuidTask = listItem.dataset.uuid;
        this.project.removeTask(uuidTask);
        listItem.remove();
    },
    editTask: function(e) {
        console.log(`editTask() from tasks_list.js is running`);
        this.oldTask = e.currentTarget;
        buildTasksForm(e);
    },
    resetOldTask: function(oldTask) {
        console.log(`resetOldTask() from tasks_list.js is running`);
        if (this.oldTask) {
            this.oldTask = null
        } else if (oldTask) {
            this.oldTask = oldTask;
        }
    }
}