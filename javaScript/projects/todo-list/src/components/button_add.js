import IconAdd from '../assets/icons/add.svg';
// returns a button element to create a project/task
// if spanText provided, then a span element is created
export default function buildButtonAdd(type, spanText) {
    const button = Object.assign(document.createElement('button'), buttonAttributes[type]);    
    const image = new Image();
    image.src = IconAdd;

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
        className: 'btn_add_project',
        type: 'button',
    },
    task: {
        className: 'btn_add_task',
        type: 'button',
    }
}