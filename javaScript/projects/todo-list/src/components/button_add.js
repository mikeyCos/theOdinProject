import IconAdd from '../assets/icons/add.svg';
// returns a button element to create a project/task
// if spanText provided, then a span element is created
export default function buildButtonAddProject(type, spanText) {
    const button = Object.assign(document.createElement('button'), buttonAttributes[type]);    
    const image = new Image();
    image.src = IconAdd;

    if (spanText) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('btn-img-wrapper');
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
        className: 'btn-add-project',
        type: 'button',
    },
    task: {
        className: 'btn-add-task',
        type: 'button',
    }
}