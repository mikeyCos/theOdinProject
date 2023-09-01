import { addTask } from '../containers/project-controller';
// import buildProjectsList from '../components/projects_list'; // testing
// import { buildList } from '../components/projects_list';
import '../styles/form_project.css';

const buildTaskForm = (type, form, button, dialogElement) => {
    let state = {
        form,
        type,
    }

    if (type === 'default') {
        state.button = button;
        return Object.assign(
            {},
            formTask(state),
            nonModal(state),
        )
    }

    state.dialogElement = dialogElement;

    return Object.assign(
        {},
        formTask(state),
        modal(state),
    );
}

const buildForm = {
    sections: [],
    add: function (type, form, button, dialogElement) {
        // need to check if the section exists already
        // if section exists, section update it's container
        // prevents similar sections to be added
        this.sections = [...this.sections, buildTaskForm(type, form, button, dialogElement)];
        console.log(this.sections); // for debugging
    },
    remove: function(type) {
        this.sections.splice(this.sections.indexOf(this.find(type)), 1);
    },
    find: function(type) {
        return this.sections.find(section => section.type === type);
    }
}

// renders a form to create a task
    // one needs to be a dialog element
    // one needs to be a non-dialog element
export default function buildTasksForm(e) {
    console.log(`buildTaskForm() running from tasks_form.js`); // for debugging
    const button = e.target;
    const buttonParent = button.parentElement;
    const form = document.createElement('form');
    form.classList.add('form_task');

    if (buttonParent.tagName !== 'LI') {
        form.classList.add('modal');
        const dialogElement = document.createElement('dialog');
        dialogElement.id = 'modal';
        buildForm.add('modal', form, undefined, dialogElement);

        form.appendChild(buildForm.find(`modal`).render());
        buildForm.find(`modal`).cacheDOM();
        buildForm.find(`modal`).bindEvents();
        dialogElement.appendChild(form);
        document.body.appendChild(dialogElement);
        dialogElement.showModal();
    } else {
        buildForm.add('default', form, button)
        form.appendChild(buildForm.find(`default`).render());
        buildForm.find(`default`).cacheDOM();
        buildForm.find(`default`).bindEvents();
        button.remove();
        buttonParent.appendChild(form);
    }
}

const formTask = (state) => ({
    type: state.type,
    form: state.form,
    formChildren: {
        name: {
            element: 'input',
            id: 'name',
            className: 'task_input',
            name: 'name',
            type: 'text',
            placeholder: 'Task name',
            required: 'required',
        },
        description: {
            element: 'textarea',
            id: 'description',
            className: 'task_input',
            name: 'description',
            placeholder: 'Description'
        },
        cancel: {
            className: 'btn_cancel',
            type: 'button',
        },
        add: {
            className: 'btn_submit_task',
            type: 'submit',
        },
    },
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnSubmit = this.form.querySelector('.btn_submit_task');
        this.formInputs = this.form.querySelectorAll('.task_input');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.btnSubmit.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        
        if (this.dialogElement) {
            this.closeModal = this.closeModal.bind(this);
            this.dialogElement.addEventListener('click', this.closeModal);
        }
    },
    // take a look at restaurant project's contact module
    render: function() {
        const container = document.createElement('div');
        
        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form_item');
            if (this.formChildren[formChild].hasOwnProperty('element')) {
                const label = document.createElement('label');
                const item = Object.assign(
                    document.createElement(this.formChildren[formChild].element),
                    this.formChildren[formChild]
                );

                label.htmlFor = this.formChildren[formChild].id;
                label.textContent = this.formChildren[formChild].placeholder;

                formItem.appendChild(label);
                formItem.appendChild(item);
            } else {
                const button = document.createElement('button');
                const span = document.createElement('span');
                Object.assign(button, this.formChildren[formChild]);
                span.textContent = formChild;

                button.appendChild(span);
                formItem.appendChild(button);
            }
            container.appendChild(formItem);
        }
        
        return container;
    },
    submitForm: function(e) {
        e.preventDefault();
        console.log(`submitForm() running`); // for debugging
        this.closeForm();
    },
    closeForm: function(e) {
        if (!this.dialogElement) {
            this.form.remove();
            buildForm.remove(this.type);
            this.buttonParent.appendChild(this.button);
            buildForm.remove(this.type);
        } else {
            this.removeModal();
        }
    }
});

const nonModal = (state) => ({
    button: state.button,
    buttonParent: state.button.parentElement,
});

const modal = (state) => ({
    dialogElement: state.dialogElement,
    closeModal: function(e) {
        console.log(`closeModal() running`); // for debugging
        if (e.target.id === 'modal') {
            this.dialogElement.close();
            this.removeModal();
        }
    },
    removeModal: function() {
        console.log(`removeModal() running`); // for debugging
        this.dialogElement.remove();
        buildForm.remove(this.type);
    },
});