// import { addTask } from '../containers/project-controller';
// import buildProjectsList from '../components/projects_list'; // testing
// import { buildList } from '../components/projects_list';
import { pubSub } from '../containers/pubsub';
import { projectController } from '../containers/project-controller';
import '../styles/form_project.css';

const buildTaskForm = (type, form, button, buttonParent, dialogElement) => {
    let state = {
        form,
        type,
    }

    if (type === 'default') {
        if (button.hasAttribute('role')) {
            console.log(button);
        }
        state.button = button;
        state.buttonParent = buttonParent;
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
        buildForm.add('modal', form, undefined, undefined, dialogElement);

        form.appendChild(buildForm.find(`modal`).render());
        buildForm.find(`modal`).cacheDOM();
        buildForm.find(`modal`).bindEvents();
        dialogElement.appendChild(form);
        document.body.appendChild(dialogElement);
        dialogElement.showModal();
    } else {
        e.currentTarget.replaceWith(form);
        buildForm.add('default', form, button, buttonParent)
        form.appendChild(buildForm.find(`default`).render());
        buildForm.find(`default`).cacheDOM();
        buildForm.find(`default`).bindEvents();
    }
}

const formTask = (state) => ({
    type: state.type,
    form: state.form,
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnSubmit = this.form.querySelector('.btn_submit_task') || this.form.querySelector('.btn_update_task');
        this.formInputs = this.form.querySelectorAll('.task_input');
    },
    bindEvents: function() {
        console.log(this);
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
                    let length = 4;
                    if (formChild === 'project') {
                        length = projectController.projects.length;
                    }
                    for (let i = 1; i <= length; i++) {
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
        // pubSub.publish('resetOldTask'); // testing
        if (!this.listItem) {
            projectController.findActive().addTask(this.formInputs);
            if (this.dialogElement) {
                this.closeForm();
            } else {
                this.form.reset();
            }
        } else {
            this.closeForm();
            pubSub.publish('resetOldTask', this.button); // testing
            projectController.findActive().updateTask(this.listItem.dataset.uuid, this.formInputs);
        }
    },
    closeForm: function(e) {
        console.log(`closeForm() from tasks_from.js is running`); // for debugging
        if (!this.dialogElement) {
            this.form.replaceWith(this.button);
            buildForm.remove(this.type);
        } else {
            this.removeModal();
        }
        pubSub.publish('resetOldTask'); // testing
    }
});

const nonModal = (state) => ({
    button: state.button,
    parentButton: state.buttonParent,
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

const formInputs = (state) => {
    const content = state.button.firstChild.firstChild.childNodes;
    const init = () => {
        for (let formChild in inputs.formChildren) {
            if (inputs.formChildren[formChild].attributes && Array.from(content).find(element => element.className.includes(inputs.formChildren[formChild].attributes.id))) {
                console.log(formChild)
                if (!inputs.formChildren[formChild].options) {
                    Object.assign(
                        inputs.formChildren[formChild].attributes,
                        { value: Array.from(content).find(element => element.className.includes(inputs.formChildren[formChild].attributes.id)).textContent });
                } else {
                    Object.assign(
                        inputs.formChildren[formChild].options,
                        { value: Array.from(content).find(element => element.className.includes(inputs.formChildren[formChild].attributes.id)).textContent });
                }
            }
        }
    }

    const inputs = {
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
                    placeholder: 'Priority',
                },
                options: {
                    element: 'option',
                    attributes: function(priority) {
                        const newPriority = {
                            value: `Priority ${priority}`,
                        }
                        if (this.value) {
                            console.log(this.value)
                            if (this.value === newPriority.value) {
                                return Object.assign(newPriority, { selected: true })
                            } else {
                                return newPriority
                            }
                        } else {
                            // defaultSelected parameter MDN
                            // https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement/Option#parameters
                            return priority === 4? Object.assign(newPriority, { selected: true}, { defaultSelected : true}) : newPriority;
                        }
                    }
                },
            },
            project: {
                element: 'select',
                attributes: {
                    id: '',
                    className: 'task_input',
                    name: 'project',
                    placeholder: 'Project'
                },
                options: {
                    element: 'option',
                    attributes: function(i) {
                        console.log(projectController.projects[i-1])
                        const project = {
                            value: projectController.projects[i-1].title
                        }
                        return projectController.findActive().uuid === projectController.projects[i-1].uuid ?
                        Object.assign(project, { selected: true }, { defaultSelected : true}) : project;
                    }
                }
            },
            cancel: {
                className: 'btn_cancel',
                type: 'button',
            },
        },
    }

    const inputsAdd = {
        add: {
            className: 'btn_submit_task',
            type: 'submit',
        },
    }

    const inputsEdit = {
        button: {
            save: {
            className: 'btn_update_task',
            type: 'submit',
            },
        },
        prop: {
            listItem: state.button.firstChild,
        }
    }

    // if the button clicked has 'role' attribute
        // assign formChildren with a save-button
        // assign formTask with a content property/init function
    // otherwise, 
        // assign formChildren with only a add-button
    if (state.button.hasAttribute('role')) {
        init();
        Object.assign(inputs.formChildren, inputsEdit.button);
        Object.assign(inputs, inputsEdit.prop);
    } else {
        Object.assign(inputs.formChildren, inputsAdd);
    }
    return inputs;
}