export default function buildContact() {
    console.log(`contact.js running`);
    const contactContainer = document.createElement('div');
    contactContainer.id = 'contact';

    const header = document.createElement('h1');
    const headerText = document.createTextNode('Contact');
    header.appendChild(headerText);
    contactContainer.appendChild(header);

    contactContainer.appendChild(form.render());
    return contactContainer;
}

//name
//email
//phone number
//message
const form = {
    render: function() {
        const formContainer = document.createElement('div');
        formContainer.id = 'container';
        
        const formElement = document.createElement('form');
        formElement.id = 'form'
        for (let inputs in this.attributes) {
            console.log(inputs)
            console.log(this.attributes[inputs])
            const formItem = document.createElement('div');
            formItem.classList.add('form-item');
            const label = document.createElement('label');
            const labelText = document.createTextNode(inputs);
            const span = document.createElement('span');
            span.classList.add('asterik');
            const spanText = document.createTextNode('*');
            label.htmlFor = inputs;
            label.appendChild(labelText);
            span.appendChild(spanText);
            label.appendChild(span);
            formItem.appendChild(label);

            if (inputs !== 'message') {
                const input = document.createElement('input');
                input.id = inputs;
                Object.assign(input, this.attributes[inputs]);
                formItem.appendChild(input);
            } else {
                const textArea = document.createElement('textarea');
                textArea.id = inputs;
                for (let attr in this.attributes[inputs]) {
                    textArea.setAttribute(attr, this.attributes[inputs][attr]);
                }
                formItem.appendChild(textArea);
            }
            
            formElement.appendChild(formItem);
        }

        formContainer.appendChild(formElement);
        return formContainer;
    },
    attributes: {
        name: {
            id: 'name',
            name: 'name',
            type: 'text',
            placeholder: 'firstname lastname',
            required: 'required',
        },
        email: {
            id: 'email',
            name: 'email',
            type: 'email',
            placeholder: 'email@address.com',
            required: 'required',
        },
        phone: {
            id: 'phone',
            name: 'phone',
            type: 'tel',
            placeholder: 'XXX-XXX-XXXX',
            required: 'required',
        },
        message: {
            id: 'message',
            name: 'message',
            type: 'text',
            placeholder: 'your message here (500 characters max)',
            required: 'required',
        },
    }
}