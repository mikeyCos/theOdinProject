import { addTask } from '../containers/project-controller';
// import buildProjectsList from '../components/projects_list'; // testing
import { buildList } from '../components/projects_list';
import '../styles/form_project.css';
// renders a form to create a task
    // one needs to be a dialog element
    // one needs to be a non-dialog element
export default function buildTasksForm() {
    console.log(`buildTaskForm() running from tasks_form.js`);
    console.log(this.parentElement);
    const button = this;
    const listItem = this.parentElement;
    // this.remove();
    const form = document.createElement('form');
    // listItem.appendChild(form);
    console.log(button);
    let container;
    // if () {
    //     container = document.createElement('dialog');
    // } else {

    // }

    // const dialogElement = document.createElement('dialog');
    // dialogElement.id = 'form_project';
    // dialogElement.appendChild(formProject.render());
    // document.body.appendChild(dialogElement);
    // dialogElement.showModal();
    // formTask.cacheDOM();
    // formTask.bindEvents();
}

const formTask = {
    formChildren: {
        name: {
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'Task name',
            required: 'required',
        },
        description: {
            id: 'description',
            name: 'description',
            type: 'text',
            placeholder: 'Description'
        },
        add: {
            className: 'btn_submit_project',
            type: 'submit',
        },
        cancel: {
            className: 'btn_cancel',
            type: 'button',
        },
    },
    cacheDOM: function() {

    },
    bindEvents: function() {

    },
    // take a look at restaurant project's contact module
    render: function() {
        const formElement = document.createElement('form');
        const formHeader = document.createElement('h2');
        formElement.classList.add('form');
        
        

        return formElement;
    },
    closeModal: function(e) {
        console.log(`closeModal() running`); // for debugging

    },
    removeModal: function() {
        console.log(`removeModal() running`); // for debugging
    },
    submitForm: function(e) {
        e.preventDefault();
        console.log(`submitForm() running`); // for debugging
    }
}