import { addProject } from '../containers/project-controller.js';
import '../styles/form_project.css';
// renders a form to create a project
export default function buildFormProject() {
    const dialogElement = document.createElement('dialog');
    dialogElement.id = 'form_project';
    dialogElement.appendChild(formProject.render());
    console.log(`buildFormProject() is running`);
    document.body.appendChild(dialogElement);
    dialogElement.showModal();
    formProject.cacheDOM();
    formProject.bindEvents();
}

const formProject = {
    formChildren: {
        name: {
            id: 'title',
            name: 'title',
            type: 'text',
            placeholder: 'Enter Project Title',
            required: 'required',
        },
        add: {
            className: 'btn-submit-project',
            type: 'submit',
        },
        cancel: {
            className: 'btn-cancel',
            type: 'button',
        },
    },
    cacheDOM: function() {
        this.dialogElement = document.querySelector('#form_project');
        this.btnCancel = document.querySelector('.btn-cancel');
        this.btnSubmit = document.querySelector('.btn-submit-project');
        this.form = document.querySelector('#form');
        this.formInputs = document.querySelectorAll('#form input');
    },
    bindEvents: function() {
        this.closeModal = this.closeModal.bind(this);
        this.removeModal = this.removeModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.dialogElement.addEventListener('click', this.closeModal);
        this.dialogElement.addEventListener('cancel', this.removeModal)
        this.btnCancel.addEventListener('click', this.removeModal);
        this.form.addEventListener('submit', this.submitForm);
    },
    // take a look at restaurant project's contact module
    render: function() {
        const formElement = document.createElement('form');
        const formHeader = document.createElement('h2');
        formElement.id = 'form';
        formHeader.textContent = 'Add Project';
        formElement.appendChild(formHeader);

        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form-item');
            if (this.formChildren[formChild].hasOwnProperty('required')) {
                const label = document.createElement('label');
                const input = document.createElement('input');
                label.textContent = formChild;
                label.htmlFor = this.formChildren[formChild].id;
                Object.assign(input, this.formChildren[formChild]);
                formItem.appendChild(label);
                formItem.appendChild(input);
            } else {
                const button = document.createElement('button');
                const span = document.createElement('span');
                Object.assign(button, this.formChildren[formChild]);
                span.textContent = formChild;

                button.appendChild(span);
                formItem.appendChild(button);
            }
            formElement.appendChild(formItem);
        }

        return formElement
    },
    closeModal: function(e) {
        console.log(`closeModal() running`);
        if (e.target.tagName === 'DIALOG') {
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
    },
    submitForm: function(e) {
        e.preventDefault();
        // form validation optional
        addProject(this.formInputs);
    }
}