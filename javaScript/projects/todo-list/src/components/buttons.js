// module that will create buttons
    // add project/task
    // delete project/task
    // edit task
    import IconAdd from '../assets/icons/add.svg';
    import IconDelete from '../assets/icons/delete.svg';
    import IconEdit from '../assets/icons/edit.svg';
    import IconRadio from '../assets/icons/radio_button_unchecked.svg';
    // returns a button element to create a project/task
    // if spanText provided, then a span element is created
    const icons = { add: IconAdd, delete: IconDelete, edit: IconEdit, radio: IconRadio };

    export default function buildButton(type, name, text) {
        const button = Object.assign(document.createElement('button'), buttonAttributes(type, name));    
        const image = new Image();
        image.src = icons[type];
    
        if (text) {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('btn_img_wrapper');
            imageWrapper.appendChild(image);
            const span = document.createElement('span');
            span.textContent = text;
            button.appendChild(imageWrapper);
            button.appendChild(span);
        } else {
            button.appendChild(image);
        }
    
        return button;
    }
    
    const buttonAttributes = (type, name) => {
        const button = {
            // className: btn_delete_project
            className: `btn_${type}_${name}`,
            type: `button`,
        }
        return button;
    }