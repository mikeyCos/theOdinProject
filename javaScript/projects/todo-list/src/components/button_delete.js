import IconDelete from '../assets/icons/delete.svg';
// returns a button element to delete a project/task
// if spanText provided, then a span element is created
export default function buildButtonDelete(type, spanText) {
    const button = Object.assign(document.createElement('button'), buttonAttributes[type]);    
    const image = new Image();
    image.src = IconDelete;

    if (spanText) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('btn_img_wrapper');
        imageWrapper.appendChild(image);
        const span = document.createElement('span');
        span.textContent = spanText;
        button.appendChild(span);
        button.appendChild(imageWrapper);
    } else {
        button.appendChild(image);
    }

    return button;
}

const buttonAttributes = {
    project: {
        className: 'btn_delete_project',
        type: 'button',
    },
    task: {
        className: 'btn_delete_task',
        type: 'button',
    }
}