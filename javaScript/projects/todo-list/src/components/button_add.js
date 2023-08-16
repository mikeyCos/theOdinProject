import IconAdd from '../assets/icons/add.svg';
// returns a button element to create a project/task
// if spanText provided, then a span element is created
export default function buildButtonAddProject(type, spanText) {
    const button = Object.assign(document.createElement('button'), buttonAttributes[type]);
    const imageWrapper = document.createElement('div');
    const image = new Image();
    image.src = IconAdd;

    imageWrapper.classList.add('btn-img-wrapper');
    imageWrapper.appendChild(image);
    button.appendChild(imageWrapper);

    if (spanText) {
        const span = document.createElement('span');
        span.textContent = spanText;
        button.appendChild(span);
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