import { projectController } from '../containers/project-controller';
import buildButtonDelete from '../components/button_delete';
import { pubSub } from '../containers/pubsub';

export const tasksList = {
    init: function() {
        this.render = this.render.bind(this);
        pubSub.subscribe('addTask', this.render);
        this.project = projectController.findActive()
        this.listContainer = this.render();
        this.project.tasks.forEach(task => this.render(task));
        return this.listContainer;
    },
    project: null,
    cacheDOM: function() {
        // this.listContainer = this.listContainer;
        console.log(this.listContainer)
        this.btnDeleteTask = this.listContainer.querySelectorAll('.btn_delete_task');
        // this.projectsListItems = this.ulList.querySelectorAll('li');
        // console.log(this.projectsListItems);
        console.log(this.btnDeleteTask);
    },
    bindEvents: function(...args) {
        this.removeTask = this.removeTask.bind(this);
        // this.btnDeleteTask.forEach(button => {
        //     button.addEventListener('click', this.removeTask);
        // });
        args.forEach(element => console.log(element));
        // args.forEach(element => element.addEventListener('click', this.removeTask));
        // this will need to generate a form
            // removes the button
    },
    render: function(task) {
        console.log(`render() in tasks_list.js is running`);
        
        if (task) {
            console.log(this);
            console.log(this.listContainer);
            console.log(task);
            const listItem = document.createElement('li');
            const listItemContainer = document.createElement('div');
            const taskName = document.createElement('h3');

            taskName.textContent = task.name;
            listItemContainer.appendChild(taskName);

            if (task.description !== undefined) {
                const taskDescription = document.createElement('p');
                taskDescription.textContent = task.description;
                listItemContainer.appendChild(taskDescription);
            }
            const button = buildButtonDelete('task');
            listItemContainer.appendChild(button);
            listItem.appendChild(listItemContainer);
            this.listContainer.appendChild(listItem);
            this.cacheDOM();
            this.bindEvents({button, listItemContainer});
        } else {
            return document.createElement('div');
        }
        // when the task form inside the list is open and a new task is added
            // the task list grows while the task form is open
    },
    removeTask: function(e) {
        console.log('removeTask() running');
    }
}