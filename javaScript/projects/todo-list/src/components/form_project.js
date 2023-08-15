// append this to document.body
export default function buildFormProject() {
    const formProject = document.createElement('dialog');
    formProject.id = 'form_project';

    formProject.appendChild(form.render());
    // form.render();
    console.log(formProject);
}

const form = {
    formChildren: {
        title: {
            id: 'title',
            name: 'title',
            type: 'text',
            required: 'required',
        },
        submit: {
            type: 'submit',
        },
        cancel: {
            type: 'button',
        }
    },
    cacheDOM: function() {

    },
    bindEvents: function() {

    },
    render: function() {
        const formElement = document.createElement('form');
        const formHeader = document.createElement('h2');
        formHeader.textContent = 'Add Project';
        formElement.id = 'form';

        for (let formChild in this.formChildren) {
            const formItem = document.createElement('div');
            formItem.classList.add('form-item');

            if (this.formChildren[formChild].hasOwnProperty('required')) {
                const label = document.createElement('label');
                label.htmlFor = formChild;
                label.textContent = formChild;
                const input = document.createElement('input');
                input.id = formChild;
                Object.assign(input, this.formChildren[formChild]);
                formItem.appendChild(label);
                formItem.appendChild(input);
            } else {
                const button = document.createElement('button');
                Object.assign(button, this.formChildren[formChild]);
                formItem.appendChild(button);
            }
        
            formElement.appendChild(formItem);
        }
        // <form>
        //     <h2>Add project</h2>
        //     <div class='form-item'>
        //         <label>Name</label>
        //         <div>
        //             <input></input>
        //         </div>
        //     </div>
        //     <div class='form-item'>
        //         <button>Cancel</button>
        //         <button>Add</button>
        //     </div>
        // </form>
        return formElement;
    }
}