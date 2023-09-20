import { pubSub } from '../containers/pubsub';
import { projectController } from '../containers/project-controller';

// mimics alert box confirming task/project removal
export default function buildModalRemove(obj) {
    console.log(`buildModalRemove() is running from mmodal_remove.js`);
    const dialogElement = document.createElement('dialog');
    const form = document.createElement('form');
    
    console.log(obj)
    dialogElement.id = 'modal';
    form.classList.add('form_removal');

    const modal = buildModal(dialogElement, form, obj);
    form.appendChild(modal.render());
    modal.cacheDOM();
    modal.bindEvents();

    dialogElement.appendChild(form);
    document.body.appendChild(dialogElement);dialogElement.showModal();
}

const buildModal = (dialogElement, form, obj) => {
    let state = {
        dialogElement,
        form,
        type: obj.type,
        obj,
    }

    return Object.assign(
        {},
        modal(state),
    )

}

const modal = (state) => ({
    dialogElement: state.dialogElement,
    form: state.form,
    type: state.type,
    selection: state.obj,
    buttons: [
        {
            element: 'button',
            text: 'Cancel',
            attributes: {
                className: 'btn_cancel',
                type: 'button',
            }
        },
        {
            element: 'button',
            text: 'Delete',
            attributes: {
                className: 'btn_submit_remove',
                type: 'submit',
            }
        }
    ],
    cacheDOM: function() {
        this.btnCancel = this.form.querySelector('.btn_cancel');
        this.btnDelete = this.form.querySelector('.btn_submit_remove');
    },
    bindEvents: function() {
        this.submitForm = this.submitForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.form.addEventListener('submit', this.submitForm);
        this.btnCancel.addEventListener('click', this.closeForm);
        this.dialogElement.addEventListener('click', this.closeModal);
    },
    render: function() {
        // Delete?
        // Are you sure you want to delete project
        // Cancel and delete buttons

        // Need project.title and task.name
        const container = document.createElement('div');
        const header = document.createElement('h4');
        const confirmationMessage = document.createElement('p');
        const uniqueText = document.createElement('span');

        header.textContent = 'Delete?'
        confirmationMessage.textContent = `Are you sure you want to delete `;
        uniqueText.textContent = this.selection.title ? this.selection.title : this.selection.name;
        confirmationMessage.appendChild(uniqueText)
        // <p>Are you sure you want to delete <span>${this.text}</span>?</p>

        container.appendChild(header);
        container.appendChild(confirmationMessage);

        this.buttons.forEach(item => {
            
            const button = Object.assign(document.createElement(item.element), item.attributes);
            button.textContent = item.text;
            container.appendChild(button);
        })

        return container;
    },
    submitForm: function(e) {
        e.preventDefault();
        if (this.type === 'task') {
            pubSub.publish('removeTask', this.selection.uuidTask);
        } else {
            console.log(this.selection);
            console.log(this.selection.uuid);
            pubSub.publish('removeProject', this.selection.uuid);
        }
        this.closeForm();
    },
    closeForm: function(e) {
        this.dialogElement.close()
        this.removeModal();
    },
    closeModal: function(e) {
        console.log(`closeModal running from modal_remove.js`);
        if (e.target.id === 'modal') {
            this.dialogElement.close();
            this.removeModal();
        }
    },
    removeModal: function() {
        this.dialogElement.remove();
    }
})