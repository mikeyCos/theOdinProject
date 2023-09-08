// import { addTask } from '../containers/project-controller';
// import buildProjectsList from '../components/projects_list'; // testing
// import { buildList } from '../components/projects_list';
import { projectController } from '../containers/project-controller';
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
            formInputs(state),
        )
    }

    state.dialogElement = dialogElement;
    return Object.assign(
        {},
        formTask(state),
        modal(state),
        formInputs(state),
    );
}

export const buildForm = {
    sections: [],
    add: function (type, form, button, dialogElement) {
        // need to check if the section exists already
        // if section exists, section update it's container
        // prevents similar sections to be added
        if (this.find(type)) {
            // this.find(type).unBindEvent();
            this.find(type).closeForm();
            this.remove(type);
        }
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
    const button = e.currentTarget;
    const buttonParent = button.parentElement;
    const form = document.createElement('form');
    form.classList.add('form_task');

    if (!button.hasAttribute('role') && buttonParent.tagName !== 'LI') {
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
        console.log(button)
        console.log(button.parentElement)
        console.log(buttonParent)
        e.currentTarget.replaceWith(form);
        buildForm.add('default', form, button)
        buildForm.find('default').init();
        form.appendChild(buildForm.find(`default`).render());
        buildForm.find(`default`).cacheDOM();
        buildForm.find(`default`).bindEvents();
    }
}

const formTask = (state) => ({
    // inputs to implement
        // due date
        // priority
        // project selection (drop-down)
    type: state.type,
    form: state.form,
    init: function() {
        console.log(`init() running in tasks_form_edit.js`)
        console.log(this.content)
        for (let formChild in this.formChildren) {
            
            if (this.formChildren[formChild].attributes) {
                console.log(this.formChildren[formChild].attributes);
            }
            // if (this.formChildren[formChild].attributes && Array.from(this.content).find(element => element.className.includes(this.formChildren[formChild].attributes.id))) {
                
            //     if (!this.formChildren[formChild].options) {
            //         Object.assign(
            //             this.formChildren[formChild].attributes,
            //             { value: Array.from(this.content).find(element => element.className.includes(this.formChildren[formChild].attributes.id)).textContent });
            //     } else {
            //         Object.assign(
            //             this.formChildren[formChild].options,
            //             { value: Array.from(this.content).find(element => element.className.includes(this.formChildren[formChild].attributes.id)).textContent });
            //     }
            // }
        }
    },
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnSubmit = this.form.querySelector('.btn_submit_task');
        this.formInputs = this.form.querySelectorAll('.task_input');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.form.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        
        if (this.dialogElement) {
            this.closeModal = this.closeModal.bind(this);
            this.dialogElement.addEventListener('click', this.closeModal);
        }
    },
    unBindEvent: function() {
        this.form.removeEventListener('submit', this.submitForm);
    },
    // take a look at restaurant project's contact module
    render: function() {
        console.log(this.button);
        const container = document.createElement('div');
        
        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form_item');
            if (this.formChildren[formChild].hasOwnProperty('element')) {
                const label = document.createElement('label');
                const item = Object.assign(
                    document.createElement(this.formChildren[formChild].element),
                    this.formChildren[formChild].attributes
                );

                label.htmlFor = this.formChildren[formChild].attributes.id;
                label.textContent = this.formChildren[formChild].attributes.placeholder;

                // idea, make separate module for options button
                if (this.formChildren[formChild].options) {
                    for (let i = 1; i <= 4; i++) {
                        const selectOption = Object.assign(
                            document.createElement(this.formChildren[formChild].options.element),
                            this.formChildren[formChild].options.attributes(i)
                        )

                        selectOption.textContent = selectOption.getAttribute('value');
                        item.appendChild(selectOption);
                    }
                }

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
        projectController.findActive().addTask(this.formInputs);
        if (this.dialogElement) {
            this.closeForm();
        } else {
            // this.formInputs.forEach(input => input.value = '')

            this.form.reset();
        }
    },
    closeForm: function(e) {
        if (!this.dialogElement) {
            // this.form.remove();
            this.form.replaceWith(this.button);
            buildForm.remove(this.type);
        } else {
            this.removeModal();
        }
    }
});

const nonModal = (state) => ({
    button: state.button,
});

const modal = (state) => ({
    dialogElement: state.dialogElement,
    closeModal: function(e) {
        if (e.target.id === 'modal') {
            this.dialogElement.close();
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
        buildForm.remove(this.type);
    },
});

const formInputs = (state) => ({
    formChildren: {
        name: {
            element: 'input',
            attributes: {
                id: 'name',
                className: 'task_input',
                name: 'name',
                type: 'text',
                placeholder: 'Task name',
                required: 'required',
            }
        },
        description: {
            element: 'textarea',
            attributes: {
                id: 'description',
                className: 'task_input',
                name: 'description',
                placeholder: 'Description'
            }
        },
        dueDate: {
            element: 'input',
            attributes: {
                id: 'due_date',
                className: 'task_input',
                name: 'dueDate',
                type: 'datetime-local',
                placeholder: 'Due Date',
            }
        },
        priority: {
            element: 'select',
            attributes: {
                id: 'priority',
                className: 'task_input',
                name: 'priority',
                placeholder: 'Priority'
            },
            options:
            {
                element: 'option',
                attributes: function(priority) {
                    const newPriority = {
                        value: `Priority ${priority}`,
                    }
                    if (this.value) {
                        if (this.value === newPriority.value) {
                            return Object.assign(newPriority, { selected: true })
                        } else {
                            return newPriority
                        }
                    } else {
                        return priority === 4? Object.assign(newPriority, { selected: true}) : newPriority;
                    }
                }
            },
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
});